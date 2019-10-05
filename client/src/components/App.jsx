import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import CreatePollForm from './CreatePollForm.jsx';
import Poll from './Poll.jsx';
import Results from './Results.jsx';
import Navbar from './Navbar.jsx';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme();
const history = createBrowserHistory();

// import asyncComponent from './AsyncComponent.jsx';
// const AsyncCreatePollForm = asyncComponent(() => import('./CreatePollForm.jsx'));
// const AsyncPoll = asyncComponent(() => import('./Poll.jsx'));
// const AsyncResults = asyncComponent(() => import('./Results.jsx'));

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
          <Route path="/" component={Navbar}/>
          <Route exact={true} path="/" component={CreatePollForm}/>
          <Route path="/polls/:pollId/vote" component={Poll}/>
          <Route path="/polls/:pollId/results" component={Results}/>
      </Router>
    </ThemeProvider>
  );

}

export default App;