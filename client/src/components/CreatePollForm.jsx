import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Grid, TextField, Container, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import OptionsList from './OptionsList.jsx';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}));

const CreatePollForm = (props) => {
  const classes = useStyles();

  const [name, setName] = useState(null);
  const [options, setOptions] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const handleAddOption = (newOption) => {
    setOptions(options.concat(newOption));
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
      });
  }

  const getComponents = () => {
    if (redirect) {
      var url = `/polls/${redirect}/vote`;
      return (<Redirect to={url}/>);
    } else {
      return (
        <Container maxWidth="lg">
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <TextField
                id="createPoll"
                label="Poll Name"
                value={name}
                onChange={(e) => {setName(e.target.value)}}
                margin="normal"
                autoComplete="off"
              />
            </Grid>
            <Grid container item spacing={1} direction="column" justify-content="space-around" id="optionsList">
              <OptionsList handleAddOption={handleAddOption} options={options}/>
            </Grid>
            <Grid item>
              <Button id="createPoll" size="small" onClick={onFormSubmit} variant="contained" color="primary">Create Poll</Button>
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