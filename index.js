const express = require('express');
const bodyParser = require('body-parser').json();
const productController = require('./controllers/productController');
const saleController = require('./controllers/saleController');

const app = express();
const PORT = 3000;

app.use(bodyParser);

app.post('/sales', saleController.salesCreate);

app.get('/sales', saleController.listAllSales);

app.get('/sales/:id', saleController.saleIdController);

app.put('/sales/:id', saleController.salesUpdateController);

app.delete('/sales/:id', saleController.excludeSaleController);


// lista todos os produtos
app.post('/products', productController.productCreate);

app.get('/products', productController.listAllProducts);

// lista por id ou seja, por um único id
app.get('/products/:id', productController.listProductId);

app.put('/products/:id', productController.productCreate);

app.delete('/products/:id', productController.excludeProduct);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

//app.get('/', (req, res) => res.send('Estou funcionando'));
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));


