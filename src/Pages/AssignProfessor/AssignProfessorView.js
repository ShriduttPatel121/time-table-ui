import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Card,
  Typography,
  Container,
  Button,
  Divider,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from 'react-router-dom';

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import SelectInput from '../../shared/components/SelectInput/SelectInput';
import Spinner from "../../shared/components/spinner";

const weekDays = [
    {name: "Monday", _id: 1},
    {name: "Tuesday", _id: 2},
    {name: "Wednesday", _id: 3},
    {name: "Thursday", _id: 4},
    {name: "Friday", _id: 5},
]

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    justifyContent: "space-around",
    display: "flex",
    width: "70%",
    padding: "0.5rem",
    flexWrap: "wrap",
    height: "100%",
    "@media(max-width : 52rem)": {
      width: "80%",
    },
  },
  formContainer: {
    padding: "2rem 1rem",
    textAlign: "center",
    width: "25rem",
  },

  sybmitBtn: {
    marginTop: "1rem",
  },
});

const initialValues = {
  professor: "",
  classRoom: "",
  day: "",
  slotNumber: ""
};

const validation = Yup.object({
  professor: Yup.string().required(),
  classRoom: Yup.string().required(),
  day: Yup.string().required(),
  slotNumber: Yup.number().required()
});

const AssignProfessorView = (props) => {
  const classes = useStyles();

  const [professors, setProfessors] = useState([]);
  const [classRooms, setClassRooms] = useState([]);
  const [slots, setSlots] = useState([]);
  const [slotPlaceHolder, setSlotPlaceHolder] = useState("fill above details and click get available slots button")

  const auth = useContext(AuthContext);
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const history = useHistory()

  // to fetch the available professors and which are not exceeding the weekly hours contraint, when components gets mounted
  useEffect(() => {
    const fetchAvailableProfs = async () => {
        try {
            const resData = await sendRequest("http://localhost:8080/api/admin/availableProfessorForWeek", "GET", null, { "Content-Type": "application/json", authorization: auth.token });
            console.log(resData);
            setProfessors(resData.professors);
        } catch (e) {
            alert(error || "somthing went wrong when try to fetch available professors");
        }
    }
    fetchAvailableProfs();
  }, []);

  // to fetch the available classRooms and which are not exceeding the weekly hours contraint, when components gets mounted
  useEffect(() => {
    const fetchAvailableClasses = async () => {
        try {
            const resData = await sendRequest("http://localhost:8080/api/admin/availableClassRoomForWeek", "GET", null, { "Content-Type": "application/json", authorization: auth.token });
            console.log(resData);
            setClassRooms(resData.classRooms);
        } catch (e) {
            alert(error || "somthing went wrong when try to fetch available professors");
        }
    }
    fetchAvailableClasses();
  }, []);

  const fetchAvailableSlots = async (professor, classRoom, day) => {
    console.log(professor, classRoom, day);
    try {
        const resData = await sendRequest("http://localhost:8080/api/admin/getAvailableSoltOfDay/" + professor + "/" + classRoom + "/" + day , "GET", null, { "Content-Type": "application/json", authorization: auth.token });
        const lectures = resData.availableSlots.map(o => {
            return { name: o + 1, _id : o };
        })
        setSlots(lectures);
        setSlotPlaceHolder(resData.message)
    } catch (e) {
        alert(error || e.message) //"somthing went wrong while fetching slots"
    }

  } 

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={async (value, { setSubmitting, resetForm }) => {
        console.log(value);
        try {
            const resData = await sendRequest("http://localhost:8080/api/lecture/assignProfessor", "POST", JSON.stringify(value), { "Content-Type": "application/json", authorization: auth.token });
            alert(resData.message);
            history.push("/totalProfessorAndLecs")
        } catch (e) {
            console.log(e)
            alert(error || "somthing went wrong");
        }
      }}
    >
      {(props) => (
        <Container className={classes.root} maxWidth="md">
          <Card className={classes.formContainer}>
            <Typography component="h4" variant="h4">
              Assign professor
            </Typography>
            <Divider style={{ margin: "1rem 0" }} />
            <form onSubmit={props.handleSubmit}>
              <SelectInput name="professor" label="Professor" placeholder="select a professor" options={professors} onChange={(val) => {
                  props.setFieldValue("professor", val)
              }}/>
              <SelectInput name="classRoom" label="Class room" placeholder="select a class room" options={classRooms} onChange={(val) => {
                  props.setFieldValue("classRoom", val)
              }}/>
              <SelectInput name="day" label="Day" options={weekDays} placeholder="select the day" onChange={(val) => {
                  props.setFieldValue("day", val)
              }}/>
              <SelectInput name="slotNumber" label="Slot Number" options={slots} placeholder={slotPlaceHolder} onChange={(val) => {
                  props.setFieldValue("slotNumber", val)
              }}/>
              {!isLoading ? (<Box display="flex" width="100%" justifyContent="space-around">
                    <Button
                        type="submit"
                        size="large"
                        variant="outlined"
                        color="primary"
                        disabled={!(props.isValid && props.dirty)}
                        className={classes.sybmitBtn}
                    >
                        Assign
                    </Button>
                    <Button
                        type="button"
                        size="large"
                        variant="contained"
                        disabled={((props.values.professor === "") || (props.values.classRoom === "") || (props.values.day === ""))}
                        color="primary"
                        className={classes.sybmitBtn}
                        onClick={() => fetchAvailableSlots(props.values.professor, props.values.classRoom, props.values.day)}
                    >
                        Get Available slots
                    </Button>
                </Box> ) : <Spinner />}
            </form>
          </Card>
        </Container>
      )}
    </Formik>
  );
};
export default AssignProfessorView;
