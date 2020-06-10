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
  
const initialState = {
    todoObj: {},
    isLoading: false,
    error: null,
};
  
export default function (state = initialState, { type, payload }) {
    switch (type) {
      case GET_TODO_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todoObj: payload.todoObj,
      };
    case GET_TODO_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    case ADD_TODO_LIST_LOADING:
       return {
        ...state,
        isLoading: true,
      };
    case ADD_TODO_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todoObj: payload.todoObj,
      };
    case ADD_TODO_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
      case ADD_TODO_LIST_ITEM_LOADING:
        return {
         ...state,
         isLoading: true,
       };
     case ADD_TODO_LIST_ITEM_SUCCESS:
       return {
         ...state,
         isLoading: false,
         todoObj: payload.todoObj,
       };
     case ADD_TODO_LIST_ITEM_FAIL:
       return {
         ...state,
         isLoading: false,
         error: payload.error,
       };
      case DELETE_TODO_LIST_LOADING:
        return {
         ...state,
         isLoading: true,
       };
     case DELETE_TODO_LIST_SUCCESS:
       return {
         ...state,
         isLoading: false,
         todoObj: payload.todoObj,
       };
     case DELETE_TODO_LIST_FAIL:
       return {
         ...state,
         isLoading: false,
         error: payload.error,
       };
       case EDIT_TODO_LIST_ITEM_CHECKED_LOADING:
        return {
         ...state,
         isLoading: true,
       };
     case EDIT_TODO_LIST_ITEM_CHECKED_SUCCESS:
       return {
         ...state,
         isLoading: false,
         todoObj: payload.todoObj,
       };
     case EDIT_TODO_LIST_ITEM_CHECKED_FAIL:
       return {
         ...state,
         isLoading: false,
         error: payload.error,
       };
    default:
      return state;
  }
}
