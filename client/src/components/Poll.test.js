import React from 'react';
import axios from 'axios';
import {render, fireEvent} from '@testing-library/react';
import Poll from './Poll';

describe('Poll', () => {

  it('should display the poll name and options', async () => {
    const props = {
      match: {
        params: {
          pollId: '123'
        }
      }
    }

    const { getByText, findByText } = render(<Poll match={props.match}/>);

    //mock poll data comes from the __mocks__/axios module
    const title = await findByText('Roots');
    expect(title).toBeInTheDocument();
    expect(getByText('Licorice')).toBeInTheDocument();
    expect(getByText('Potato')).toBeInTheDocument();

  });

  it('should allow the user to submit new votes', async () => {
    const props = {
      match: {
        params: '123'
      }
    }
    const { findAllByLabelText, getByLabelText } = render(<Poll match={props.match}/>);
    const sliders = await findAllByLabelText('changeVote');
    fireEvent.change(sliders[0], {target: {value: 4}});
    fireEvent.change(sliders[1], {target: {value: -3}});
    fireEvent.click(getByLabelText('submitVotes'));

    expect(axios.put).toHaveBeenCalledTimes(1);
    //check that the data is as expected too
  });

});

//redirect behavior?
//share link?
//restart poll link?
