import React from "react";
import "./styles/main.scss";
import ActionMenu from "./components/action-menu";
import ListItem from "./components/list-item";

function App() {
  return (
    <div className="App">
      <ActionMenu />

      <ListItem listItemId={0} />
    </div>
  );
}

export default App;
