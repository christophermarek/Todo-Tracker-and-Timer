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

export const addCategory = (formData) => async (dispatch, getState) => {
  dispatch({
    type: ADD_CATEGORY_LOADING,
    payload: { me: { ...getState().auth.me } },
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
    payload: { me: { ...getState().auth.me } },
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

