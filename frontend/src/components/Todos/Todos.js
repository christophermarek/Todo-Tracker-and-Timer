import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Loader from '../Loader/Loader';

import { getTodos } from '../../store/actions/todoActions';
import TodoBar from './TodoBar';
import TodoList from './TodoList';
import Divider from '@material-ui/core/Divider';

import './styles.css';

const Todos = ({ getTodos, todo: { todoObj, isLoading, error } }) => {
  useEffect(() => {
    getTodos();
  }, []);

  function todoObjToList(){
    for(let x in todoObj.todos){
      return todoObj.todos[x];
    }
  }
  
  function renderTodoList(){
    let todoList = todoObjToList();
    return(
      todoList === undefined ? (
        <Loader />
      ) : (
        todoList.map((todolist, index) => {
          return <>
                  <TodoList key={index} todolist={todolist} /> 
                  <Divider light />
                  </>;
        })
      )
    )
  }


  return (
    <div className="Todo">
      {error && <div className="error-center">{error}</div>}
        {(isLoading) ? (
          <Loader />
        ) : (
          <>
          <TodoBar />
          {renderTodoList()}
          </>
        )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  todo: state.todo,
});

export default connect(mapStateToProps, { getTodos })(Todos);