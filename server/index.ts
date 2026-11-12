import { createApp } from './app.ts';
const { app, db } = createApp();
const server = app.listen(Number(process.env.API_PORT || 3001), '127.0.0.1', () => console.log('SNOWLITE API listening on http://127.0.0.1:3001'));
setInterval(() => {}, 60000);
process.on('SIGINT', () => server.close(() => { db.close(); process.exit(0); }));
process.on('SIGTERM', () => server.close(() => { db.close(); process.exit(0); }));


