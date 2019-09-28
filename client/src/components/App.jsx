import React, { useState } from 'react';
import CreatePollForm from './CreatePollForm.jsx';
import Poll from './Poll.jsx';

const App = ({id}) => {

  const [poll, setPoll] = useState(null);

  const onFormSubmit = (name, options) => {
    var pollInfo = {
      name: name,
      options: options
    }
    setPoll(pollInfo);
  }

  const getComponents = () => {
    if (poll) {
      return <Poll options={poll}/>;
    } else {
      return <CreatePollForm onFormSubmit={onFormSubmit}/>;
    }
  }

  return (getComponents());

}

export default App;