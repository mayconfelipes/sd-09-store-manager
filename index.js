const express = require('express');
const bodyParser = require('body-parser').json();
const router = require('./routes/router');

const app = express();
app.use(bodyParser);
app.use(router);

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});

app.use((error, _req, res, _next) => {
  return res.status(error.error).json(error.message);
});