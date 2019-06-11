import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

export default function TextFields(props) {
  const classes = useStyles();

  return (
    <form
      className={classes.container}
      onSubmit={props.handleSubmit}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-name"
        label="Name"
        className={classes.textField}
        value={props.value}
        onChange={props.handleChange}
        margin="normal"
      />
      <input className="submit" type="submit" value="Submit" />
    </form>
  );
}
