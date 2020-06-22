import {
    ADD_CATEGORY_LOADING,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAIL,
    DELETE_CATEGORY_LOADING,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    GET_CATEGORIES_LOADING,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
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
  
const initialState = {
    categoryObj: {},
    selectedCategory: {},
    isLoading: false,
    error: null,
};
  
export default function (state = initialState, { type, payload }) {
    switch (type) {
      case GET_CATEGORIES_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categoryObj: payload.categoryObj,
      };
    case GET_CATEGORIES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    case ADD_CATEGORY_LOADING:
       return {
        ...state,
        isLoading: true,
      };
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categoryObj: payload.categoryObj,
      };
    case ADD_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
      case DELETE_CATEGORY_LOADING:
        return {
         ...state,
         isLoading: true,
       };
     case DELETE_CATEGORY_SUCCESS:
       return {
         ...state,
         isLoading: false,
         categoryObj: payload.categoryObj,
       };
     case DELETE_CATEGORY_FAIL:
       return {
         ...state,
         isLoading: false,
         error: payload.error,
       };
       case UPDATE_CATEGORY_CHECKED_LOADING:
        return {
         ...state,
         isLoading: true,
       };
     case UPDATE_CATEGORY_CHECKED_SUCCESS:
       return {
         ...state,
         isLoading: false,
         categoryObj: payload.categoryObj,
       };
     case UPDATE_CATEGORY_CHECKED_FAIL:
       return {
         ...state,
         isLoading: false,
         error: payload.error,
       };
       case GET_CATEGORY_CHECKED_LOADING:
        return {
         ...state,
         isLoading: true,
       };
     case GET_CATEGORY_CHECKED_SUCCESS:
       return {
         ...state,
         isLoading: false,
         selectedCategory: payload.selectedCategory,
       };
     case GET_CATEGORY_CHECKED_FAIL:
       return {
         ...state,
         isLoading: false,
         error: payload.error,
       };
       case UPDATE_CATEGORY_DURATION_LOADING:
        return {
         ...state,
         isLoading: true,
       };
     case UPDATE_CATEGORY_DURATION_SUCCESS:
       return {
         ...state,
         isLoading: false,
         categoryObj: payload.categoryObj,
       };
     case UPDATE_CATEGORY_DURATION_FAIL:
       return {
         ...state,
         isLoading: false,
         error: payload.error,
       };
       case UPDATE_CATEGORY_DURATION_LOCAL_LOADING:
        return {
         ...state,
         isLoading: true,
       };
     case UPDATE_CATEGORY_DURATION_LOCAL_SUCCESS:
       return {
         ...state,
         isLoading: false,
         categoryObj: payload.categoryObj,
       };
     case UPDATE_CATEGORY_DURATION_LOCAL_FAIL:
       return {
         ...state,
         isLoading: false,
         error: payload.error,
       };
    default:
      return state;
  }
}
