import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  button: {
    // padding: theme.spacing(0.1),
  }
}));

const AddOptionsForm = (props) => {
  const classes = useStyles();

  const [newOption, setNew] = useState('');

  const handleAddOption = (e) => {
    e.preventDefault();
    if (newOption) {
      props.handleAddOption(newOption);
      setNew('');
    }
  }

  return (
    <form onSubmit={(e) => {handleAddOption(e)}}>
      <TextField
        className={classes.textField}
        aria-label="addOption"
        value={newOption}
        onChange={(e) => {setNew(e.target.value)}}
        margin="normal"
        autoComplete="off"
        inputProps={{"data-testid": "option-input"}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                type="submit"
                color="primary"
                onClick={(e) => {handleAddOption(e)}}
                className={classes.button}
                aria-label="submitOption"
                component="span"
              >
                <AddBox/>
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </form>
  );
}

export default AddOptionsForm;