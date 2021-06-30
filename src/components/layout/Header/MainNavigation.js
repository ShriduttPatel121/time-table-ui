import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import NavLinks from "./NavLinks";

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
      },
    cartBtn: {
      marginLeft: theme.spacing(3)
    }
}));
const MainNavigation = (props) => {

    const classes = useStyles();
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Time Table Application
          </Typography>
          <span>
            <NavLinks orientation="horizontal" />
          </span>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default MainNavigation;
