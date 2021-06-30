import React from "react";
import { TextField } from "@material-ui/core";
import { useField } from "formik";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import './TextInput.css';

const TextInput = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  const { visiblilitytoggler } = props;

  return (
    <>
      <div className="Input">
        <TextField
          autoComplete="off"
          type={props.type}
          name={props.name}
          helperText={errorText}
          style={{ maxWidth: "35rem", width : '100%' }}
          variant="outlined"
          label={props.label}
          error={meta.error && meta.touched}
          multiline={props.isMultiline}
          rows={4}
          {...field}
        />
        {props.visibilityicon === "true" ? (
          <div
            onClick={visiblilitytoggler}
            className={
              errorText.length === 0
                ? "Icon"
                : ["Icon", "IconInvalid"].join(" ")
            }
          >
            {props.type === "password" ? (
              <Visibility color="primary" />
            ) : (
              <VisibilityOff color="primary" />
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};
export default TextInput;
