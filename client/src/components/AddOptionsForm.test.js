import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddOptionsForm from './AddOptionsForm';

describe('AddOptionsForm', () => {
  const props = {
    handleAddOption: newOption => newOption
  }

  const spy = jest.spyOn(props, 'handleAddOption');

  it('should not pass input to the parent if input is empty', () => {
    const { getByLabelText } = render(
      <AddOptionsForm handleAddOption={props.handleAddOption}/>);

    fireEvent.click(getByLabelText('submitOption'));
    expect(spy).toHaveBeenCalledTimes(0);

  });

  it('should handle input submission by passing the input to its parent component', () => {
    const { getByLabelText, getByTestId } = render(
      <AddOptionsForm handleAddOption={props.handleAddOption}/>);

    fireEvent.change(getByTestId('option-input'), {target: {value: 'Ocelot'}})
    fireEvent.click(getByLabelText('submitOption'));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Ocelot');
  });

});
