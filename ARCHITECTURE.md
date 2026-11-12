# Architecture
React and TypeScript form one routed storefront. Vite serves the client and proxies /api to Express. Shared catalogue and Bangladesh district data connect views and server validation. SQLite stores inventory, orders, contact messages and launch subscriptions.
The server calculates totals and performs order insertion and inventory changes in a transaction. An idempotency key prevents retry duplication. Tracking requires a random access token.
The development catalogue contains supplied design concepts. Original USD metadata is retained. BDT prices and stock are explicit test fixtures.
## Launch boundary
Live ordering is disabled in production. Merchant product approval, BDT prices, verified inventory, shipping rates and coverage, support details, legal policies, and hosting/security configuration must be completed before commercial operations.
Optional authentication needs a verified provider. Guest checkout is the implemented purchase path.
