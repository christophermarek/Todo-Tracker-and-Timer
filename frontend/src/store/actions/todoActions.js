import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import {
    GET_TODO_LOADING,
    GET_TODO_SUCCESS,
    GET_TODO_FAIL,
    GET_TODO_ITEM_LOADING,
    GET_TODO_ITEM_SUCCESS,
    GET_TODO_ITEM_FAIL,
    CREATE_TODO_OBJ_LOADING,
    CREATE_TODO_OBJ_SUCCESS,
    CREATE_TODO_OBJ_FAIL,
    ADD_TODO_LIST_LOADING,
    ADD_TODO_LIST_SUCCESS,
    ADD_TODO_LIST_FAIL,
    ADD_TODO_LIST_ITEM_LOADING,
    ADD_TODO_LIST_ITEM_SUCCESS,
    ADD_TODO_LIST_ITEM_FAIL,
    EDIT_TODO_LIST_LOADING,
    EDIT_TODO_LIST_SUCCESS,
    EDIT_TODO_LIST_FAIL,
    EDIT_TODO_LIST_ITEM_LOADING,
    EDIT_TODO_LIST_ITEM_SUCCESS,
    EDIT_TODO_LIST_ITEM_FAIL,
    EDIT_TODO_LIST_ITEM_CHECKED_LOADING,
    EDIT_TODO_LIST_ITEM_CHECKED_SUCCESS,
    EDIT_TODO_LIST_ITEM_CHECKED_FAIL,
    DELETE_TODO_LIST_LOADING,
    DELETE_TODO_LIST_SUCCESS,
    DELETE_TODO_LIST_FAIL,
    DELETE_TODO_LIST_ITEM_LOADING,
    DELETE_TODO_LIST_ITEM_SUCCESS,
    DELETE_TODO_LIST_ITEM_FAIL,
} from '../types';

export const getTodos = () => async (dispatch, getState) => {
  dispatch({
    type: GET_TODO_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('/api/todos/', options);
    dispatch({
      type: GET_TODO_SUCCESS,
      payload: { todoObj: response.data },
    });
  } catch (err) {
    dispatch({
      type: GET_TODO_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const addTodoList = (formData) => async (dispatch, getState) => {
  dispatch({
    type: ADD_TODO_LIST_LOADING,
    payload: { me: { ...getState().auth.me } },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post('/api/todos/todo', formData, options);
    dispatch({
      type: ADD_TODO_LIST_SUCCESS,
      payload: { todoObj: response.data },
    });
  } catch (err) {
    dispatch({
      type: ADD_TODO_LIST_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const addTodoListItem = (formData) => async (dispatch, getState) => {
  dispatch({
    type: ADD_TODO_LIST_ITEM_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post('/api/todos/todo/todolist', formData, options);
    dispatch({
      type: ADD_TODO_LIST_ITEM_SUCCESS,
      payload: { todoObj: response.data },
    });
  } catch (err) {
    dispatch({
      type: ADD_TODO_LIST_ITEM_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const deleteTodoList = (todolistid) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_TODO_LIST_LOADING,
    payload: { me: { ...getState().auth.me } },
  });
  try {
    const options = attachTokenToHeaders(getState);
    options.params = {
      todoListId: todolistid,
    }
    const response = await axios.delete('/api/todos/todos/:id', options);
    dispatch({
      type: DELETE_TODO_LIST_SUCCESS,
      payload: { todoObj: response.data },
    });
  } catch (err) {
    dispatch({
      type: DELETE_TODO_LIST_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const editTodoListChecked = (todolistid, todoitemid, checked) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_TODO_LIST_ITEM_CHECKED_LOADING,
    payload: { me: { ...getState().auth.me } },
  });
  try {
    const options = attachTokenToHeaders(getState);

    let update = {
      checked: checked
    }

    options.params = {
      todoListId: todolistid,
      todoItemId: todoitemid
    }
    const response = await axios.put('/api/todos/todos/todo/todoitem/checked/:id', update, options);
    dispatch({
      type: EDIT_TODO_LIST_ITEM_CHECKED_SUCCESS,
      payload: { todoObj: response.data },
    });
  } catch (err) {
    dispatch({
      type: EDIT_TODO_LIST_ITEM_CHECKED_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};