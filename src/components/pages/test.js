import React, { Component } from "react";
import ListItem from "../list-item";

export default class Test extends Component {
  render() {
    return (
      <div className="test-field">
        <ListItem listItemId={0} />
      </div>
    );
  }
}
