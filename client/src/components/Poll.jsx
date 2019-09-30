import React, { useState, useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import axios from 'axios';

const Poll = (props) => {
  const [poll, setPoll] = useState({
    name: "Loading...",
    options: {},
    totalVotes: 0
  });

  var neutralResults = {};
  var options = Object.keys(poll.options);
  options.forEach(option => {
    neutralResults[option] = 0;
  });

  const [results, setResults] = useState(neutralResults);

  const getPoll = () => {
    var url = `/polls/${props.pollId}`;
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
    setResults(newResults);
  }

  const handleSubmitVotes = (event) => {
    event.preventDefault();
    if (results[''] !== undefined) {
      delete results[''];
    }
    const pollData = {};
    pollData.name = poll.name;
    pollData.options = results;
    pollData.totalVotes = poll.totalVotes++;
    console.log('polldata:', pollData);
    props.handleSubmitVotes(props.pollId, pollData);
  }

  return (
    <div className="poll">
      <h1>{poll.name}</h1>
      <form onSubmit={(e) => {handleSubmitVotes(e)}}>
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
          </div>
          )
        })}
        <input type="submit" value="Submit Votes"></input>
      </form>
    </div>
  );

}

export default Poll;