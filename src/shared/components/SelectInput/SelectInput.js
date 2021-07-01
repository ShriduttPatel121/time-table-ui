import React, { useState } from "react";
import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useField } from "formik";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SelectInput = (props) => {
  const [age, setAge] = useState("");

  const { onChange, placeholder, label, options } = props;
  console.log(options);

  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  const classes = useStyles();

  const handleChange = (event) => {
    onChange(event.target.value) 
    setAge(event.target.value);
  };

  return (
      <FormControl variant="outlined" className={classes.formControl} error={errorText.length > 0} >
      <InputLabel >{label}</InputLabel>
        <Select
          value={age}
          onChange={handleChange}
        //   className={classes.selectEmpty}
        label={label}
        >
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
          <MenuItem value="">None</MenuItem>
          {
            options.map(o => {
                return (<MenuItem value={o._id} key={o._id}>{o.name}</MenuItem>)
            })
          }
        </Select>
        <FormHelperText>{errorText}</FormHelperText>
      </FormControl>
  );
};
export default SelectInput;
