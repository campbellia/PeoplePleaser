import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Grid, Container, Typography, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 20
  },
  message: {
    fontSize: 20
  },
  button: {
    width: 300,
    height: 100,
    fontSize: 20
  },
  link: {
    textDecoration: "none",
    color: "#ffffff"
  }
}));

const EndedPoll = ({ pollId, handleRestartPoll }) => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="lg">
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography className={classes.message} align="center" variant="overline" color="inherit">Voting has ended</Typography>
        </Grid>
        <Grid item>
          <Button className={classes.button} size="large" variant="contained" color="primary"><Link className={classes.link}  to={`/polls/${pollId}/results`}>View Results</Link></Button>
        </Grid>
        <Grid item>
          <Button className={classes.button} size="large" variant="contained" color="primary" onClick={handleRestartPoll}>Restart Poll</Button>
        </Grid>
      </Grid>
    </Container>
  );

}

export default EndedPoll;