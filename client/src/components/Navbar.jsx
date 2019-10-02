import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import Logo from './Logo.jsx';

const Navbar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography edge="start" variant="h5" color="inherit">
            <Logo />
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;