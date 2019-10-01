import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const CreatePollForm = (props) => {

  const [name, setName] = useState(null);
  const [options, setOptions] = useState([]);
  const [newOption, setNew] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleAddOption = (e) => {
    e.preventDefault();
    setOptions(options.concat(newOption));
  }

  const getOptionsList = () => {
    if (options.length) {
      return options.map(option => {
        return <div>{option}</div>;
      });
    } else {
      return <div>none</div>;
    }
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
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
    axios.post('/polls', pollInfo)
      .then((res) => {setRedirect(res.data)})
      .catch(err => {
        console.log(err);
      })
  }

  const getComponents = () => {
    if (redirect) {
      var url = `/polls/${redirect}/vote`;
      return (<Redirect to={url}/>);
    } else {
      return (
        <div>
          <form onSubmit={(e) => {onFormSubmit(e)}}>
            Name:<input type="text" onChange={(e) => {setName(e.target.value)}}></input>
            <input id="createPoll" type="submit" value="New Poll"></input>
          </form>
            Options: {getOptionsList()}
          <form onSubmit={(e) => {handleAddOption(e)}}>
            New Option: <input type="text" onChange={(e) => {setNew(e.target.value)}}></input>
            <input id="addOption" type="submit" value="Add"></input>
          </form>
        </div>
      );
    }
  }

  return (
    getComponents()
  );
}

export default CreatePollForm;