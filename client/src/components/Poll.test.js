import React from 'react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import {render, fireEvent, wait, act} from '@testing-library/react';
import Poll from './Poll';

describe('Poll', () => {

  it('should display the poll name and options and allow the user to vote on the options', async () => {

    const props = {
      match: {
        params: {
          pollId: '123'
        }
      }
    }

    const { getByText, getAllByLabelText, getAllByRole, findByText, getByLabelText, container } = render(<Poll match={props.match}/>);

    //mock poll data comes from the __mocks__/axios module
    const title = await findByText('Roots');
    expect(title).toBeInTheDocument();
    expect(getByText('Licorice')).toBeInTheDocument();
    expect(getByText('Potato')).toBeInTheDocument();

    fireEvent.click(getByLabelText('submitVotes'));

    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith("/polls/123",
      expect.objectContaining({
        terminated: false
       }),
     )
  });

});

//redirect behavior?
//share link?
//restart poll link?
