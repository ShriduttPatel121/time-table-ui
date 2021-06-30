import React, { useState, useEffect, useContext } from "react";
import { Tabs, Tab } from "@material-ui/core";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

import { AuthContext } from '../../../../shared/context/auth-context';

const useStyles = makeStyles({
  root: {
    "& .MuiTabs-flexContainer": {
      height: "64px",
      display: "none",
      "@media(min-width : 600px)": {
        display: "flex",
      },
    },
  },
});

const NavLinks = (props) => {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  const { pathname } = useLocation();
  const history = useHistory();

  const [tabValue, setTabValue] = useState(0);


  // to set the active tab
  useEffect(() => {
    setTabValue(pathname);
  }, [pathname]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const logouthandler = () => {
    auth.logout();
    history.replace("/login");
  };

  return (
    <>
      <Tabs value={tabValue} onChange={handleChange} className={classes.root}>
        {auth.isLoggedIn ? (
          auth.userType.toUpperCase === "ADMIN" ? (
            <>
                <Tab
                label="Assign Lecture"
                value="/assignLecture"
                to="/assignLecture"
                exact
                component={NavLink}
                style={{ display: !auth.isLoggedIn ? "hidden" : "flex" }}
                />
                <Tab
                label="Add Professor"
                value="/addProfessor"
                to="/addProfessor"
                exact
                component={NavLink}
                style={{ display: !auth.isLoggedIn ? "hidden" : "flex" }}
                />  
            </>
        ) : (
            <Tab
              label="Time Table"
              value="/timeTable"
              to="/timeTable"
              exact
              component={NavLink}
              style={{ display: !auth.isLoggedIn ? "hidden" : "flex" }}
            />
        )
        ) : null}
        
        <Tab
          style={{ display: !auth.isLoggedIn ? "none" : "flex" }}
          label="Authenticate"
          value="/login"
          to="/login"
          exact
          component={NavLink}
        />
        <Tab
          label="Logout"
          style={{ display: auth.isLoggedIn ? "none" : "flex" }}
          onClick={logouthandler}
        />
        <Tab style={{ display: "none" }} value={0} />
      </Tabs>
    </>
  );
};
export default NavLinks;
