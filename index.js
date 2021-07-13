const express = require('express');
const bodyParser = require('body-parser');
const product = require('./controllers/productController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', product.createProduct);
app.get('/products', product.listProduct);
app.get('/products/:id', product.listProductById);
app.put('/products', );

app.listen(PORT, () => console.log(`> Server is up and running on PORT : ${PORT}`));
