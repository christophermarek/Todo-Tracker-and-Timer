import { actionTypes } from "../actions/authActions";

export const initialState = {
  token: "",
  username: "",
  test: "hello",
  isHaveAccount: false
};

const reducerAuth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOKEN:
      console.log("adding token", action.token);
      return {
        ...state,
        token: action.token
      };

    case actionTypes.ADD_USERNAME:
      return {
        ...state,
        username: action.username
      };

    case actionTypes.SIGNED:
      return {
        isHaveAccount: !state.isHaveAccount
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        token: ""
      };

    default:
      return state;
  }
};

export default reducerAuth;