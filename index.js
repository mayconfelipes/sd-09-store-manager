const express = require('express');
const bodyParser = require('body-parser');

const ProductsController = require('./controllers/productsController');
const SalesController = require('./controllers/SalesController');


const app = express();

app.use(bodyParser.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Running in ${PORT}`);
});


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', ProductsController.create);

app.get('/products', ProductsController.listAll);

app.get('/products/:id', ProductsController.findById);

app.put('/products/:id', ProductsController.update);

app.delete('/products/:id', ProductsController.deleteOne);

app.post('/sales', SalesController.create);

app.get('/sales', SalesController.listAll);

app.get('/sales/:id', SalesController.findById);

app.put('/sales/:id', SalesController.update);

app.delete('/sales/:id', SalesController.deleteOne);



