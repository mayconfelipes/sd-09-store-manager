const express = require('express');
const bodyParser = require('body-parser');

const productsRouter = require('./routes/productsRouter');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);
// app.use('/products', productsRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running... | port: ${PORT}`);
});
