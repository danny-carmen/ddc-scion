import React, { useEffect, useState, Children, useRef } from "react";
import * as actionTypes from "../app/actionTypes";

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
  toggleCompleted,
  setActionType,
  removeChild,
} from "../features/list-item-slice";
import StatusBar from "./status-bar";

//need to move line into

const ListItem = (props, children) => {
  let dispatch = useDispatch();

  const shapeElement = useRef(null);

  const isOpen = useSelector((state) => {
    return state.listItems.listItems[props.listItemId].isOpen;
  });

  const isCompleted = useSelector((state) => {
    return state.listItems.listItems[props.listItemId].isCompleted;
  });

  const priority = useSelector((state) => {
    return state?.listItems?.listItems?.[props.listItemId]?.priority;
  });

  const childrenIds = useSelector((state) => {
    return state.listItems.listItems[props.listItemId].childrenIds;
  });

  const childItems = childrenIds.map((childId, idx) => {
    return <ListItem key={idx} listItemId={childId} />;
  });

  const handleCheckItem = () => {
    dispatch(toggleCompleted(props.listItemId));
  };

  function scrollToListItem() {
    if (shapeElement.current) {
      window.scrollTo({
        top: shapeElement.current.offsetTop - 150,
        left: shapeElement.current.offsetLeft - window.innerWidth / 2 + 150,
        behavior: "smooth",
      });
    }
  }
  //potentially something here to change childItems if it is closed, so those aren't even considered to be rendered
  // also set the height in a local state after rendering, then that could be used to hardcode the height in when it is closed?
  function handleFocusClick() {
    dispatch(setFocusItem(props.listItemId));
    scrollToListItem();
  }

  return (
    <div className="container">
      <StatusBar
        isOpen={isOpen}
        priority={priority}
        isCompleted={isCompleted}
        handleCheckItem={handleCheckItem}
        hasChildren={childrenIds.length > 0}
        handleFocusClick={handleFocusClick}
        handleOpenClick={() => {
          dispatch(
            toggleOpen({ idToModify: props.listItemId, setOpen: !isOpen })
          );
        }}
      />
      <ListItemShape
        shapeElement={shapeElement}
        listItemId={props.listItemId}
        handleFocusClick={handleFocusClick}
      />

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
