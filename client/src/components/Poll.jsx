import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {Slider, Grid, Container, Typography, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import EndedPoll from './EndedPoll.jsx';

const useStyles = makeStyles(theme => ({
  viewbutton: {
    fontWeight: "bold",
    textDecoration: "none",
    color: "#ffffff"
  },
  header: {
    marginTop: 10
  }
}));

const Poll = ({ match }) => {
  const classes = useStyles();

  const [poll, setPoll] = useState({
    name: "",
    options: {},
    totalVotes: 0,
    terminated: false
  });

  var neutralResults = {};
  var options = Object.keys(poll.options);
  options.forEach(option => {
    neutralResults[option] = 0;
  });

  const [results, setResults] = useState(neutralResults);
  const [redirect, setRedirect] = useState(false);

  const getPoll = (cb) => {
    var url = `/polls/${match.params.pollId}`;
    axios.get(url)
      .then(result => {
        cb(result.data);
      })
      .catch(err => {
        console.log('ERROR getting poll:', err);
      });
  }

  useEffect(() => {getPoll(setPoll)}, []);

  const onSliderChange = (val, optionName) => {
    var newResults = {};
    for (let option in poll.options) {
      newResults[option] = 0;
    }
    newResults = Object.assign(newResults, results);
    newResults[optionName] = val;
    setResults(newResults);
  }

  const handleSubmitVotes = (event) => {
    event.preventDefault();
    getPoll((poll) => {
      if (poll.terminated) {
        setPoll(poll);
      } else {
        const pollData = {};
        pollData.options = results;
        pollData.terminated = false;
        if (pollData.options[''] !== undefined) {
          delete pollData.options[''];
        }
        var url = `/polls/${match.params.pollId}`;
        axios.put(url, pollData)
          .then(() => {
            var url = `/polls/${match.params.pollId}/results`;
            setRedirect(url);
          })
          .catch(err => {
            console.log('ERR:', err);
          });
      }
    })
  }

  const handleRestartPoll = () => {
    var optionsObj = {};
    options.forEach(option => {
      optionsObj[option] = [];
    });
    var pollInfo = {
      name: name,
      options: optionsObj,
      totalVotes: 0,
      terminated: false
    }
    //ensure poll has not already been restarted
    getPoll((poll) => {
      if (poll.terminated) {
        axios.put(`/polls/${match.params.pollId}`, pollInfo)
          .then(() => {
            getPoll(setPoll);
          })
          .catch(err => {
            console.log('ERR:', err);
          });
      } else {
        setPoll(poll);
      }
    });
  }

  const getComponents = () => {
    if (poll.terminated) {
      return <EndedPoll data-testid="poll" handleRestartPoll={handleRestartPoll} pollId={match.params.pollId}/>;
    } else if (!redirect) {
      return (
      <Container data-testid="poll">
       <Typography className={classes.header} align="center" variant="h4" component="h4">{poll.name}</Typography>
          <form onSubmit={handleSubmitVotes}>
            {options.map((option, i) => {
              return (
              <div className="option" key={i}>
                <h4>{option}</h4>
                <Slider
                  data-testid="changeVote"
                  defaultValue={0}
                  step={1}
                  marks
                  min={-5}
                  max={5}
                  onChange={(e, val) => {onSliderChange(val, option)}}
                  valueLabelDisplay={'on'}
                />
              </div>)
            })}
              <Grid container justify="space-between">
              <Button className="btn" variant="contained" color="primary">
                COPY LINK
              </Button>
              <Button type="submit" value="Submit Votes" variant="contained" color="primary" aria-label="submitVotes">SUBMIT VOTES</Button>
              </Grid>
          </form>
      </Container>
      )
    } else {
      return <Redirect to={redirect}></Redirect>
    }
  }
  return (
    <>
    {getComponents()}
    </>
  );
}

export default Poll;