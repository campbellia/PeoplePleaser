import React, { useState, useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
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

  const onSliderChange = (e, val) => {
    var newResults = {};
    Object.assign(newResults, results);
    newResults[e.target.id] = val;
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
    console.log('Polldata from poll: ', pollData, url);
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
        <div>
          <h1>Voting has ended on this poll.</h1>
          <Link to={`/polls/${match.params.pollId}/results`}>View Results</Link>
        </div>
      );
    } else if (!redirect) {
      return (
      <div className="poll">
        <button className="btn">
            Copy Shareable Link
        </button>
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
                id={option}
                onChange={onSliderChange}
              />
            </div>)
          })}
          <input type="submit" value="Submit Votes"></input>
        </form>
      </div>
      )
    } else {
      return <Redirect to={redirect}/>
    }
  }
  return (getComponents());
}

export default Poll;