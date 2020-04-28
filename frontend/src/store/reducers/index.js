import { combineReducers } from 'redux';

import authReducer from './authReducer';
import registerReducer from './registerReducer';

export default combineReducers({
  auth: authReducer,
  register: registerReducer,
});