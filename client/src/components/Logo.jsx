import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  logo: {
    fontFamily: "'Dosis', sans-serif",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#0f0e21"
  }
}));

const Logo = () => {
  const classes = useStyles();
  return (
    <Container>
        <Link className={classes.logo} to="/">
            PEOPLEPLEASER
        </Link>
    </Container>
  );
}

export default Logo;