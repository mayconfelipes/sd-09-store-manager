const express = require('express');
const app = express();
const bodyParser = require('body-parser').json();
const Products = require('./controller/Products');
app.use(bodyParser);
const PORT = 3000;


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.get('/products', Products.getAll);
app.get('/products/:id', Products.findById);

app.post('/products', Products.createNewProduct);
app.put('/products/:id', Products.updateProduct);

app.delete('/products/:id', Products.deleteProduct);


app.use((err, _req, res, _next) => {
  const { status, err: { code, message } } = err;
  res.status(status).json({ err: { code, message } });
});

app.listen(PORT, () => console.log(`Houston, everything is OK on port ${PORT}`));