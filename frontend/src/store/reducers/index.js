import { combineReducers } from 'redux';

import authReducer from './authReducer';
import registerReducer from './registerReducer';
import todoReducer from './todoReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
  auth: authReducer,
  register: registerReducer,
  todo: todoReducer,
  category: categoryReducer,
});