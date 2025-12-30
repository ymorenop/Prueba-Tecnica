const express = require('express');
const { body, param } = require('express-validator');
const db = require('../db');

const router = express.Router();

/* LISTAR */
router.get('/', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

/* CREAR */
router.post('/',
  body('name').isLength({ min: 1, max: 100 }),
  body('value').isNumeric(),
  (req, res) => {
    const { name, value } = req.body;
    db.run(
      'INSERT INTO products(name, value) VALUES (?, ?)',
      [name, value],
      function (err) {
        if (err) return res.status(500).json(err);
        res.json({ id: this.lastID });
      }
    );
  }
);

/* EDITAR */
router.put('/:id',
  param('id').isInt(),
  body('name').isLength({ min: 1, max: 100 }),
  body('value').isNumeric(),
  (req, res) => {
    const { name, value } = req.body;
    db.run(
      'UPDATE products SET name=?, value=? WHERE id=?',
      [name, value, req.params.id],
      err => {
        if (err) return res.status(500).json(err);
        res.json({ updated: true });
      }
    );
  }
);

/* ELIMINAR */
router.delete('/:id',
  param('id').isInt(),
  (req, res) => {
    db.run(
      'DELETE FROM products WHERE id=?',
      [req.params.id],
      err => {
        if (err) return res.status(500).json(err);
        res.json({ deleted: true });
      }
    );
  }
);

module.exports = router;
