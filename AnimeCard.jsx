import React from "react";

export default class AnimeCards extends React.Component {
  render() {
    const { title, imageURL, genres } = this.props;
    return (
      <div className="returned">
        <li>
          <img
            className={"coverImage"}
            src={imageURL}
            alt={title + " cover art"}
          />
        </li>
        <li className={"animeTitle"}>{title}</li>
        {genres.map(genre => {
          return (
            <button key={genre.name} className={"genres"}>
              {genre.name}
            </button>
          );
        })}
      </div>
    );
  }
}
