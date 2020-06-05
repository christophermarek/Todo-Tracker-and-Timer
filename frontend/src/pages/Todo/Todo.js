import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import  Todos  from '../../components/Todos/Todos';

import Layout from '../../layout/Layout';
import './styles.css';

const Todo = ({ auth }) => {
    
    return (
        <Layout>
            <Todos />
        </Layout>
    );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps))(Todo);