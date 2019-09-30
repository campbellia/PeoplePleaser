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
    console.log("in on formsubmit", pollInfo);
    axios.post('/polls', pollInfo)
      .then(res => {
        console.log('PollId:', res);
        //setPoll(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleSubmitVotes = (results) => {
    //submit the results to the db
    //display results
  }

  const getComponents = () => {
    if (poll) {
      return <Poll handleSubmitVotes={handleSubmitVotes} poll={poll}/>;
    } else {
      return <CreatePollForm onFormSubmit={onFormSubmit}/>;
    }
  }

  return (getComponents());

}

export default App;