import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';

const Poll = (props) => {
  var neutralResults = {};
  props.poll.options.forEach(option => {
    neutralResults[option] = 0;
  });

  const [results, setResults] = useState(neutralResults);

  const onSliderChange = (e, val) => {
    var newResults = {};
    Object.assign(newResults, results);
    newResults[e.target.id] = val;
    setResults(newResults);
  }

  const handleSubmitVotes = () => {
    props.handleSubmitVotes(results);
  }

  return (
    <div className="poll">
      <h1>{props.poll.name}</h1>
      <form onSubmit={handleSubmitVotes}>
        {props.poll.options.map(option => {
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