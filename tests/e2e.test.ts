import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../server/app.ts';
import { chromium } from '@playwright/test';

test('E2E customer journey and mobile navigation pass', async () => {
  const { app, db } = createApp(':memory:', true);
  const server = app.listen(0, '127.0.0.1');
  await new Promise<void>(resolve => server.once('listening', resolve));
  const address = server.address() as { port: number };
  const baseUrl = `http://127.0.0.1:${address.port}`;

  let browser;
  try {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
    
    // 1. Desktop Experience & Commerce Journey
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    const title = await page.title();
    assert.match(title, /SNOWLITE/i);

    // Verify hero elements
    const heroWordmark = page.locator('.hero-wordmark');
    assert.equal(await heroWordmark.isVisible(), true);

    // Navigate to /shop
    await page.goto(`${baseUrl}/shop`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.product-card', { timeout: 10000 });
    const cardCount = await page.locator('.product-card').count();
    assert.ok(cardCount > 0, 'Products should be displayed on the shop page');

    // Navigate to a product detail page
    await page.goto(`${baseUrl}/product/aubergine-prime`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.product-description', { timeout: 10000 });
    
    // Select size 'M'
    const sizeBtn = page.locator('.sizes button', { hasText: 'M' });
    await sizeBtn.click();
    assert.equal(await sizeBtn.getAttribute('aria-pressed'), 'true');

    // Add to bag
    const addBtn = page.locator('.purchase-row button.button');
    await addBtn.click();
    await page.waitForSelector('.toast', { timeout: 5000 });

    // Go to bag
    await page.goto(`${baseUrl}/bag`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.bag-item', { timeout: 10000 });
    const bagText = await page.locator('.bag-item').innerText();
    assert.match(bagText, /Aubergine Prime/);
    assert.match(bagText, /M/);

    // Continue to checkout
    await page.locator('a[href="/checkout"]').first().click();
    await page.waitForSelector('form.checkout-layout', { timeout: 10000 });

    // Fill delivery form
    await page.fill('input[name="name"]', 'Tanvir Ahmed');
    await page.fill('input[name="phone"]', '01712345678');
    await page.selectOption('select[name="division"]', 'Dhaka');
    await page.selectOption('select[name="district"]', 'Dhaka');
    await page.fill('input[name="upazila"]', 'Dhanmondi');
    await page.fill('input[name="area"]', 'Road 8A');
    await page.fill('textarea[name="address"]', 'House 42, Road 8A, Dhanmondi, Dhaka');

    // Submit COD order
    await page.locator('button:has-text("Place demo COD order")').click();

    // Verify confirmation
    await page.waitForURL(/\/order-confirmation\/SN-/, { timeout: 10000 });
    const orderCardText = await page.locator('.order-card').innerText();
    assert.match(orderCardText, /DEMO ORDER SN-/);
    assert.match(orderCardText, /Unpaid — cash on delivery/);
    assert.match(orderCardText, /Tanvir Ahmed/);

    // Verify bag was emptied
    await page.goto(`${baseUrl}/bag`, { waitUntil: 'domcontentloaded' });
    const emptyNotice = await page.locator('.empty').innerText();
    assert.match(emptyNotice, /Your bag is waiting for its first piece/);

    await context.close();

    // 2. Mobile Viewport (390x844) & Floating Dock
    const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    // Verify mobile dock
    const dock = mobilePage.locator('.mobile-dock');
    assert.equal(await dock.isVisible(), true, 'Mobile navigation dock should be visible on mobile viewport');

    // Click 'Shop' on mobile dock
    await dock.locator('a[href="/shop"]').click();
    await mobilePage.waitForURL(/\/shop/, { timeout: 10000 });
    assert.match(mobilePage.url(), /\/shop/);

    await mobileContext.close();

  } catch (err) {
    console.error('E2E test error:', err);
    throw err;
  } finally {
    if (browser) await browser.close();
    await new Promise<void>(resolve => server.close(() => resolve()));
    db.close();
  }
});
