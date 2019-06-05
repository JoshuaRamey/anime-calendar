import React from "react";

export default class SearchByName extends React.Component {
  render() {
    const { handleSubmit, value, handleChange } = this.props;
    return (
      <form action="" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search by series..."
          value={value}
          onChange={handleChange}
        />
        <input className="submit" type="submit" value="Submit" />
      </form>
    );
  }
}
