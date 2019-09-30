import React, { useState } from 'react';
import CreatePollForm from './CreatePollForm.jsx';
import Poll from './Poll.jsx';
import axios from 'axios';

const App = ({pollId}) => {

  const [poll, setPoll] = useState(pollId ? pollId : null);
  const [results, setResults] = useState(null);

  const onFormSubmit = (name, options) => {
    var pollInfo = {
      name: name,
      options: options,
      totalVotes: 0
    }
    axios.post('/polls', pollInfo)
      .then(res => {
        setPoll(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleSubmitVotes = (id, results) => {
    var url = `/polls/${id}`;
    console.log('results:', results);
    axios.put(url, results)
      .then((res) => {
        console.log('RESPONSE:', res);
      })
      .catch(err => {
        console.log('ERR:', err);
      });
    //display results/ranking?
  }

  const getComponents = () => {
    if (poll) {
      return <Poll handleSubmitVotes={handleSubmitVotes} pollId={poll}/>;
    } else {
      return <CreatePollForm onFormSubmit={onFormSubmit}/>;
    }
  }

  return (getComponents());

}

export default App;