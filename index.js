require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/teste', (_request, response) => {
  response.status(200).send({message: 'ok'});
});


app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));
