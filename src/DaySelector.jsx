import React from "react";

const daysOfWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];

class DayButton extends React.Component {
  render() {
    const { onClick, label, selected } = this.props;
    return (
      <button
        className={"selector" + (selected ? " selected" : "")}
        onClick={onClick}
      >
        <div className="selectorLabel">{label}</div>
      </button>
    );
  }
}

export default class DaySelector extends React.Component {
  render() {
    const { onDayClick, selectedDay } = this.props;
    return daysOfWeek.map(day => (
      <DayButton
        label={day}
        selected={day === selectedDay}
        onClick={() => onDayClick(day)}
      />
    ));
  }
}
