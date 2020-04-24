import apiClient from "../../network/apiClient";

export const actionTypes = {
  SIGNUP: "SIGNUP",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  ADD_USERNAME: "ADD_USERNAME",
  ADD_TOKEN: "ADD_TOKEN",
  SIGNED: "SIGNED"
};

export const _setUsername = username => ({
  type: actionTypes.ADD_USERNAME,
  username
});

export const _addToken = token => ({
  type: actionTypes.ADD_TOKEN,
  token
});

export const _isSignedup = () => ({
  type: actionTypes.SIGNED
});

export const _logout = () => ({
  type: actionTypes.LOGOUT
});

export const _login = (username, password) => async dispatch => {
  try {
    const { data } = await apiClient.login(username, password);
    console.log(data);
    apiClient.setAuthTokenInHeader(data.token);
    dispatch(_setUsername(username));
    dispatch(_addToken(data.token));
  } catch (error) {
    console.log({ error });
  }
};

export const _signup = (username, password) => async dispatch => {
  try {
    const { data } = await apiClient.signup(username, password);
    dispatch(_isSignedup());
    console.log(data);
    alert("user Signed")
  } catch (err) {
    
    if (err.response.data.errors) {
      err.response.data.errors.forEach(e => {
        if (e.param === "password") {
          alert("password must be at least 8 length")
        }
      });
    } 
    
    if (err && err.response.data.error) {
      if (err.response.data.error.name === "UserExistsError") {
        alert(err.response.data.error.message)
      } 
    }
    console.log({ err });
  }
};

