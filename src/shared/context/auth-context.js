import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId : null,
  userType: "",
  token: null,
  login: () => {},
  logout: () => {},
});
