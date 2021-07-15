const express = require('express');
const app = express();
const bodyParser = require('body-parser').json();

const Products = require('./controllers/Products');

app.use(bodyParser);


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', Products.getAll);
app.get('/products/:id', Products.findById);

app.post('/products', Products.create);

app.put('/products/:id', Products.updateProduct);

app.use((err, _req, res, _next) => {
  const { status, err: { code, message } } = err;
  res.status(status).json({ err: { code, message } });
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Servidor funcionando na porta ${PORT}`));
