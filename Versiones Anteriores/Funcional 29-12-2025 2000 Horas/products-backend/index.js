const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Array en memoria para productos
let products = [];
let nextId = 1;

// GET /products → listar todos
app.get('/products', (req, res) => {
  res.json(products);
});

// POST /products → agregar producto
app.post('/products', (req, res) => {
  const product = { id: nextId++, ...req.body };
  products.push(product);
  res.json(product);
});

// PUT /products/:id → actualizar producto
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { id, ...req.body };
    return res.json(products[index]);
  }
  res.status(404).send('Producto no encontrado');
});

// DELETE /products/:id → eliminar producto
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  res.json({ success: true });
});

// Servidor escuchando
const PORT = 3000;
app.listen(PORT, () => console.log(`Backend en http://localhost:${PORT}`));
