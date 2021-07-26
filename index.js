const express = require('express');
const bodyParser = require('body-parser');
const products = require('./routes/products');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', products);

app.use(({ status, err }, _req, res, _next) => {
  res.status(status).json({ err });
});

app.listen(PORT, () => {
  console.log('Server localhost:3000 is Online');
});