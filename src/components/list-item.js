import React, { useEffect, useState, Children, useRef } from "react";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
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

const ListItem = (props, children) => {
  let dispatch = useDispatch();

  const shapeElement = useRef(null);

  const listObject = useSelector((state) => {
    return state.listItems.listItems[props.listItemId];
  });

  if (props.listItemId === 3) {
    console.log(listObject);
  }
  console.log("List Object: ", listObject);

  //   console.log("This list Object: ", listObject[props.listItemId]);

  const childItems = listObject.childrenIds.map((childId, idx) => {
    return <ListItem key={idx} listItemId={childId} />;
  });

  //   const childItems = listObject.listItem.childrenIds.map((childId, idx) => {
  //     return <ListItem key={idx} listItemId={childId} />;
  //   });

  function handleFocusClick() {
    dispatch(setFocusItem(props.listItemId));
    console.log(shapeElement.current.offsetLeft);

    //scroll to item
  }

  useEffect(() => {
    console.log(`List Item ${props.listItemId} has loaded`);
    console.log(shapeElement.current.offsetTop);
  });

  return (
    <div className="container">
      <div
        name="shape"
        ref={shapeElement}
        onClick={handleFocusClick}
        className={listObject.isFocused ? "shape shape__focused" : "shape"}
      >
        <div
          onClick={(e) => {
            dispatch(
              toggleOpen({
                parentItemId: props.listItemId,
                toggledValue: !listObject.isOpen,
              })
            );
          }}
          className={
            listObject.isOpen
              ? "list-item-symbol open"
              : "list-item-symbol closed"
          }
        >
          {listObject.childrenIds.length > 0 ? (
            <FontAwesomeIcon className="arrow" icon={faCaretRight} />
          ) : (
            <FontAwesomeIcon className="circle" icon={faCircle} />
          )}
        </div>
        <input
          type="text"
          name="content"
          value={listObject.content}
          onChange={(e) => {
            dispatch(
              modifyListItem({
                idToModify: props.listItemId,
                listItem: listObject,
                newProperty: { [e.target.name]: e.target.value },
              })

              //   addListItem({
              //     parentItemId: props.listItemId,
              //     newListItemKey: 8,
              //     newListItemValue: { content: "Item 8", childrenIds: [] },
              //   })
            );
          }}
        />
      </div>

      <div className="line-wrapper" onClick={handleFocusClick}>
        <div className="line"> </div>
      </div>
      <div
        height={listObject.isOpen ? `${listObject.childCount * 67}px` : "0px"}
        className={
          listObject.isOpen
            ? "item-rows item-rows__open"
            : "item-rows item-rows__closed"
        }
      >
        {childItems}
      </div>
    </div>
  );
};

export default ListItem;
