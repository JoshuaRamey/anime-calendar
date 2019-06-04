import React from "react";

export default class AnimeCards extends React.Component {
  render() {
    const { title, cover, genres, id, synopsis } = this.props;
    return (
      <div key={id} className="returned">
        <li>
          <img
            className={"coverImage"}
            src={cover}
            alt={title + " cover art"}
          />
        </li>
        <div className={"animeData"}>
          <li className={"animeTitle"}>{title}</li>
          <li className={"synopsis"}>{synopsis.substring(0, 350)}...</li>
          {/* <li className={"animeTitle"}>{title}</li> */}
        </div>
        <div className="genreDiv">
          {genres.map(genre => {
            return (
              <button key={genre} className={"genres"}>
                {genre}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}
