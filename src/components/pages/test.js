import React, { useRef } from "react";
import ActionMenu from "../action-menu";
import ListItem from "../list-item";

const Test = () => {
  const windowElement = useRef(null);
  return (
    <div className="test-field">
      <ActionMenu />

      <ListItem listItemId={0} windowRef={windowElement} />
    </div>
  );
};

export default Test;
