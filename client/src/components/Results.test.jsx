import React from 'react';
import axios from 'axios';
import {render, fireEvent, within} from '@testing-library/react';
import Results from './Results';

describe('Results', () => {

  it('should only display the total votes, if the poll is not terminated', async () => {
    const match = {
      params: {
        pollId: '123'
      }
    };
    const { queryByText, queryByLabelText, findByText } = render(<Results match={match}/>);

    expect(axios.get).toHaveBeenCalled();
    const totalVotes = await findByText('Total Votes Submitted: 2');
    expect(queryByText('Licorice')).toBeNull();
    expect(queryByLabelText('points')).toBeNull();

  });

  it('should terminate the poll and display results in descending order after the user clicks the view results button', async () => {
    const match = {
      params: {
        pollId: '123'
      }
    };
    const { findByText, findAllByLabelText, queryByText, queryAllByLabelText, getByLabelText, queryByLabelText } = render(<Results match={match}/>);
    fireEvent.click(getByLabelText('viewresults'));

    expect(axios.put).toHaveBeenCalled();
    const results = await findAllByLabelText('options');
    expect(queryByText('Licorice')).toBeTruthy();
    expect(queryByText('Potato')).toBeTruthy();
    const points = queryAllByLabelText('points');
    expect(points.length).toEqual(2);
    const winner = within(points[0]).getByText('8')
    const second = within(points[1]).getByText('-2');
    expect(winner).toBeTruthy();
    expect(second).toBeTruthy();


  });

  it('should display the results of the poll if poll is already terminated', async () => {
    const match = {
      params: {
        pollId: '456'
      }
    };
    const { findByText, getByText, queryByLabelText, getByLabelText, getAllByLabelText } = render(<Results match={match}/>);
    await findByText('Results');
    expect(getByText('Brownbear')).toBeInTheDocument();
    expect(getByText('Blackbear')).toBeInTheDocument();
    const points = getAllByLabelText('points');
    expect(points.length).toEqual(2);
    const winner = within(points[0]).getByText('9')
    const second = within(points[1]).getByText('0');
    expect(winner).toBeTruthy();
    expect(second).toBeTruthy();

  });


});
