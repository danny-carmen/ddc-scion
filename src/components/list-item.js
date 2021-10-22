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
  setActionType,
  removeChild,
  gatherAndDeleteListItemAndChildren,
} from "../features/list-item-slice";

//need to move line into

const ListItem = (props, children) => {
  let dispatch = useDispatch();

  const shapeElement = useRef(null);

  // const listObject = useSelector((state) => {
  //   return state.listItems.listItems[props.listItemId];
  // });

  // const { isOpen, isFocused, childrenIds } = useSelector((state) => {
  //   return state.listItems.listItems[props.listItemId];
  // });

  const actionType = useSelector((state) => {
    return state.listItems.listItems[props.listItemId].actionType;
  });

  const isOpen = useSelector((state) => {
    return state.listItems.listItems[props.listItemId].isOpen;
  });

  const childrenIds = useSelector((state) => {
    return state.listItems.listItems[props.listItemId].childrenIds;
  });

  const childItems = childrenIds.map((childId, idx) => {
    return (
      <ListItem
        key={idx}
        listItemId={childId}
        removeChild={(childId) => removeChildItem(childId)}
      />
    );
  });

  function removeChildItem(childItemIdToRemove) {
    dispatch(
      removeChild({
        parentItemId: props.listItemId,
        childItemIdToRemove: childItemIdToRemove,
      })
    );
  }

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
    console.log(`List Item ${props.listItemId} container has loaded`);
  });

  useEffect(() => {
    console.log(
      `Action Type on List Item ${props.listItemId} has changed to ${actionType}`
    );

    if (actionType === actionTypes.NEW_LIST_ITEM) {
      dispatch(
        setActionType({ idToModify: props.listItemId, newActionType: null })
      );
      handleFocusClick();
    }
    if (actionType === actionTypes.DELETE_LIST_ITEM) {
      props.removeChild(props.listItemId);

      dispatch(gatherAndDeleteListItemAndChildren());
    }
  }, [actionType]);

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
