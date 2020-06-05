import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Loader from '../Loader/Loader';

import { getTodos } from '../../store/actions/todoActions';
import TodoBar from './TodoBar';

import './styles.css';

const Todos = ({ getTodos, todo: { todoObj, isLoading, error } }) => {
  useEffect(() => {
    getTodos();
  }, []);

  //let todoLists = todoObj.todos;
  //console.log(todoLists);

  return (
    <div className="Todo">
      {error && <div className="error-center">{error}</div>}
        {isLoading ? (
          <Loader />
        ) : (
          <TodoBar />
        )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  todo: state.todo,
});

export default connect(mapStateToProps, { getTodos })(Todos);