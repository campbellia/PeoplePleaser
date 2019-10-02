import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import CreatePollForm from './CreatePollForm.jsx';
import Poll from './Poll.jsx';
import Results from './Results.jsx';
import Navbar from './Navbar.jsx';
import { createBrowserHistory } from "history"

const defaultTheme = createMuiTheme();

const history = createBrowserHistory();

const App = () => {

  return (
    <MuiThemeProvider theme={defaultTheme}>
      <Router history={history}>
        <Route path="/" component={Navbar}/>
          <Route exact={true} path="/" component={CreatePollForm}/>
          <Route path="/polls/:pollId/vote" component={Poll}/>
          <Route path="/polls/:pollId/results" component={Results}/>
      </Router>
    </MuiThemeProvider>
  );

}

export default App;