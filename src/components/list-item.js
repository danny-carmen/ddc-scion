import React, { useEffect, useState, Children, useRef } from "react";
import * as actionTypes from "../app/actionTypes";
import * as TAB_NAMES from "../app/tabNames";
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
  orderChildItems,
  setActionType,
  removeChild,
  determineLowestSetPriority,
  getSelectedItem,
  setParentItemId,
} from "../features/list-item-slice";
import StatusBar from "./status-bar";
import { setMenu } from "../features/menu-slice";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";

//need to move line into

const ListItem = (props, children) => {
  let dispatch = useDispatch();

  const shapeElement = useRef(null);

  const isOpen = useSelector((state) => {
    return state?.listItems?.listItems?.[props.listItemId]?.isOpen;
  });

  const listItemVersion = useSelector((state) => {
    return state?.listItems?.listItems?.[props.listItemId]?.listItemVersion;
  });

  const childrenIds = useSelector((state) => {
    return state?.listItems?.listItems?.[props.listItemId]?.childrenIds;
  });

  useEffect(() => {
    const setChildrenInDb = async () => {
      await updateDoc(doc(db, "list-items", props.listItemId), {
        childrenIds: childrenIds,
      });
    };
    setChildrenInDb();
    // is this one necessary if we have the action type for it?
    if (childrenIds?.length > 0) {
      dispatch(orderChildItems(props.listItemId));
    }
  }, [childrenIds?.length]);

  useEffect(() => {
    if (props.parentItemId && props.listItemId) {
      dispatch(
        setParentItemId({
          childId: props.listItemId,
          parentId: props.parentItemId,
        })
      );
    }
  }, [props.parentItemId]);

  let childItems = null;
  if (childrenIds) {
    childItems = childrenIds.map((childId) => {
      return (
        <ListItem
          key={childId.id}
          listItemId={childId.id}
          parentItemId={props.listItemId}
          priority={childId.priority}
        />
      );
    });
  }

  const handleCheckItem = async (isCompleted) => {
    await updateDoc(doc(db, "list-items", props.listItemId), {
      isCompleted: isCompleted,
    });
    dispatch(toggleCompleted(props.listItemId));
    dispatch(orderChildItems(props.parentItemId));
  };

  function scrollToListItem() {
    if (shapeElement.current) {
      window.scrollTo({
        top: shapeElement.current.offsetTop - 150,
        left:
          shapeElement.current.offsetLeft -
          window.innerWidth / 2 +
          shapeElement.current.offsetWidth / 2 -
          10,
        behavior: "smooth",
      });
    }
  }

  function handleFocusClick(scrollToItem) {
    dispatch(setFocusItem(props.listItemId));
    if (scrollToItem) scrollToListItem();
  }
  if (listItemVersion) {
    return (
      <div className="container">
        <StatusBar
          isOpen={isOpen}
          priority={props.priority}
          listItemId={props.listItemId}
          handleCheckItem={handleCheckItem}
          hasChildren={childrenIds?.length > 0}
          handleFocusClick={handleFocusClick}
          parentId={props.parentItemId}
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
          {isOpen ? childItems : null}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ListItem;
