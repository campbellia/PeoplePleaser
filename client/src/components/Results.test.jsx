import React from 'react';
import { shallow } from 'enzyme';
import Results from './Results';

describe('Results', () => {
  it('should render correctly', () => {
    const match = {
      params: {
        pollId: '123'
      }
    };
    const component = shallow(<Results match={match}/>);
    expect(component).toMatchSnapshot();
  });
});
