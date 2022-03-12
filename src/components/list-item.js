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

//need to move line into

const ListItem = (props, children) => {
  let dispatch = useDispatch();

  const [isFocused, setIsFocused] = useState(false);

  const shapeElement = useRef(null);

  const isOpen = useSelector((state) => {
    return state.listItems.listItems[props.listItemId].isOpen;
  });

  //potentially bring back actionType, so that individual components can be updated

  const actionType = useSelector((state) => {
    return state.listItems.listItems[props.listItemId].actionType;
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

  useEffect(() => {
    if (childrenIds.length > 0) {
      debugger;
      dispatch(orderChildItems(props.listItemId));
    }
  }, [childrenIds.length]);

  useEffect(() => {
    // debugger;
    if (actionType === actionTypes.ORDER_CHILD_ITEMS) {
      debugger;
      dispatch(orderChildItems(props.listItemId));
    }
    dispatch(
      setActionType({
        idToModify: props.listItemId,
        newActionType: actionTypes.NO_ACTION,
      })
    );
  }, [actionType]);

  // useEffect(() => {
  //   debugger;
  //   if (props.parentItemId !== undefined) {
  //     dispatch(orderChildItems(props.parentItemId));
  //   }
  // }, [priority]);

  // useEffect(() => {
  //   if (childrenIds.length > 0) {
  //     dispatch(orderChildItems(props.listItemId));
  //   }
  // }, []);

  useEffect(() => {
    dispatch(
      setParentItemId({
        childId: props.listItemId,
        parentId: props.parentItemId,
      })
    );
  }, [props.parentItemId]);

  const childItems = childrenIds.map((childId, idx) => {
    return (
      <ListItem
        key={idx}
        listItemId={childId}
        parentItemId={props.listItemId}
      />
    );
  });

  const handleCheckItem = () => {
    dispatch(toggleCompleted(props.listItemId));
    dispatch(orderChildItems(props.parentItemId));
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

  function handleFocusClick() {
    dispatch(setFocusItem(props.listItemId));
    dispatch(setMenu({ tabName: TAB_NAMES.EDIT_LIST_ITEM, noToggle: true }));
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
        {isOpen ? childItems : null}
      </div>
    </div>
  );
};

export default ListItem;
