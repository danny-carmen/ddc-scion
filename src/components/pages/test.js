import React, { Component } from "react";
import ListItem from "../list-item";

export default class Test extends Component {
  render() {
    return (
      <div className="test-field">
        <div className="window">
          <ListItem listItemId={0} />
        </div>
      </div>
    );
  }
}
