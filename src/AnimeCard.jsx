import React from "react";

export default class AnimeCards extends React.Component {
  render() {
    const { title, cover, genres, id } = this.props;
    return (
      <div key={id} className="returned">
        <li>
          <img
            className={"coverImage"}
            src={cover}
            alt={title + " cover art"}
          />
        </li>
        <li className={"animeTitle"}>{title}</li>
        {genres.map(genre => {
          return (
            <button key={genre} className={"genres"}>
              {genre}
            </button>
          );
        })}
      </div>
    );
  }
}
