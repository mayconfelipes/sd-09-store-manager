
const express = require('express');
const bodyParser = require('body-parser');
const products = require('./routers/ProductsRouter');
const sales = require('./routers/SalesRouter');


const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/products', products);

app.use('/sales', sales);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Servidor Ligado porta ${PORT}!!!`));
