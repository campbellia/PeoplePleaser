import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Container, Card, Grid, CardActions, Button, List, Divider, ListItem, ListItemText, Typography, Table, TableBody, TableHead, TableCell, TableRow } from '@material-ui/core';

const Results = ({match}) => {

  const [poll, setPoll] = useState({name: '', options: {}, totalVotes: 0});

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
    if (poll.terminated) {
      return (
        <Container maxWidth="sm">
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
                    <TableRow>
                      <TableCell>
                        {item[0]}
                      </TableCell>
                      <TableCell>
                        {item[1]}
                      </TableCell>
                    </TableRow>
                  );
                } else {
                  return (
                    <TableRow>
                      <TableCell>
                        {item[0]}
                      </TableCell>
                      <TableCell>
                        {item[1]}
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </Container>
      );
    } else {
      return (
        <Container maxWidth="sm">
          <Grid container>
            <Grid item>
              <Typography align="center" variant="h3" component="h3">Total Votes Submitted: {poll.totalVotes}</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleViewResults}>VIEW RESULTS</Button>
              <p>(Voting will be disabled after viewing results.)</p>
            </Grid>
          </Grid>
        </Container>
      );
    }
  }

  return (getComponents());
}

export default Results;