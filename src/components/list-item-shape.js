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

const ListItemShape = (props) => {
  const dispatch = useDispatch();

  const { isOpen, content, isFocused, childrenIds } = useSelector((state) => {
    return state.listItems.listItems[props.listItemId];
  });

  //   const isOpen = useSelector((state) => {
  //     return state.listItems.listItems[props.listItemId].isOpen;
  //   });

  //   const content = useSelector((state) => {
  //     return state.listItems.listItems[props.listItemId].content;
  //   });

  //   const isFocused = useSelector((state) => {
  //     return state.listItems.listItems[props.listItemId].isFocused;
  //   });

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
    // console.log(`List Item ${props.listItemId} shape has loaded`);
  });

  return (
    <div
      name="shape"
      ref={props.shapeElement}
      onMouseDown={isFocused ? "" : props.handleFocusClick}
      className={isFocused ? "shape shape__focused" : "shape"}
    >
      <div
        onMouseDown={
          childrenIds.length > 0
            ? (e) => {
                dispatch(
                  toggleOpen({
                    parentItemId: props.listItemId,
                    toggledValue: !isOpen,
                  })
                );
              }
            : ""
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
        name="content"
        value={content}
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
