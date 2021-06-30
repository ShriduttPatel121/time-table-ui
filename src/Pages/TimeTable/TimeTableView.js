import React, { useState, useContext } from "react";
import { Button, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import WeekTimeTable from "../../components/WeekTimeTable";
import TodayTimeTable from "../../components/TodayTimeTable";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

const useStyles = makeStyles((theme) => ({
  mt: {
    marginTop: theme.spacing(2),
  },
}));
const TimeTableView = (props) => {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  const [loadTimeTableFor, setLoadTimeTableFor] = useState("");
  const [lectures, setlectures] = useState([]);
  const [weekLecture, setWeekLecture] = useState([]);

  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  const todayClickHandler = async () => {
    setLoadTimeTableFor("today");
    try {
        const resData = await sendRequest("http://localhost:8080/api/lecture/today/" + auth.userType + "/" + auth.userId, "GET", null, { "authorization": auth.token, "Content-Type": "application/json" });
        console.log(resData);
        setlectures(resData.lectures);

    } catch (e) {
        alert(error || "somthing went wrong")
    }
  };

  const weekClickHandler = async () => {
    setLoadTimeTableFor("week");
    try {
        const resData = await sendRequest("http://localhost:8080/api/lecture/week/" + auth.userType + "/" + auth.userId, "GET", null, { "authorization": auth.token, "Content-Type": "application/json" });
        setWeekLecture(resData.lectures);

    } catch (e) {
        alert(error || "somthing went wrong")
    }
  };

  return (
    <>
      <Box width="100%" display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column">
          <Button variant="outlined" color="primary" style={{width: "15rem"}} className={classes.mt} onClick={todayClickHandler} >Load time-table For Today</Button>
          <Button variant="outlined" color="primary" style={{width: "15rem"}} className={classes.mt} onClick={weekClickHandler}>Load time-table For Week</Button>
        </Box>
        <Box
          className={classes.mt}
          display="flex"
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          {loadTimeTableFor === "" ? (
            <Typography variant="h4" component="h6">
              Please click any button above
            </Typography>
          ) : loadTimeTableFor === "week" ? (
            <WeekTimeTable lectures={weekLecture} userType={auth.userType} />
          ) : (
            <TodayTimeTable lectures={lectures} userType={auth.userType} />
          )}
        </Box>
      </Box>
    </>
  );
};
export default TimeTableView;
