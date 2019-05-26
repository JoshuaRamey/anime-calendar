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

export default class GenreSelector extends React.Component {
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const showsReturned = [];

    Object.values(this.state.animeByDay).filter(shows => {
      return shows.filter(anime => {
        return anime.genres.filter(genre => {
          return genre.name === this.state.value
            ? showsReturned.push(anime.title)
            : "";
        });
      });
    });

    // console.log("Results: ", showsReturned);
    this.setState({ returned: showsReturned });
  }

  renderGenreSelector() {
    return (
      <form onSubmit={this.handleSubmit}>
        <select value={this.state.value} onChange={this.handleChange}>
          {animeGenres.map((genre, index) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
