import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Grid, TextField } from '@material-ui/core';


// const FormContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   background-color: #90baad;
//   border-radius: 25px;
//   border: 2px solid #;
//   padding: 20px;
//   width: 300px;
//   height: 200px;
//   margin: auto;
//   margin-top: 10%
// `;

// const AddOptionButton = styled.input`
//   background-color: #7a5d0d;
//   width: 50px;
// `;

// const AddOptionInput = styled.div`
//   display: flex;
//   align-items: center;
//   height: 50px;
//   margin: 20px;
// `;

// const CreatePollButton = styled.button`
//   width: 100%;
//   height: 50px;
//   margin-top: 10px;
//   background-color: #adf6b1;
//   border-radius: 3px;
//   border: none;
// `;

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
        <Grid container>
          <Grid item>
            <form onSubmit={(e) => {handleAddOption(e)}}>
                <input type="submit" value="+"></input>
                <input type="text" onChange={(e) => {setNew(e.target.value)}}></input>
            </form>
          </Grid>
          <Grid item>
          <form onSubmit={(e) => {onFormSubmit(e)}}>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" onChange={(e) => {setName(e.target.value)}}></input>
            {getOptionsList()}
            <button id="createPoll" type="submit">Create Poll</button>
          </form>
          </Grid>

        </Grid>
      );
    }
  }

  return (
      getComponents()
  );
}

export default CreatePollForm;