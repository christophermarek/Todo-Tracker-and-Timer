import axios from "axios";
import endpoints from "../constants/endpoints";
const instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 60000
});

const setAuthTokenInHeader = token =>
  (instance.defaults.headers.common.Authorization = `Bearer ${token}`);

const login = (username, password) =>
  instance.post(endpoints.login, { username, password });

const signup = (username, password) =>
  instance.post(endpoints.signup, { username, password });


const privacyTest = () => instance.get(endpoints.privacyTest);


export default {
  setAuthTokenInHeader,
  login,
  signup,
  privacyTest
};