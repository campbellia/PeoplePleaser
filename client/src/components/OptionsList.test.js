import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import OptionsList from './OptionsList';

describe('OptionsList', () => {
  const props = {
    options: ["Bananas", "Oranges", "Walnuts", "Grapefruit"],
    handleAddOption: newOption => newOption,
    handleRemoveOption: optionIndex => optionIndex
  }

  const addOptionSpy = jest.spyOn(props, 'handleAddOption');
  const removeOptionSpy = jest.spyOn(props, 'handleRemoveOption');

  it('should display the options passed down from its parent component', () => {
    const { getByText } = render(
      <OptionsList options={props.options} handleAddOption={props.handleAddOption} handleRemoveOption={props.handleRemoveOption} />);
    expect(getByText("Walnuts")).toBeInTheDocument();
    expect(getByText("Oranges")).toBeInTheDocument();
  });

  it('should not let the user add empty options', () => {
    const { getByLabelText } = render(
      <OptionsList options={props.options} handleAddOption={props.handleAddOption} handleRemoveOption={props.handleRemoveOption} />);

    fireEvent.click(getByLabelText('submitOption'));
    expect(addOptionSpy).not.toHaveBeenCalled();
  });

  it('should pass option input to the parent event handler', () => {
    const { getByTestId, getByLabelText } = render(
      <OptionsList options={props.options} handleAddOption={props.handleAddOption} handleRemoveOption={props.handleRemoveOption} />);

    fireEvent.change(getByTestId('option-input'), {target: {value: 'Beets'}})
    fireEvent.click(getByLabelText('submitOption'));
    expect(addOptionSpy).toHaveBeenCalledTimes(1);
    expect(addOptionSpy).toHaveBeenCalledWith('Beets');
  });

  it('should pass the index of a deleted option up to the parent component event handler', () => {
      const { getByLabelText, getAllByLabelText } = render(
      <OptionsList options={props.options} handleAddOption={props.handleAddOption} handleRemoveOption={props.handleRemoveOption} />);

      //each option should have a delete button rendered
      const deleteButtons = getAllByLabelText('delete');
      expect(deleteButtons.length).toEqual(props.options.length);

      fireEvent.click(deleteButtons[2]);
      expect(removeOptionSpy).toHaveBeenCalledTimes(1);
      expect(removeOptionSpy).toHaveBeenCalledWith("2");
    });

});
