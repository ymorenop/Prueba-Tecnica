const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const FILE_PATH = './products.json';

// Leer productos desde archivo
function readProducts() {
  if (!fs.existsSync(FILE_PATH)) return [];
  const data = fs.readFileSync(FILE_PATH, 'utf8');
  return data ? JSON.parse(data) : [];
}

// Guardar productos en archivo
function saveProducts(products) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(products, null, 2));
}

// GET /products → listar todos
app.get('/products', (req, res) => {
  const products = readProducts();
  res.json(products);
});

// POST /products → agregar producto
app.post('/products', (req, res) => {
  const products = readProducts();
  const nextId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
  const product = { id: nextId, ...req.body };
  products.push(product);
  saveProducts(products);
  res.json(product);
});

// PUT /products/:id → actualizar producto
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const products = readProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { id, ...req.body };
    saveProducts(products);
    return res.json(products[index]);
  }
  res.status(404).send('Producto no encontrado');
});

// DELETE /products/:id → eliminar producto
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let products = readProducts();
  products = products.filter(p => p.id !== id);
  saveProducts(products);
  res.json({ success: true });
});

// Servidor escuchando
const PORT = 3000;
app.listen(PORT, () => console.log(`Backend en http://localhost:${PORT}`));
