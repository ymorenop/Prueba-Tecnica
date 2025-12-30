const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const productsRoutes = require('./routes/products.routes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/products', productsRoutes);

app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});
