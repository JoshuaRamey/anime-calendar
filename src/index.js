import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import AnimeCard from "./AnimeCard";
import DaySelector from "./DaySelector";
import GenreSelector from "./GenreSelector";

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
        onDayClick={day =>
          this.setState({ selectedDay: day, view: "schedule" })
        }
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
          const obj = {
            title: anime.title,
            imageURL: anime.image_url
          };
          return genre.name === this.state.value ? showsReturned.push(obj) : "";
        });
      });
    });

    // console.log("Results: ", showsReturned);
    this.setState({ returned: showsReturned, view: "byGenre" });
  }

  renderGenreSelector() {
    return (
      // <form onSubmit={this.handleSubmit}>
      //   <select value={this.state.value} onChange={this.handleChange}>
      //     {animeGenres.map(genre => (
      //       <option key={genre} value={genre}>
      //         {genre}
      //       </option>
      //     ))}
      //   </select>
      //   <input type="submit" value="Submit" />
      // </form>

      <GenreSelector
        stateValue={this.state.value}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }

  renderReturnedByGenre() {
    return this.state.returned.map(shows => {
      return (
        <div className={"returned"}>
          <li>
            <img
              className={"coverImage"}
              src={shows.imageURL}
              alt={shows.title + " cover art"}
            />
          </li>
          <li className={"animeTitle"}>{shows.title}</li>
        </div>
      );
    });
  }

  renderAnimeCard() {
    return this.state.animeByDay[this.state.selectedDay].map(anime => (
      <AnimeCard
        imageURL={anime.image_url}
        title={anime.title}
        genres={anime.genres}
      />
    ));
  }

  // <a href="#" onClick={(event) => { func1(); func2();}}>Test Link</a>

  render() {
    return (
      <div>
        <h1 id={"logo"}>The Anime Guide</h1>
        {this.renderSelectors()} {this.renderGenreSelector()}
        <h3 id={"tagline"}>What's airing on {this.state.selectedDay}?</h3>
        {/* <h3 id={"tagline"}>{this.state.view === "schedule" ? "What's airing on {this.state.selectedDay}" : "Lol"}</h3> */}
        <div key={"content"} className="content">
          {this.state.view === "byGenre" ? this.renderReturnedByGenre() : ""}

          {this.state.view === "schedule" ? this.renderAnimeCard() : ""}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
