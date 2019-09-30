const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const controllers = require('../database/controllers.js');

app.use(bodyParser.json());
app.use('/', express.static('public/'));

app.get('/polls/:id', (req, res) => {
  controllers.getPoll(req.params.id, (err, data) => {
    if (err) {
      console.log('Error getting poll: ', err);
      res.status(400).send();
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/polls', (req, res) => {
  controllers.createPoll(req.body, (err, id) => {
    if (err) {
      console.log('Error creating new poll: ', err);
      res.status(400).send(err);
    } else {
      res.status(201).send(id);
    }
  });
});

app.put('/polls/:id', (req, res) => {
  console.log('inside put route:', req.params.id, req.body);
  controllers.updatePoll(req.params.id, req.body, (err, data) => {
    if (err) {
      console.log('Error getting poll: ', err);
      res.status(400).send();
    } else {
      res.status(200).send(data);
    }
  });
});



app.listen(port, () => {
  console.log('Server is listening at port ', port);
});