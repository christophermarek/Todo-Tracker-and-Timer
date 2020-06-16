import React, { useState } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const Countdown = ({  }) => {

    return (
        <div className="Countdown">
            <Box position="relative" display="inline-flex">
                <CircularProgress variant="static" value={100} size={400} />
                <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography variant="h1" component="div" color="textSecondary">
                        00:00
                    </Typography>

                </Box>
            </Box>
            
        </div>
    );
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Countdown);