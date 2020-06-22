import React from 'react';
import PropTypes from 'prop-types';

import Navbar from '../components/Navbar/Navbar';
import './styles.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { sizing } from '@material-ui/system';

const Layout = ({ children }) => {
  return (
    <>         
      <Grid container>
        <Grid item>
          <Navbar />
        </Grid>
        
        <Grid item xs={10}>
            <div className="container">{children}</div>
        </Grid>

      </Grid>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;