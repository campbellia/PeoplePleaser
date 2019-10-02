import React from 'react';
import { shallow } from 'enzyme';
import Poll from './Poll';

describe('Poll', () => {
  it('should render correctly', () => {
    var poll = {
      name: 'Poll Name',
      options: ['option1', 'option2']
    }
    const component = shallow(<Poll poll={poll}/>);
    expect(component).toMatchSnapshot();
  });
});

//should render with correct options etc.
//should allow votes to be made
//should submit votes in post request with correct data
//should not render options for terminated poll
