import React, { useState, useEffect } from 'react';
import {Slider, Grid, Container, Typography, Card, CardActions, CardActionArea, CardHeader, CardContent, Button} from '@material-ui/core';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

const Poll = ({ match }) => {
  const [poll, setPoll] = useState({
    name: "Loading...",
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

  const getPoll = () => {
    var url = `/polls/${match.params.pollId}`;
    axios.get(url)
      .then(result => {
        setPoll(result.data);
      })
      .catch(err => {
        console.log('ERROR getting poll:', err);
      });
  }

  useEffect(() => {getPoll()}, []);

  const onSliderChange = (val, optionName) => {
    var newResults = {};
    for (let option in poll.options) {
      newResults[option] = 0;
    }
    newResults = Object.assign(newResults, results);
    //somehow it's possible to click on things that don't have the id and
    //get an empty string (though the slider moves)
    newResults[optionName] = val;
    console.log('newresults:', newResults);
    setResults(newResults);
  }

  const handleSubmitVotes = (event) => {
    event.preventDefault();
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

  const getComponents = () => {
    if (poll.terminated) {
      return (
        <Container maxWidth="sm">
          <Card>
            <Typography align="center" variant="h1" component="h1">Voting has ended for "{poll.name}"
            </Typography>
            <CardActions>
              <Link to={`/polls/${match.params.pollId}/results`}>View Results</Link>
            </CardActions>
          </Card>
        </Container>
      );
    } else if (!redirect) {
      return (
      <Card >
       <Typography align="center" variant="h2" component="h2">{poll.name}</Typography>
        <CardContent>
          <form onSubmit={handleSubmitVotes}>
            {options.map(option => {
              return (
              <div className="option">
                <h4>{option}</h4>
                <Slider
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
              <Button className="btn" size="small" color="primary">
                SHARE POLL
              </Button>
              <Button type="submit" value="Submit Votes">SUBMIT VOTES</Button>
              </Grid>
          </form>
        </CardContent>
      </Card>
      )
    } else {
      return <Redirect to={redirect}/>
    }
  }
  return (getComponents());
}

export default Poll;