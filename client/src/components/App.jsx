import React, { useState } from 'react';
import CreatePollForm from './CreatePollForm.jsx';
import Poll from './Poll.jsx';
import Results from './Results.jsx';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {

  return (
    <Router>
      <Route exact={true} path="/" component={CreatePollForm}/>
      <Route path="/polls/:pollId/vote" component={Poll}/>
      <Route path="/polls/:pollId/results" component={Results}/>
    </Router>
  );

}

export default App;