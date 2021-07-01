import React, { useState, useContext } from "react";
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

import TextInput from "../../shared/components/TextInput/TextInput";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

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
  name: "",
  userName: "",
  password: "",
};

const validation = Yup.object({
  name: Yup.string().min(5, "min 5 characters or more").required(),
  userName: Yup.string().min(5, "min 5 characters or more").required(),
  password: Yup.string().required().min(5, "min 5 characters or more"),
});

const AddProfessorView = (props) => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { isLoading, error, clearError, sendRequest } = useHttpClient();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={async (value, { setSubmitting, resetForm }) => {
        console.log(value);
        try {
          const resData = await sendRequest(
            "http://localhost:8080/api/admin/addUser",
            "POST",
            JSON.stringify({ ...value, type: "professor" }),
            { "Content-Type": "application/json", authorization: auth.token }
          );
          alert(resData.message);
          resetForm();
          history.push("/totalProfessorAndLecs")
        } catch (e) {
          console.log(e);
          alert(error || "somthing went wrong");
        }
      }}
    >
      {(props) => (
        <Container className={classes.root} maxWidth="md">
          <Card className={classes.formContainer}>
            <Typography component="h4" variant="h4">
              Add professor
            </Typography>
            <Divider style={{ margin: "1rem 0" }} />
            <form onSubmit={props.handleSubmit}>
              <TextInput type="text" name="name" label="Name" />
              <TextInput type="text" name="userName" label="User Name" />
              <TextInput type="text" name="password" label="Password" />
              <Box display="flex" flexDirection="column">
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  disabled={!props.isValid || props.isSubmitting}
                  color="primary"
                  className={classes.sybmitBtn}
                >
                  ADD
                </Button>
              </Box>
            </form>
          </Card>
        </Container>
      )}
    </Formik>
  );
};
export default AddProfessorView;
