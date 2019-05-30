import React from "react";

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

// onClick={() => onDayClick(day)}
// onDayClick={day => this.setState({ selectedDay: day })}

export default class GenreSelector extends React.Component {
  render() {
    const { handleChange, handleSubmit, stateValue } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <select value={stateValue} onChange={handleChange}>
          {animeGenres.map(genre => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <input className={"submit"} type="submit" value="Submit" />
      </form>
    );
  }
}
