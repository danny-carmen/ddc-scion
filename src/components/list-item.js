import React, { useEffect, useState, Children } from "react";
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
} from "../features/list-item-slice";

import { useRef } from "react";

const ListItem = (props, children) => {
  let dispatch = useDispatch();

  //   const listObject = useSelector((state) => {
  //     let list = state.listItems.find((listItem) => {
  //       return listItem. === props.listItemId;
  //     });
  //     return list;
  //   });
  //     const fullState = useSelector()

  //   const selectListItemsSelector = createSelector(
  //     [selectListItems],
  //     (state) => state.listItems
  //   );

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

  useEffect(() => {
    console.log(`List Item ${props.listItemId} has loaded`);
  });

  return (
    <div className="container">
      <div className="shape">
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

      <div className="line"></div>
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
