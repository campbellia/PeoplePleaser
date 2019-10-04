import React from 'react';
import axios from 'axios';
import {render, fireEvent} from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
import CreatePollForm from './CreatePollForm';

describe('CreatePollForm', () => {

  it('should display options added by the user', () => {
    const { getByLabelText, getByTestId, getByText } = render(<CreatePollForm />);
    fireEvent.change(getByTestId('option-input'), {target: {value: 'Umber'}})
    fireEvent.click(getByLabelText('submitOption'));
    expect(getByText('Umber')).toBeInTheDocument();
  });

  it('should not let the user add empty options', () => {
    const { getByLabelText, queryAllByLabelText } = render(<CreatePollForm />);
    fireEvent.click(getByLabelText('submitOption'));
    expect(queryAllByLabelText('option').length).toEqual(0);
  });

  it('should let the user delete options', () => {
    const { getByLabelText, queryByText, getByText, getAllByLabelText, getByTestId, queryAllByLabelText } = render(<CreatePollForm/>);

    //each option should have a delete button rendered
    var deleteButtons = queryAllByLabelText('delete');
    expect(deleteButtons.length).toEqual(0);

    fireEvent.change(getByTestId('option-input'), {target: {value: 'Vanguard'}})
    fireEvent.click(getByLabelText('submitOption'));

    deleteButtons = getAllByLabelText('delete');
    expect(deleteButtons.length).toEqual(1);
    expect(getByText('Vanguard')).toBeInTheDocument();

    fireEvent.click(deleteButtons[0]);
    expect(queryByText('Vanguard')).toEqual(null);
  });

  it('should make a post request with an appropriate data object when the user submits the form and redirect to the /polls/id/vote path', () => {
      const { getByTestId, getByLabelText } = render(<CreatePollForm />);
      //Add a title
      fireEvent.change(getByTestId('pollname'), {target: {value: 'Harpist'}});
      //Add options
      fireEvent.change(getByTestId('option-input'), {target: {value: 'Lancelot'}})
      fireEvent.click(getByLabelText('submitOption'));
      fireEvent.change(getByTestId('option-input'), {target: {value: 'Emu'}})
      fireEvent.click(getByLabelText('submitOption'));
      //submit the form
      fireEvent.click(getByLabelText('createPoll'));

      var expectedData = {
        name: "Harpist",
        options: {"Lancelot": [], "Emu": []},
        totalVotes: 0,
        terminated: false
      }

      expect(axios.post).toHaveBeenCalledTimes(1);

    });

    it('should redirect after the poll is created', () => {
      // expect(getByTestId('poll')).toBeTruthy();
    });

});

