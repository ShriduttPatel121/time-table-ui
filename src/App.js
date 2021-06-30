import React, { useState, useCallback } from "react";
import { Switch, Route, Redirect, BrowserRouter as Router, } from 'react-router-dom';

import Layout from './components/layout/layout';
import { AuthContext } from './shared/context/auth-context';
function App() {

  const [token, setToken] = useState();
  const [userType, setUserType] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null)

  const login = useCallback((uid, token, type) => {
    setIsLoggedIn(!!token);
    setToken(token);
    setUserId(uid);
    setUserType(type)
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setToken(null);
    setUserId(null);
  }, []);

  let routes = null;

  if (isLoggedIn) {
    if (userType.toUpperCase() === "ADMIN") {
      routes = (
        <Switch>
          <Route path="/" exact >
            <Redirect to="/assignLecture" />
          </Route>
          <Route path="/assignLecture" >
            <span>assign lecture component</span>
          </Route>
          <Route path="/addProfessor" >
            <span>add professor component</span>
          </Route>
          <Redirect to="/assignLecture" />
        </Switch>
      );
    }
     else if (userType.toUpperCase() !== "ADMIN") {
      routes = (
        <Switch>
            <Route path="/" exact >
              <Redirect to="/timeTable" />
            </Route>
            <Route path="/timeTable" >
              <span>time table component</span>
            </Route>
            <Redirect to="/timeTable" />
        </Switch>
      );
  }
 } else {
    routes = (
      <Switch>
          <Route path="/" exact >
            <Redirect to="/login" />
          </Route>
          <Route path="/login" >
            <span>login view</span>
          </Route>
          <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout, token: token, userId: userId}}>
      <Router>
        <Layout>
          {routes}
        </Layout>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
