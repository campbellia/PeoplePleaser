const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const controllers = require('../database/controllers.js');

app.use(bodyParser.json());
app.use('/', express.static('public/'));

app.post('/polls', (req, res) => {
  console.log('POST REQUEST>>>>', req.body)
});

app.listen(port, () => {
  console.log('Server is listening at port ', port);
});