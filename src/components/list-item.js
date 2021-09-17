import React, { useEffect, useState, Children, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import ListItemShape from "./list-item-shape";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCaretRight,
  faPlus,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  addListItem,
  deleteListItem,
  modifyListItem,
  selectListItems,
  selectCount,
  toggleOpen,
  setFocusItem,
} from "../features/list-item-slice";

//if I really want to break up the rendering, I could create a component for the shape as well, which would only listen for certain items in the object
//then the children could be a component as well, which would only listen for the childrenids array
//the main component would only listen for the isOpen?
//line would be a component as well, and it would trigger the onfocused event for the object, which the shape would then respond to
//might get screwy with a ref, but I'll give it a go
//this way, updates to the content will not trigger an update to all children, only the
//does listItem really need to be separate? It is kind of separate already, as it is the separate components
//key is checking if the object deconstructon will work to avoid rerender

const ListItem = (props, children) => {
  let dispatch = useDispatch();

  const shapeElement = useRef(null);

  // const listObject = useSelector((state) => {
  //   return state.listItems.listItems[props.listItemId];
  // });

  const isOpen = useSelector((state) => {
    return state.listItems.listItems[props.listItemId].isOpen;
  });

  const childrenIds = useSelector((state) => {
    return state.listItems.listItems[props.listItemId].childrenIds;
  });

  const childItems = childrenIds.map((childId, idx) => {
    return <ListItem key={idx} listItemId={childId} />;
  });

  //potentially something here to change childItems if it is closed, so those aren't even considered to be rendered
  // also set the height in a local state after rendering, then that could be used to hardcode the height in when it is closed?
  function handleFocusClick(e) {
    dispatch(setFocusItem(props.listItemId));
    window.scrollTo({
      top: shapeElement.current.offsetTop - 150,
      left: shapeElement.current.offsetLeft - window.innerWidth / 2 + 150,
      behavior: "smooth",
    });

    // console.log(this.offsetTop, this.offsetLeft);

    //scroll to item
  }

  useEffect(() => {
    // console.log(`List Item ${props.listItemId} container has loaded`);
  });

  return (
    <div className="container">
      <ListItemShape
        shapeElement={shapeElement}
        listItemId={props.listItemId}
        handleFocusClick={handleFocusClick}
      />

      <div className="line-wrapper" onMouseDown={handleFocusClick}>
        <div className="line"> </div>
      </div>
      <div
        className={
          isOpen ? "item-rows item-rows__open" : "item-rows item-rows__closed"
        }
      >
        {childItems}
      </div>
    </div>
  );
};

export default ListItem;
