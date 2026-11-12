import express from 'express';
import { DatabaseSync } from 'node:sqlite';
import { randomBytes, createHash, timingSafeEqual } from 'node:crypto';
import { mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { products } from '../shared/catalog.ts';
import { districtsByDivision, shippingForDistrict } from '../shared/locations.ts';

class InputError extends Error { constructor(message: string, public status = 400) { super(message); } }
const textField = (value: unknown, label: string, min = 1, max = 200) => {
  if (typeof value !== 'string' || value.trim().length < min || value.trim().length > max) throw new InputError(`Enter a valid ${label}.`);
  return value.trim();
};
const emailField = (value: unknown) => {
  const email = textField(value, 'email', 3, 254);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new InputError('Enter a valid email.');
  return email.toLowerCase();
};

export function createApp(databasePath = '.data/snowlite.sqlite', demo = process.env.NODE_ENV !== 'production') {
  if (databasePath !== ':memory:') mkdirSync(dirname(databasePath), { recursive: true });
  const db = new DatabaseSync(databasePath);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS inventory (product_id TEXT NOT NULL, size TEXT NOT NULL, stock INTEGER NOT NULL CHECK(stock>=0), PRIMARY KEY(product_id,size));
    CREATE TABLE IF NOT EXISTS orders (reference TEXT PRIMARY KEY, token TEXT NOT NULL, request_key TEXT UNIQUE NOT NULL, request_hash TEXT NOT NULL, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, payload TEXT NOT NULL, created_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS subscribers (email TEXT PRIMARY KEY, created_at TEXT NOT NULL);`);
  const seed = db.prepare('INSERT OR IGNORE INTO inventory VALUES (?,?,?)');
  for (const product of products) for (const size of product.sizes) seed.run(product.id, size, product.stock);
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '20kb' }));
  app.use('/api', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    const origin = req.get('origin');
    if (origin) {
      let originHost = '';
      try { originHost = new URL(origin).host; } catch { return res.status(403).json({ error: 'Invalid request origin.' }); }
      const developmentOrigins = demo ? ['http://127.0.0.1:5173', 'http://localhost:5173'] : [];
      if (originHost !== req.get('host') && !developmentOrigins.includes(origin)) return res.status(403).json({ error: 'Cross-origin requests are disabled.' });
    }
    next();
  });
  // A bounded in-process limit protects local deployments. Use a shared limiter when scaling to multiple servers.
  const limits = new Map<string, { count: number; until: number }>();
  app.use('/api', (req, res, next) => {
    if (req.method === 'GET' && req.path === '/products') return next();
    const now = Date.now();
    for (const [key, entry] of limits) if (entry.until < now) limits.delete(key);
    const key = req.ip || 'unknown';
    const entry = limits.get(key) || { count: 0, until: now + 60_000 };
    entry.count++; limits.set(key, entry);
    if (entry.count > 60) return res.status(429).json({ error: 'Please wait a minute before trying again.' });
    next();
  });
  app.get('/api/products', (_req, res) => {
    const catalogue = products.map(product => {
      const inventory = db.prepare('SELECT size,stock FROM inventory WHERE product_id=?').all(product.id) as {size:string;stock:number}[];
      return { ...product, stock: inventory.reduce((sum, variant) => sum + variant.stock, 0), stockBySize: Object.fromEntries(inventory.map(variant => [variant.size, variant.stock])) };
    });
    res.json({ products: catalogue, demo: true, commerceEnabled: demo });
  });
  app.post('/api/orders', (req, res) => {
    if (!demo) throw new InputError('Live checkout awaits approved products, inventory, delivery rates and merchant configuration.', 503);
    const body = req.body;
    if (!body || !Array.isArray(body.items) || body.items.length < 1 || body.items.length > 30) throw new InputError('Your bag must contain between 1 and 30 items.');
    const idempotencyKey = textField(body.idempotencyKey, 'checkout reference', 16, 100);
    const input = body.customer || {};
    const customer = {
      name: textField(input.name, 'full name', 2, 100), phone: textField(input.phone, 'Bangladeshi mobile number', 11, 14),
      division: textField(input.division, 'division'), district: textField(input.district, 'district'),
      upazila: textField(input.upazila, 'upazila or thana', 2), area: textField(input.area, 'area', 2),
      address: textField(input.address, 'detailed address', 8, 500), instructions: input.instructions ? textField(input.instructions, 'delivery instructions', 0, 500) : '',
    };
    if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(customer.phone)) throw new InputError('Enter a valid Bangladeshi mobile number.');
    if (!districtsByDivision[customer.division]?.includes(customer.district)) throw new InputError('Select a district belonging to your division.');
    const items = body.items.map((line: Record<string, unknown>) => {
      if (!line || typeof line !== 'object') throw new InputError('Invalid bag item.');
      const product = products.find(product => product.id === line.productId);
      if (!product || !product.sizes.includes(String(line.size)) || line.color !== product.color) throw new InputError('Choose a valid product, size and colour.');
      if (!Number.isInteger(line.quantity) || Number(line.quantity) < 1 || Number(line.quantity) > 10) throw new InputError('Quantity must be between 1 and 10.');
      return { productId: product.id, name: product.name, size: String(line.size), color: product.color, quantity: Number(line.quantity), price: product.price };
    });
    const requestHash = createHash('sha256').update(JSON.stringify({ customer, items })).digest('hex');
    db.exec('BEGIN IMMEDIATE');
    try {
      const existing = db.prepare('SELECT payload,request_hash FROM orders WHERE request_key=?').get(idempotencyKey) as {payload:string;request_hash:string} | undefined;
      if (existing) {
        if (existing.request_hash !== requestHash) throw new InputError('This checkout reference has already been used. Refresh checkout for a new order.', 409);
        db.exec('COMMIT');
        return res.json(JSON.parse(existing.payload));
      }
      for (const item of items) {
        const changed = db.prepare('UPDATE inventory SET stock=stock-? WHERE product_id=? AND size=? AND stock>=?').run(item.quantity, item.productId, item.size, item.quantity);
        if (!changed.changes) throw new InputError(`${item.name} in ${item.size} has insufficient demo stock.`, 409);
      }
      const subtotal = items.reduce((sum: number, item: {price:number;quantity:number}) => sum + item.price * item.quantity, 0);
      const shipping = shippingForDistrict(customer.district);
      const order = { reference: `SN-${randomBytes(6).toString('hex').toUpperCase()}`, token: randomBytes(32).toString('hex'), status: 'Demo order received', paymentStatus: 'Unpaid — cash on delivery', items, customer, subtotal, shipping, total: subtotal + shipping, demo: true, createdAt: new Date().toISOString() };
      db.prepare('INSERT INTO orders VALUES (?,?,?,?,?)').run(order.reference, order.token, idempotencyKey, requestHash, JSON.stringify(order));
      db.exec('COMMIT');
      res.status(201).json(order);
    } catch (error) { db.exec('ROLLBACK'); throw error; }
  });
  app.get('/api/orders/:reference', (req, res) => {
    const order = db.prepare('SELECT token,payload FROM orders WHERE reference=?').get(req.params.reference) as {token:string;payload:string} | undefined;
    const token = typeof req.query.token === 'string' ? req.query.token : '';
    if (!order || token.length !== 64 || !timingSafeEqual(Buffer.from(createHash('sha256').update(token).digest()), Buffer.from(createHash('sha256').update(order.token).digest()))) throw new InputError('Order not found. Check your order reference and private tracking token.', 404);
    res.json(JSON.parse(order.payload));
  });
  app.post('/api/contact', (req, res) => {
    if (!demo) throw new InputError('Customer support submission awaits merchant configuration.', 503);
    const input = req.body || {};
    const message = { name: textField(input.name, 'name', 2, 100), email: emailField(input.email), subject: textField(input.subject, 'subject', 2, 100), orderNumber: input.orderNumber ? textField(input.orderNumber, 'order number', 1, 100) : '', message: textField(input.message, 'message', 10, 3000) };
    db.prepare('INSERT INTO messages(payload,created_at) VALUES (?,?)').run(JSON.stringify(message), new Date().toISOString());
    res.status(201).json({ message: 'Message saved in this development environment. A live support inbox is awaiting configuration.' });
  });
  app.post('/api/newsletter', (req, res) => {
    if (!demo) throw new InputError('Launch updates await merchant configuration.', 503);
    db.prepare('INSERT OR IGNORE INTO subscribers VALUES (?,?)').run(emailField(req.body?.email), new Date().toISOString());
    res.json({ message: 'Your interest is saved locally for this preview. Live email delivery awaits configuration.' });
  });
  app.get('/api/auth/status', (_req, res) => res.json({ available: false, guestCheckout: true }));
  app.use('/api', (_req, res) => res.status(404).json({ error: 'API route not found.' }));
  app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (error instanceof InputError) return res.status(error.status).json({ error: error.message });
    if (error instanceof SyntaxError) return res.status(400).json({ error: 'Invalid request body.' });
    res.status(500).json({ error: 'The request could not be completed. Please try again.' });
  });
  const distPath = resolve('dist');
  if (existsSync(distPath)) {
    app.use(express.static(distPath));
    app.use((_req, res) => {
      res.sendFile(resolve(distPath, 'index.html'));
    });
  }
  return { app, db };
}
