import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';

describe('App', () => {

  it('should render correct components for the root path', () => {
    const { queryByTestId, getByTestId } = render(<MemoryRouter initialEntries={["/"]}><App/></MemoryRouter>);

    expect(queryByTestId('navbar')).toBeTruthy();
    expect(queryByTestId('createpollform')).toBeTruthy();
    expect(queryByTestId('results')).toBeNull();
    expect(queryByTestId('poll')).toBeNull();
  });

  it('should render correct components for the polls/:id/vote path', () => {
    const { queryByTestId } = render(<MemoryRouter initialEntries={["/polls/123/vote"]}><App/></MemoryRouter>);

    expect(queryByTestId('navbar')).toBeTruthy();
    expect(queryByTestId('createpollform')).toBeNull();
    expect(queryByTestId('results')).toBeNull();
    expect(queryByTestId('poll')).toBeTruthy();

  });

  it('should render correct components for the polls/:id/results path', () => {
    const { queryByTestId } = render(<MemoryRouter initialEntries={["/polls/123/results"]}><App/></MemoryRouter>);

    expect(queryByTestId('navbar')).toBeTruthy();
    expect(queryByTestId('createpollform')).toBeNull();
    expect(queryByTestId('results')).toBeTruthy();
    expect(queryByTestId('poll')).toBeNull();

  });

});

