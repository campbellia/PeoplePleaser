import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  logo: {
    fontFamily: "'Varela', arial black, sans-serif",
    fontWeight: "bold",
    textDecoration: "none",
    textShadow: "0.5px 0.5px 0.5px",
    color: "#1d1b40",
    '&:hover': {
      color: "#282559"
    }
  }

}));

const Logo = () => {
  const classes = useStyles();
  return (
    <Container>
        <Link className={classes.logo} to="/">
            PEOPLE PLEASER
        </Link>
    </Container>
  );
}

export default Logo;