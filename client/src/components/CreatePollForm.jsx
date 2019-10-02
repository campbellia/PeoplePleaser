import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Grid, TextField, Container, Button } from '@material-ui/core';

const CreatePollForm = (props) => {

  const [name, setName] = useState(null);
  const [options, setOptions] = useState([]);
  const [newOption, setNew] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleAddOption = (e) => {
    e.preventDefault();
    setOptions(options.concat(newOption));
    setNew('');
  }

  const getOptionsList = () => {
    if (options.length) {
      return options.map(option => {
        return <Grid item><div>{option}</div></Grid>;
      });
    } else {
      return <div></div>;
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
        <Container maxWidth="sm">
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <h4>Options</h4>
              <form onSubmit={(e) => {handleAddOption(e)}}>
                  <input type="text" value={newOption} onChange={(e) => {setNew(e.target.value)}} autocomplete="off"></input>
                  <input type="submit" value="+"></input>
              </form>
            </Grid>
            <Grid container item spacing={1} direction="column" justify-content="space-around">
              {getOptionsList()}
            </Grid>
            <Grid item>
            <form onSubmit={(e) => {onFormSubmit(e)}}>
              <h4>Poll Name</h4>
              <input id="title" type="text" onChange={(e) => {setName(e.target.value)}} autocomplete="off"></input>
              <Button id="createPoll" size="small" type="submit" variant="contained" color="primary">Create Poll</Button>
            </form>
            </Grid>

          </Grid>
        </Container>
      );
    }
  }

  return (
      getComponents()
  );
}

export default CreatePollForm;