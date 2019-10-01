import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Results = ({match}) => {

  const [poll, setPoll] = useState({name: '', options: {}, totalVotes: 0});
  const [showResults, setShowResults] = useState(false);

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

  useEffect(() => {getResults()}, []);

  const handleGetResults = () => {
    axios.put(`/polls/${match.params.pollId}/end`, {terminated: true})
      .then((res) => {
        console.log('RESPONSE:', res);
        setShowResults(true);
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
    if (showResults) {
      return (
        <div className="results">
          <h1>Results</h1>
          <ol>
            {calculateRankings().map(item => {
              return <li>{item[0]} : {item[1]} </li>
            })}
          </ol>
        </div>
      );
    } else {
      return (
        <div className="totalVotes">
          <h1>Total Votes Submitted: {poll.totalVotes}</h1>
          <button onClick={handleGetResults}>View Results</button>
          <p>(Voting will be disabled after viewing results.)</p>
        </div>
      );
    }
  }

  return (getComponents());
}

export default Results;