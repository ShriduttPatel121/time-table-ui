import React, { useContext } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import NavLinks from "./NavLinks";
import { AuthContext } from "../../../shared/context/auth-context";

const useStyles = makeStyles((theme) => ({
    title: {
        /* flexGrow: 1, */
      },
    cartBtn: {
      marginLeft: theme.spacing(3)
    }
}));
const MainNavigation = (props) => {

    const classes = useStyles();
    const auth = useContext(AuthContext);
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Time Table Application
          </Typography>
          <Typography style={{margin: 'auto'}} variant="body1" >{auth.isLoggedIn ? ("Greetings " + auth.name + ", " + auth.userType) : null}</Typography>
          <span>
            <NavLinks orientation="horizontal" />
          </span>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default MainNavigation;
