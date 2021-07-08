const express = require('express');
const bodyParser = require('body-parser');

const {
  createProductController,
  getProductsAllController,
  getProductByIdController,
  updateProductByIdController,
} = require('./controllers/productsController');
const { get } = require('frisby');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', createProductController);
app.get('/products/:id', getProductByIdController);
app.get('/products', getProductsAllController);
app.put('/products/:id', updateProductByIdController);

app.listen(PORT, () => console.log('server ONLINE #VQV !!!'));
