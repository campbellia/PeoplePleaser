import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import Navbar from './Navbar.jsx';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme();
const history = createBrowserHistory();

import asyncComponent from './AsyncComponent.jsx';
const AsyncCreatePollForm = asyncComponent(() => import('./CreatePollForm.jsx'));
const AsyncPoll = asyncComponent(() => import('./Poll.jsx'));
const AsyncResults = asyncComponent(() => import('./Results.jsx'));

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
          <Route path="/" component={Navbar}/>
          <Route exact={true} path="/" component={AsyncCreatePollForm}/>
          <Route path="/polls/:pollId/vote" component={AsyncPoll}/>
          <Route path="/polls/:pollId/results" component={AsyncResults}/>
      </Router>
    </ThemeProvider>
  );

}

export default App;