const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    value REAL NOT NULL
  )
`);

module.exports = db;
