import React, { useState } from 'react';
import { connect } from 'react-redux';

import './styles.css';

const TodoItems = ({auth}) => {
  

  return (
    <div className="TodoItems">
      
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(TodoItems);