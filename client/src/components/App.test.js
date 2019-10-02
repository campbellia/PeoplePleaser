import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import App from './App';
import Navbar from './Navbar';
import CreatePollForm from './CreatePollForm';
import Results from './Results';
import Poll from './Poll';

describe('App', () => {
  it('should render correctly', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });

  it('should render correct components for the given path path', () => {
    const component = mount(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App/>
      </MemoryRouter>
    );

    expect(component.find(Navbar)).toHaveLength(1);
    expect(component.find(CreatePollForm)).toHaveLength(1);
    expect(component.find(Results)).toHaveLength(0);
    expect(component.find(Poll)).toHaveLength(0);

    component.unmount();
  });

});

