import { createContext } from "react";

function noop() {}
export default createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
  name: null,
  refreshToken: null,
  message: null,
});
