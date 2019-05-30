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
      view: "scheduleView",
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
      value: "Action",
      searchValue: "",
      tagline: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
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

    fetch("https://api.jikan.moe/v3/anime/21")
      .then(results => {
        return results.json();
      })
      .then(data => {
        console.log(data.broadcast);
      });
  }

  renderSelectors() {
    return (
      <DaySelector
        selectedDay={this.state.selectedDay}
        onDayClick={day =>
          this.setState({ selectedDay: day, view: "scheduleView" })
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
    this.setState({ value: event.target.value, searchValue: "" });
  }

  handleSubmit(event) {
    event.preventDefault();

    const showsReturned = [];

    Object.values(this.state.animeByDay).filter(shows => {
      return shows.filter(anime => {
        return anime.genres.filter(genre => {
          const obj = {
            title: anime.title,
            imageURL: anime.image_url,
            id: anime.mal_id,
            synopsis: anime.synopsis,
            url: anime.url,
            broadcast: ""
          };
          return genre.name === this.state.value ? showsReturned.push(obj) : "";
        });
      });
    });
    // showsReturned.map(anime => {
    //   return fetch("https://api.jikan.moe/v3/anime/" + anime.id)
    //     .then(results => {
    //       return results.json();
    //     })
    //     .then(data => {
    //       // console.log(anime.title, data.broadcast);
    //       anime.broadcast = data.broadcast;
    //       console.log(showsReturned);
    //       this.setState({
    //         returned: showsReturned,
    //         view: "genreView",
    //         searchValue: ""
    //       });
    //     });
    // });

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
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }

  renderAnimeCard() {
    return this.state.animeByDay[this.state.selectedDay].map(anime => (
      <AnimeCard
        imageURL={anime.image_url}
        title={anime.title}
        genres={anime.genres}
        url={anime.url}
        synopsis={anime.synopsis}
      />
    ));
  }

  handleNameChange(event) {
    this.setState({ searchValue: event.target.value });
  }

  handleNameSubmit(event) {
    event.preventDefault();

    const showsReturned = [];

    Object.values(this.state.animeByDay).filter(shows => {
      return shows.filter(anime => {
        const obj = {
          title: anime.title,
          imageURL: anime.image_url,
          id: anime.mal_id,
          synopsis: anime.synopsis,
          url: anime.url,
          broadcast: ""
        };

        return anime.title
          .toLowerCase()
          .includes(this.state.searchValue.toLowerCase())
          ? showsReturned.push(obj)
          : "";
      });
    });
    // showsReturned.map(anime => {
    //   return fetch("https://api.jikan.moe/v3/anime/" + anime.id)
    //     .then(results => {
    //       return results.json();
    //     })
    //     .then(data => {
    //       // console.log(anime.title, data.broadcast);
    //       anime.broadcast = data.broadcast;
    //       console.log(showsReturned);
    //       this.setState({ returned: showsReturned, view: "searchView" });
    //     });
    // });

    // console.log(showsReturned);

    this.setState({
      returned: showsReturned,
      view: "searchView",
      tagline: this.state.searchValue
    });
  }

  searchByName() {
    return (
      <form action="" onSubmit={this.handleNameSubmit}>
        <input
          type="search"
          placeholder="Search by series..."
          value={this.state.searchValue}
          onChange={this.handleNameChange}
        />
        <input className="submit" type="submit" value="Submit" />
      </form>
    );
  }

  renderSearchView() {
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
          {/* <p>{shows.broadcast}</p> */}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h1 id={"logo"}>The Anime Guide</h1>
        {this.renderSelectors()} {this.renderGenreSelector()}{" "}
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
