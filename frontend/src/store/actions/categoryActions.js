import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import {
    GET_CATEGORIES_LOADING,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    ADD_CATEGORY_LOADING,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAIL,
    DELETE_CATEGORY_LOADING,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    UPDATE_CATEGORY_CHECKED_LOADING,
    UPDATE_CATEGORY_CHECKED_SUCCESS,
    UPDATE_CATEGORY_CHECKED_FAIL,
    GET_CATEGORY_CHECKED_LOADING,
    GET_CATEGORY_CHECKED_SUCCESS,
    GET_CATEGORY_CHECKED_FAIL,
    UPDATE_CATEGORY_DURATION_LOADING,
    UPDATE_CATEGORY_DURATION_SUCCESS,
    UPDATE_CATEGORY_DURATION_FAIL,
    UPDATE_CATEGORY_DURATION_LOCAL_LOADING,
    UPDATE_CATEGORY_DURATION_LOCAL_SUCCESS,
    UPDATE_CATEGORY_DURATION_LOCAL_FAIL,
} from '../types';

export const getCategories = () => async (dispatch, getState) => {
  dispatch({
    type: GET_CATEGORIES_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('/api/category/', options);
    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      payload: { categoryObj: response.data },
    });
  } catch (err) {
    dispatch({
      type: GET_CATEGORIES_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const addLinkedCategory = (formData) => async (dispatch, getState) => {
  dispatch({
    type: ADD_CATEGORY_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post('/api/category/categories', formData, options);
    dispatch({
      type: ADD_CATEGORY_SUCCESS,
      payload: { categoryObj: response.data },
    });
  } catch (err) {
    dispatch({
      type: ADD_CATEGORY_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const deleteCategory = (categoryid) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_CATEGORY_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    options.params = {
        categoryid: categoryid,
    }
    const response = await axios.delete('/api/category/categories/:id', options);
    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: { categoryObj: response.data },
    });
  } catch (err) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

//local only
export const updateCategoryChecked = (categoryId) => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_CATEGORY_CHECKED_LOADING,
  });
  try {
    let updatedState = getState().category.categoryObj;
    for(let i = 0; i < updatedState.categories.length; i++){
      if(updatedState.categories[i]._id === categoryId){
        updatedState.categories[i].active = (updatedState.categories[i].active ? false : true);
      }
    }

    dispatch({
      type: UPDATE_CATEGORY_CHECKED_SUCCESS,
      payload: { categoryObj: updatedState },
    });
  } catch (err) {
    dispatch({
      type: UPDATE_CATEGORY_CHECKED_FAIL,
      payload: { error: 'Error updating active state for category' },
    });
  }
};

export const updateCategoryDuration = (categoryId, newDuration) => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_CATEGORY_DURATION_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);

    let update = {
      duration: newDuration
    }

    options.params = {
      categoryId: categoryId,
    }
    
    const response = await axios.put('/api/category/categories/:id', update, options);

    dispatch({
      type: UPDATE_CATEGORY_DURATION_SUCCESS,
      payload: { categoryObj:  response.data},
    });
  } catch (err) {
    dispatch({
      type: UPDATE_CATEGORY_DURATION_FAIL,
      payload: { error: 'Error updating active state for category' },
    });
  }
};

export const getCheckedCategory = () => async (dispatch, getState) => {
  dispatch({
    type: GET_CATEGORY_CHECKED_LOADING,
  });
  try {
    let oldState = getState().category.categoryObj;
    let fetchedCategory = {
      title: 'No Category Selected',
      duration: '00:00',
    }
    for(let i = 0; i < oldState.categories.length; i++){
      if(oldState.categories[i].active === true){
        fetchedCategory = oldState.categories[i];
      }
    }
    dispatch({
      type: GET_CATEGORY_CHECKED_SUCCESS,
      payload: { selectedCategory: fetchedCategory },
    });
  } catch (err) {
    dispatch({
      type: GET_CATEGORY_CHECKED_FAIL,
      payload: { error: 'Error updating active state for category' },
    });
  }
};

export const updateCategoryDurationLocal = (newDuration) => async (dispatch, getState) => {
  dispatch({
    type: GET_CATEGORY_CHECKED_LOADING,
  });
  try {
    let oldState = getState().category.categoryObj;
    for(let i = 0; i < oldState.categories.length; i++){
      if(oldState.categories[i].active === true){
        oldState.categories[i].duration = newDuration;
      }
    }
    dispatch({
      type: GET_CATEGORY_CHECKED_SUCCESS,
      payload: { categoryObj: oldState },
    });
  } catch (err) {
    dispatch({
      type: GET_CATEGORY_CHECKED_FAIL,
      payload: { error: 'Error updating active state for category' },
    });
  }
};


