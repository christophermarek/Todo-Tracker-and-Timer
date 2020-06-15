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
} from '../types';
  
const initialState = {
    categoryObj: {},
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
        todoObj: payload.categoryObj,
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
         todoObj: payload.todoObj,
       };
     case DELETE_CATEGORY_FAIL:
       return {
         ...state,
         isLoading: false,
         error: payload.error,
       };
    default:
      return state;
  }
}
