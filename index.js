const express = require('express');
const bodyParser = require('body-parser');
const createProductsController = require('./controllers/productsController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', createProductsController);

app.listen(PORT, () => console.log('server ONLINE #VQV !!!'));
