import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import Logo from './Logo.jsx';

const Navbar = () => {
  return (

      <AppBar data-testid="navbar" position="static">
        <Toolbar>
          <Typography edge="start" variant="h5" color="inherit">
            <Logo />
          </Typography>
        </Toolbar>
      </AppBar>

  );
}

export default Navbar;