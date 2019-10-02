import React from 'react';
import {Link} from 'react-router-dom';
import { Container } from '@material-ui/core';
import styled from 'styled-components';

const HomeLogo = styled(Link)`
  font-family: 'Dosis', sans-serif;
  font-weight: bold;
  text-decoration: none;
  color: #0f0e21;
  &visited: {
    color: #0f0e21;
  }
`;

const Logo = () => {
  return (
    <Container>
        <HomeLogo to="/">
            PEOPLEPLEASER
        </HomeLogo>
    </Container>
  );
}

export default Logo;