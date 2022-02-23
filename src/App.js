import React from "react";
import "./styles/main.scss";
import ActionMenu from "./components/action-menu";
import ListItem from "./components/list-item";
import SecondaryMenu from "./components/secondary-menu";

function App() {
  return (
    <div className="App">
      <ActionMenu />
      <SecondaryMenu />
      <ListItem listItemId={0} />
    </div>
  );
}

export default App;
