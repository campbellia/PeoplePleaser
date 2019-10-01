import React from 'react';
import { Link } from 'react-router-dom';
import {AppBar, Toolbar} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const Navbar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" color="inherit">
            <Link to="/">People Pleaser</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;