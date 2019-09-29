import React from 'react';
import { shallow } from 'enzyme';
import CreatePollForm from './CreatePollForm';

describe('CreatePollForm', () => {
  it('should render correctly', () => {
    const component = shallow(<CreatePollForm />);
    expect(component).toMatchSnapshot();
  });

  it('should allow the user to add new options to the poll', () => {
    const component = mount(<CreatePollForm />);
    component.state('newOption') = 'Bananas';
    component
      .find('.addOption')
      .simulate('click');

    expect(component.state('options').length).toEqual(1);
    expect(component.state('options')[0]).toEqual('Bananas');

    component.state('newOption') = 'Crabapples';
    component
      .find('.addOption')
      .simulate('click');
    expect(component.state('options').length).toEqual(2);
    expect(component.state('options').includes('Bananas')).toEqual(true);
    expect(component.state('options').includes('Crabapples')).toEqual(true);

    component.unmount();
  });

});

//should be able to add options
//should call event handler when submit
//should change state when options added
//