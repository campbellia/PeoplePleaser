import React from 'react';
import { shallow } from 'enzyme';
import AddOptionsForm from './AddOptionsForm';
import { ThemeProvider } from '@material-ui/styles';

describe('AddOptionsForm', () => {
  var spy;

  afterEach(() => {
    if (spy) {
      spy.mockClear();
    }
  });

  it('should render correctly', () => {
    const component = shallow(<ThemeProvider><AddOptionsForm /></ThemeProvider>);
    expect(component).toMatchSnapshot();
  });

  it('should allow the user to add new options to the poll', () => {
    spy = jest.spyOn(AddOptionsForm, 'handleAddOption');
    const component = mount(<AddOptionsForm />);
    component.find('IconButton').simulate('click');
    expect(spy).toHaveBeenCalled();

    component.unmount();
  });

});
