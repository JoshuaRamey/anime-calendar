import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

const animeGenres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Game",
  "Harem",
  "Historical",
  "Horror",
  "Kids",
  "Magic",
  "Mecha",
  "Music",
  "Mystery",
  "Parody",
  "Romance",
  "Samurai",
  "School",
  "Sci-Fi",
  "Seinen",
  "Shoujo",
  "Shounen",
  "Slice of Life",
  "Sports",
  "Supernatural"
];

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: "white"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    color: "white"
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

export default function NativeSelects(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <form className={classes.formControl} onSubmit={props.handleSubmit}>
        <InputLabel htmlFor="genre-native-simple" className="white">
          Genre
        </InputLabel>
        <Select
          native
          value={props.stateValue}
          onChange={props.handleChange}
          className="white"
        >
          {animeGenres.map(genre => (
            <option className="white" key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </Select>
        <input className={"submit"} type="submit" value="Submit" />
      </form>
    </div>
  );
}
