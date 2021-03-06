import React, { useState, useCallback } from "react";
import { Switch, Route, Redirect, BrowserRouter as Router, } from 'react-router-dom';

import Layout from './components/layout/layout';
import { AuthContext } from './shared/context/auth-context';
import Login from "./Pages/Auth/Login";
import TimeTableView from "./Pages/TimeTable/TimeTableView";
import AddProfessorView from "./Pages/AddProfessor/AddProfessorView";
import AssignProfessorView from "./Pages/AssignProfessor/AssignProfessorView";
import TotalProfessorsAndSlots from "./Pages/TotalProfessorsAndSlots/TotalProfessorsAndSlots";
function App() {

  const [token, setToken] = useState();
  const [userType, setUserType] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState("");

  const login = useCallback((uid, token, type, name) => {
    setIsLoggedIn(!!token);
    setToken("Bearer " + token);
    setUserId(uid);
    setUserType(type);
    setName(name)
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setToken(null);
    setUserId(null);
    setUserType("")
  }, []);

  let routes = null;

  if (isLoggedIn) {
    if (userType.toUpperCase() === "ADMIN") {
      routes = (
        <Switch>
          <Route path="/" exact >
            <Redirect to="/totalProfessorAndLecs" />
          </Route>
          <Route path="/totalProfessorAndLecs">
            <TotalProfessorsAndSlots />
          </Route>
          <Route path="/assignLecture" >
            <AssignProfessorView />
          </Route>
          <Route path="/addProfessor" >
            <AddProfessorView />
          </Route>
          <Redirect to="/totalProfessorAndLecs" />
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
              <TimeTableView />
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
            <Login />
          </Route>
          <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout, token: token, userId: userId, userType: userType, name: name}}>
      <Router>
        <Layout>
          {routes}
        </Layout>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
