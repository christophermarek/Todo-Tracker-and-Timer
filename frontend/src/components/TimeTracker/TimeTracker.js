import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import Grid from '@material-ui/core/Grid';
import Countdown from './Countdown';
import CategoryList from './CategoryList.js';
import { getCategories } from '../../store/actions/categoryActions';
import Loader from '../Loader/Loader';

const TimeTracker = ({ getCategories, category: { categoryObj, isLoading, error } }) => {
    useEffect(() => {
        getCategories();
      }, []);

    

    return (
        <div className="Time-Tracker">
            <Grid container justify="center" spacing={0}>

                <Grid item xs={5} align="center">
                    <Countdown categories={categoryObj.categories}/>
                </Grid>

                <Grid item xs={7} >
                    {(isLoading) ? (
                        <Loader />
                    ) : (
                        <>
                            <CategoryList categories={categoryObj.categories}/>
                        </>
                    )}
                </Grid>

            </Grid>
        </div>
    );
};

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, {getCategories})(TimeTracker);