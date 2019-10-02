import React from 'react';
import { Paper, Table, TableBody, TableRow, TableHead, TableCell } from '@material-ui/core';
import AddOptionsForm from './AddOptionsForm.jsx';

const OptionsList = ({ options, handleAddOption }) => {

  const makeOptionsList = () => {
    if (options.length) {
      return options.map((option, i) => {
        return (
          <TableRow key={i}>
            <TableCell>{option}</TableCell>
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
            <TableCell>OPTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {makeOptionsList()}
          <TableRow>
            <TableCell>
              <AddOptionsForm handleAddOption={handleAddOption}/>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

export default OptionsList;
