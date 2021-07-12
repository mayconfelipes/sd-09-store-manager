const express = require('express');
const bodyParser = require('body-parser');

const productsRouter = require('./routers/productsRouter');
const salesRouter = require('./routers/salesRouter');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use((err, _req, res, _next) => {
  const { status, result } = err;
  res.status(status).json(result);
});

app.listen(PORT, () => console.log('Pai ta on'));
