import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Layout from '../../layout/Layout';
import './styles.css';
import 'typeface-roboto';
import  TimeTrackerComponent  from '../../components/TimeTracker/TimeTracker';


const TimeTracker = ({ auth }) => {
    
    return(
        <Layout>
            <TimeTrackerComponent />
        </Layout>
    );
    
        
}


const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default compose(connect(mapStateToProps))(TimeTracker);