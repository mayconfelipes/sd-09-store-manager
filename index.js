const express = require('express');
const bodyParser = require('body-parser');
// const Joi = require('joi');

const productController = require('./controllers/productController');

// const minNameLength = 5;

// const schema = Joi.object({
//   name: Joi.string().min(minNameLength),
// });


const app = express();
app.use(bodyParser.json());

const PORT = '3000';


app.post('/products', productController.create);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log('Online');
});
