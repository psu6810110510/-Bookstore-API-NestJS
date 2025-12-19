const { Client } = require('pg');
const c = new Client({ host: '127.0.0.1', port: 5432, user: 'admin', password: 'password123', database: 'bookstore_dev' });
(async () => {
  try {
    await c.connect();
    const res = await c.query('SELECT 1 AS ok');
    console.log('OK', res.rows);
    await c.end();
    process.exit(0);
  } catch (e) {
    console.error('ERR', e.message);
    process.exit(1);
  }
})();