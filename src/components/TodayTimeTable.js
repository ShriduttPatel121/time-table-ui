import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TodayTimeTable = (props) => {
  const classes = useStyles();
  const { lectures, userType } = props;

  console.log(lectures);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ width: "14%" }}>
              Day
            </TableCell>
            <TableCell align="center" style={{ width: "14%" }}>
              1st
            </TableCell>
            <TableCell align="center" style={{ width: "14%" }}>
              2nd
            </TableCell>
            <TableCell align="center" style={{ width: "14%" }}>
              3rd
            </TableCell>
            <TableCell align="center" style={{ width: "14%" }}>
              4th
            </TableCell>
            <TableCell align="center" style={{ width: "14%" }}>
              5th
            </TableCell>
            <TableCell align="center" style={{ width: "14%" }}>
              6th
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">
              {weekDays[new Date().getDay()]}
            </TableCell>
            {lectures.map((lec, i) => {
              if (lec === null) {
                return (
                  <TableCell key={i} align="center">
                    {" "}
                    -{" "}
                  </TableCell>
                );
              } else {
                return (
                  <TableCell key={i} align="center">
                    <Typography variant="body1">
                      {
                        lec[userType === "professor" ? "classRoom" : "professor"].name
                      }
                    </Typography>
                    <Typography variant="body2">Subject: XYZ{i}</Typography>
                  </TableCell>
                );
              }
            })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TodayTimeTable;
