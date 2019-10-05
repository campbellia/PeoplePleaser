import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import {Container, Card, Grid, CardActions, Button, List, Divider, ListItem, ListItemText, Typography, Table, TableBody, TableHead, TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  button: {
    width: 150,
    height: 50
  },
  container: {
    marginTop: 20
  }
}));

const Results = ({match}) => {
  const classes = useStyles();

  const [poll, setPoll] = useState({name: '', options: {}, totalVotes: 0});
  const [redirect, setRedirect] = useState(false);

  const getResults = () => {
    var url = `/polls/${match.params.pollId}`;
    axios.get(url)
      .then(res => {
        setPoll(res.data);
      })
      .catch(err => {
        console.log('Error getting poll results:', err);
      })
  }

  useEffect(() => {
    getResults();
  }, []);

  const handleViewResults = () => {
    axios.put(`/polls/${match.params.pollId}`, {terminated: true})
      .then(() => {
        var terminatedPollObj = {};
        Object.assign(terminatedPollObj, poll);
        terminatedPollObj.terminated = true;
        setPoll(terminatedPollObj);
      })
      .catch(err => {
        console.log('ERR:', err);
      });
  }


  const calculateRankings = () => {
    var ranks = [];
    for (var option in poll.options) {
      var points = poll.options[option];
      var avg = points.reduce((sum, el) => {
        return sum + Number(el);
      });
      ranks.push([option, avg]);
    }
    return ranks.sort((a, b) => {
      return b[1] - a[1];
    });
  }

  const getComponents = () => {
    if (redirect) {
      return <Redirect to={redirect}/>
    } else if (poll.terminated) {
      return (
        <Container data-testid="results" maxWidth="sm">
          <Grid container direction="column" spacing={3}>
            <Grid item>
             <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <h2>Results</h2>
                    </TableCell>
                    <TableCell>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {calculateRankings().map((item, i) => {
                if (i === 0) {
                  return (
                    <TableRow key={i}>
                      <TableCell aria-label="option">
                        {item[0]}
                      </TableCell>
                      <TableCell aria-label="points">
                        {item[1]}
                      </TableCell>
                    </TableRow>
                  );
                } else {
                  return (
                    <TableRow key={i}>
                      <TableCell aria-label="option">
                        {item[0]}
                      </TableCell>
                      <TableCell aria-label="points">
                        {item[1]}
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
              </TableBody>
            </Table>
            </Grid>
            <Grid item>
              <Button size="large" variant="contained" color="primary" onClick={() => {setRedirect(`/polls/${match.params.pollId}/vote`)}}>Restart Poll?</Button>
            </Grid>
          </Grid>
        </Container>
      );
    } else {
      return (
        <Container data-testid="results" className={classes.container} maxWidth="sm">
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
              <Typography align="center" variant="h3" component="h3">Total Votes Submitted: {poll.totalVotes}</Typography>
            </Grid>
              <Grid item container direction="column" alignItems="center" spacing={1}>
                <Grid item>
                  <Button aria-label="viewresults" className={classes.button} variant="contained" color="primary" onClick={handleViewResults}>VIEW RESULTS</Button>
                </Grid>
                <Grid item>
                  <Typography variant="body2" component="span">Voting will be disabled after viewing results</Typography>
                </Grid>
              </Grid>
          </Grid>
        </Container>
      );
    }
  }

  return (
    <>
    <Helmet>
        <title>View Results</title>
        <meta name="description" content="Results are coming in -- have you voted? If everyone has cast their votes, lock your results in by viewing the rankings for each option." />
    </Helmet>
    {getComponents()}
    </>
  );
}

export default Results;