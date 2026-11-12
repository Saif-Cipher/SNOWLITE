import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../server/app.ts';
import { districtsByDivision } from '../shared/locations.ts';

test('COD totals, replay protection, stock rollback and private tracking', async () => {
  const { app, db } = createApp(':memory:', true);
  const server = app.listen(0, '127.0.0.1');
  await new Promise<void>(resolve => server.once('listening', resolve));
  const address = server.address() as {port:number};
  const url = `http://127.0.0.1:${address.port}`;
  const payload = { idempotencyKey: 'test-checkout-00000001', items: [{ productId: 'aubergine-prime', color: 'Aubergine Prime', size: 'M', quantity: 2, price: 1 }], customer: {name:'Test Customer',phone:'01712345678',division:'Dhaka',district:'Dhaka',upazila:'Dhanmondi',area:'Road 8',address:'House 12, Road 8'} };
  const post = (body: unknown) => fetch(`${url}/api/orders`, { method:'POST', headers:{'Content-Type':'application/json'},body:JSON.stringify(body) });
  try {
    assert.equal(Object.values(districtsByDivision).flat().length, 64);
    const response = await post(payload); assert.equal(response.status, 201);
    const order = await response.json(); assert.equal(order.total, 5060); assert.match(order.paymentStatus,/Unpaid/);
    const replay = await (await post(payload)).json(); assert.equal(replay.reference,order.reference);
    assert.equal((await post({...payload,items:[{...payload.items[0],quantity:3}]})).status,409);
    assert.equal((await fetch(`${url}/api/orders/${order.reference}?token=wrong`)).status,404);
    assert.equal((await fetch(`${url}/api/orders/${order.reference}?token=${order.token}`)).status,200);
    assert.equal((await post({...payload,idempotencyKey:'test-checkout-00000002',customer:{...payload.customer,district:'Sylhet'}})).status,400);
    const failed = await post({...payload,idempotencyKey:'test-checkout-00000003',items:[{...payload.items[0],quantity:10},{...payload.items[0],quantity:1}]});
    assert.equal(failed.status,409);
    const inventory = db.prepare('SELECT stock FROM inventory WHERE product_id=? AND size=?').get('aubergine-prime','M') as {stock:number};
    assert.equal(inventory.stock,10);
    const catalogue = await (await fetch(`${url}/api/products`)).json();
    assert.equal(catalogue.products[0].stockBySize.M,10);
    assert.equal(catalogue.products[0].stock,46);
    assert.equal((await fetch(`${url}/api/products`,{headers:{Origin:'not a URL'}})).status,403);
    assert.equal((await fetch(`${url}/api/products`,{headers:{Origin:'https://attacker.invalid'}})).status,403);
    assert.equal((await fetch(`${url}/api/products`,{headers:{Origin:'http://127.0.0.1:5173'}})).status,200);
  } finally { await new Promise<void>(resolve=>server.close(()=>resolve())); db.close(); }
});

test('production checkout fails closed', async () => {
  const {app,db}=createApp(':memory:',false);
  const server=app.listen(0,'127.0.0.1'); await new Promise<void>(resolve=>server.once('listening',resolve));
  try { const response=await fetch(`http://127.0.0.1:${(server.address() as {port:number}).port}/api/orders`,{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'}); assert.equal(response.status,503); }
  finally { await new Promise<void>(resolve=>server.close(()=>resolve())); db.close(); }
});

