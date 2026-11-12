# Commerce API

Run `npm run server` from the project directory. Node 24 provides SQLite. The API binds to 127.0.0.1 on port 3001. Vite proxies `/api` to this process.

This is an isolated development commerce system. Products, BDT prices, stock and delivery rates await merchant approval. The supplied source USD prices remain in `sourcePrice` metadata. Production mode disables order, contact and newsletter submission until real integrations are implemented. No payment provider, courier, email sender or authentication service is active.

## Contracts

- `GET /api/products` returns `{products, demo, commerceEnabled}`. Products include `stockBySize` from persistent inventory.
- `POST /api/orders` accepts `{idempotencyKey, items:[{productId,size,color,quantity}], customer:{name,phone,division,district,upazila,area,address,instructions?}}`. Use a cryptographically random UUID for each checkout attempt and retain it when retrying the same request.
- An order response contains `{reference,token,status,paymentStatus,items,customer,subtotal,shipping,total,demo,createdAt}`. Price and totals are computed server-side. COD starts unpaid. A repeated key with identical content returns the existing order. A repeated key with changed content returns 409.
- `GET /api/orders/:reference?token=...` requires the private 256-bit token returned at creation. Keep tracking links private. Avoid third-party scripts and access logging of query strings on deployment.
- `POST /api/contact` accepts `{name,email,subject,orderNumber?,message}`. The response explicitly says the message is saved locally.
- `POST /api/newsletter` accepts `{email}` and deduplicates addresses. The response explicitly says delivery awaits configuration.
- `GET /api/auth/status` reports unavailable authentication and guest checkout support.

The `.data/snowlite.sqlite` database stores development customer details. Keep `.data` out of source control. Orders and stock changes share a single SQLite transaction. Invalid lines or insufficient inventory roll back the entire order. A bounded per-IP rate limiter protects these endpoints in a single-process deployment. Multi-instance deployment needs a shared rate limiter, managed database operations, merchant approval and an operational privacy/retention policy.

The geography model includes all 64 districts across eight divisions. Upazila/thana and area use validated free text. Demo delivery is BDT 80 in Dhaka district and BDT 150 elsewhere, with live service coverage pending verification.

## Verification

`npm test` checks server-authoritative totals, retry idempotency, changed-payload rejection, invalid geography, stock rollback, private tracking, and production submission blocking. These checks use an in-memory database and do not create real orders.
