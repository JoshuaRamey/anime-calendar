import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import AnimeCard from "./AnimeCard";
import DaySelector from "./DaySelector";
import GenreSelector from "./GenreSelector";

const daysOfWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "scheduleView",
      animeInfo: [],
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
      returned: [],
      checked: false,
      value: "Action",
      searchValue: "",
      tagline: ""
    };

    this.genreSelectHandleChange = this.genreSelectHandleChange.bind(this);
    this.genreSelectHandleSubmit = this.genreSelectHandleSubmit.bind(this);

    this.nameSearchHandleChange = this.nameSearchHandleChange.bind(this);
    this.nameSearchHandleSubmit = this.nameSearchHandleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://api.jikan.moe/v3/schedule")
      .then(results => {
        return results.json();
      })
      .then(data => {
        const animeTemp = [];

        daysOfWeek.map(day => {
          return data[day].map(series => {
            const obj = {
              broadcast: day,
              id: series.mal_id,
              title: series.title,
              cover: series.image_url,
              genres: series.genres.map(genre => {
                return genre.name;
              }),
              synopsis: series.synopsis
            };

            return animeTemp.push(obj);
          });
        });

        this.setState({ animeInfo: animeTemp });
      });
  }

  renderDaySelectors() {
    return (
      <DaySelector
        selectedDay={this.state.selectedDay}
        onDayClick={day =>
          this.setState({ selectedDay: day, view: "scheduleView" })
        }
      />
    );
  }

  genreSelectHandleChange(event) {
    this.setState({ value: event.target.value, searchValue: "" });
  }

  genreSelectHandleSubmit(event) {
    event.preventDefault();

    const showsReturned = [];

    this.state.animeInfo.filter(anime => {
      return anime.genres.filter(genre => {
        const obj = {
          title: anime.title,
          cover: anime.cover,
          id: anime.id,
          synopsis: anime.synopsis,
          broadcast: anime.broadcast,
          genres: anime.genres
        };
        return genre === this.state.value ? showsReturned.push(obj) : "";
      });
    });

    this.setState({
      returned: showsReturned,
      view: "searchView",
      searchValue: "",
      tagline: this.state.value
    });
  }

  renderGenreSelector() {
    return (
      <GenreSelector
        stateValue={this.state.value}
        handleChange={this.genreSelectHandleChange}
        handleSubmit={this.genreSelectHandleSubmit}
      />
    );
  }

  renderAnimeCard() {
    return this.state.animeInfo.map(anime =>
      anime.broadcast === this.state.selectedDay ? (
        <AnimeCard
          cover={anime.cover}
          title={anime.title}
          genres={anime.genres}
          url={anime.url}
          synopsis={anime.synopsis}
        />
      ) : (
        ""
      )
    );
  }

  nameSearchHandleChange(event) {
    this.setState({ searchValue: event.target.value });
  }

  nameSearchHandleSubmit(event) {
    event.preventDefault();

    const showsReturned = [];

    this.state.animeInfo.filter(anime => {
      const obj = {
        title: anime.title,
        cover: anime.cover,
        id: anime.mal_id,
        synopsis: anime.synopsis,
        broadcast: anime.broadcast,
        genres: anime.genres
      };

      return anime.title
        .toLowerCase()
        .includes(this.state.searchValue.toLowerCase())
        ? showsReturned.push(obj)
        : "";
    });

    this.setState({
      returned: showsReturned,
      view: "searchView",
      tagline: this.state.searchValue
    });
  }

  searchByName() {
    return (
      <form action="" onSubmit={this.nameSearchHandleSubmit}>
        <input
          type="search"
          placeholder="Search by series..."
          value={this.state.searchValue}
          onChange={this.nameSearchHandleChange}
        />
        <input className="submit" type="submit" value="Submit" />
      </form>
    );
  }

  renderSearchView() {
    return this.state.returned.map(shows => {
      return (
        <div key={shows.id} className="returned">
          <li>
            <img
              className={"coverImage"}
              src={shows.cover}
              alt={shows.title + " cover art"}
            />
          </li>
          <div className={"animeData"}>
            <li className={"animeTitle"}>{shows.title}</li>
            <li className={"synopsis"}>
              {shows.synopsis.substring(0, 350)}...
            </li>
          </div>
          <div className="genreDiv">
            {shows.genres.map(genre => {
              return (
                <button key={genre} className={"genreBadges"}>
                  {genre}
                </button>
              );
            })}
            <li className={"broadcastData"}>Airs on: {shows.broadcast}</li>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h1 id={"logo"}>The Anime Guide</h1>
        {this.renderDaySelectors()} {this.renderGenreSelector()}{" "}
        {this.searchByName()}
        {this.state.view === "scheduleView" ? (
          <h3 id={"tagline"}>What's airing on {this.state.selectedDay}?</h3>
        ) : (
          <h3 id={"tagline"}>Results for {this.state.tagline}</h3>
        )}
        <div key={"content"} className="content">
          {this.state.view === "scheduleView"
            ? this.renderAnimeCard()
            : this.renderSearchView()}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
