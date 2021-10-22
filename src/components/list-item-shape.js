import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCircle } from "@fortawesome/free-solid-svg-icons";
import {
  addListItem,
  deleteListItem,
  modifyListItemContent,
  selectListItems,
  selectCount,
  toggleOpen,
  setFocusItem,
} from "../features/list-item-slice";
import * as actionTypes from "../app/actionTypes";

const ListItemShape = (props) => {
  const dispatch = useDispatch();

  const { isOpen, content, isFocused, childrenIds, actionType } = useSelector(
    (state) => {
      return state.listItems.listItems[props.listItemId];
    }
  );

  // function handleFocusClick() {
  //   dispatch(setFocusItem(props.listItemId));
  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  //   console.log("Scrolled to Shape!");
  //   console.log(window.scrollX, window.scrollY);
  //   //scroll to item
  // }

  useEffect(() => {
    console.log(`List Item ${props.listItemId} shape has loaded`);
  });

  return (
    <div
      name="shape"
      ref={props.shapeElement}
      onMouseDown={isFocused ? null : props.handleFocusClick}
      className={isFocused ? "shape shape__focused" : "shape"}
    >
      <div
        onMouseDown={
          childrenIds.length > 0
            ? (e) => {
                dispatch(
                  toggleOpen({
                    idToModify: props.listItemId,
                    setOpen: !isOpen,
                  })
                );
              }
            : null
        }
        className={isOpen ? "list-item-symbol open" : "list-item-symbol closed"}
      >
        {childrenIds.length > 0 ? (
          <FontAwesomeIcon className="arrow" icon={faCaretRight} />
        ) : (
          <FontAwesomeIcon className="circle" icon={faCircle} />
        )}
      </div>
      <input
        type="text"
        autoComplete="off"
        autoFocus={actionType === actionTypes.NEW_LIST_ITEM ? true : false}
        name="content"
        value={content}
        onFocus={isFocused ? null : props.handleFocusClick}
        onChange={(e) => {
          dispatch(
            modifyListItemContent({
              idToModify: props.listItemId,
              content: e.target.value,
            })
          );
        }}
      />
    </div>
  );
};

export default ListItemShape;
