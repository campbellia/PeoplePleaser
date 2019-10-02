import React from 'react';
import { shallow, mount } from 'enzyme';
import CreatePollForm from './CreatePollForm';

describe('CreatePollForm', () => {
  var spy;

  afterEach(() => {
    if (spy) {
      spy.mockClear();
    }
  });

  it('should render correctly', () => {
    const component = shallow(<CreatePollForm />);
    expect(component).toMatchSnapshot();
  });

});

//add and delete options
//not allow adding empty option
//make a post request with the correct data
