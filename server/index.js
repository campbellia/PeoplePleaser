const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const controllers = require('../database/controllers.js');
const path = require('path');

app.use(bodyParser.json());
app.use('/', express.static('public/'));

app.put('/polls/:id/end', (req, res) => {
  controllers.terminatePoll(req.params.id, (err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send();
    }
  });
});

app.put('/polls/:id', (req, res) => {
  console.log('in put request', req.body);
  controllers.updatePoll(req.params.id, req.body, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send();
    }
  });
});

app.get('/polls/:id/vote', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/', 'index.html'));
});

app.get('/polls/:id/results', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/', 'index.html'));
});

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



app.listen(port, () => {
  console.log('Server is listening at port ', port);
});