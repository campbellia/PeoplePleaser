import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Grid, TextField, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Helmet } from 'react-helmet';
import OptionsList from './OptionsList.jsx';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}));

const CreatePollForm = () => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [options, setOptions] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const handleAddOption = (newOption) => {
    setOptions(options.concat(newOption));
  }

  const handleRemoveOption = (optionIndex) => {
    var newOptions = Array.from(options);
    newOptions.splice(optionIndex, 1);
    setOptions(newOptions);
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!options.length) {
      alert('Add some options!');
    } else {
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
  }

  const getComponents = () => {
    if (redirect) {
      var url = `/polls/${redirect}/vote`;
      return (<Redirect to={url}/>);
    } else {
      return (
        <Container data-testid="createpollform" maxWidth="lg">
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <TextField
                id="createPoll"
                label="Poll Name"
                value={name}
                inputProps={{"data-testid": "pollname"}}
                onChange={(e) => {setName(e.target.value)}}
                margin="normal"
                autoComplete="off"
              />
            </Grid>
            <Grid item id="optionsList">
              <OptionsList handleAddOption={handleAddOption} handleRemoveOption={handleRemoveOption} options={options}/>
            </Grid>
            <Grid item>
              <Button id="createPoll" size="large" onClick={onFormSubmit} variant="contained" color="primary" aria-label="createPoll">CREATE POLL</Button>
            </Grid>
          </Grid>
        </Container>
      );
    }
  }

  return (
    <>
    <Helmet>
        <title>Create A Poll</title>
        <meta name="description" content="What movie should we watch? Where should we go for dinner? Find consensus in your social groups: create your group poll and find the decision that pleases everyone...or close." />
    </Helmet>
    {getComponents()}
    </>
  );
}

export default CreatePollForm;