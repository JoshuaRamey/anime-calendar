import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import AnimeCard from "./AnimeCard";
import DaySelector from "./DaySelector";

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "schedule",
      animeByDay: {
        sunday: [],
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: []
      },
      selectedDay: "sunday",
      fetchCheck: null,
      returned: [],
      checked: false,
      value: "Action"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() is called automatically,
  // but it's called AFTER the render!
  componentDidMount() {
    fetch("https://api.jikan.moe/v3/schedule")
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({
          animeByDay: {
            sunday: data.sunday,
            monday: data.monday,
            tuesday: data.tuesday,
            wednesday: data.wednesday,
            thursday: data.thursday,
            friday: data.friday,
            saturday: data.saturday
          },
          fetchCheck: "fetched"
        });

        console.log(this.state);
      });
  }

  renderSelectors() {
    return (
      <DaySelector
        selectedDay={this.state.selectedDay}
        onDayClick={day => this.setState({ selectedDay: day })}
      />
    );
  }

  renderSchedule() {
    return this.state.animeByDay[this.state.selectedDay].map(anime => {
      return (
        <AnimeCard
          imageURL={anime.image_url}
          title={anime.title}
          genres={anime.genres}
        />
      );
    });
  }

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

  // filterTest(list) {
  //   const filtered = [];

  //   list.filter(anime => {
  //     if (anime.score > 5) {
  //       // console.log(anime.title);
  //       filtered.push(anime.title);
  //       this.setState({ returned: filtered });
  //     }
  //   });
  // }

  // <a href="#" onClick={(event) => { func1(); func2();}}>Test Link</a>

  render() {
    return (
      <div>
        <h1 id={"logo"}>The Anime Guide</h1>
        {this.renderSelectors()} {this.renderGenreSelector()}
        <h3 id={"tagline"}>What's airing on {this.state.selectedDay}?</h3>
        <div key={"content"} className="content">
          <ul>
            {this.state.returned.map(shows => {
              return <li>{shows}</li>;
            })}
          </ul>

          {this.state.animeByDay[this.state.selectedDay].map(anime => (
            <AnimeCard
              imageURL={anime.image_url}
              title={anime.title}
              genres={anime.genres}
            />
          ))}
          {this.state.view === "chooseGenre" ? this.renderGenreSelector() : ""}
          <ul>
            {this.state.view === "chooseGenre"
              ? this.state.returned.map(series => (
                  <li className={"returnedByGenre"}>{series}</li>
                ))
              : ""}
          </ul>

          {/* <ul>{this.state.fetchCheck !== null && this.getByGenre()}</ul> */}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
