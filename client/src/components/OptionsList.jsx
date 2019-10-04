import React from 'react';
import { Paper, Table, TableBody, TableRow, TableHead, TableCell, IconButton, Grid, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import AddOptionsForm from './AddOptionsForm.jsx';

const useStyles = makeStyles(theme => ({
  narrowCell: {
    paddingTop: 0,
    paddingBottom: 0
  }
}));

const OptionsList = ({ options, handleRemoveOption, handleAddOption }) => {
  const classes = useStyles();

  const makeOptionsList = () => {
    if (options.length) {
      return options.map((option, i) => {
        return (
          <TableRow key={i}>
            <TableCell className={classes.narrowCell}>
              <Grid container direction="row" justify="space-between" alignItems="center" aria-label="option">
                <Grid item>
                  {option}
                </Grid>
                <Grid item >
                  <IconButton id={i} onClick={(e) => {handleRemoveOption(e.target.id)}} aria-label="delete">
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>);
      });
    } else {
      return (
        <TableRow>
          <TableCell>Add Some Options!</TableCell>
        </TableRow>);
    }
  }

  return (
    <Paper >
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="inherit" variant="h6">OPTIONS</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {makeOptionsList()}
          <TableRow>
            <TableCell className={classes.narrowCell}>
              <AddOptionsForm handleAddOption={handleAddOption}/>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

export default OptionsList;
