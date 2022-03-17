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
  const { isOpen, content, childrenIds, actionType, isSelected } = useSelector(
    (state) => {
      return state.listItems.listItems[props.listItemId];
    }
  );
  const { currentFocusItemId } = useSelector((state) => {
    //I'd rather have this be an action type, not checking for every single one
    return state.listItems;
  });

  const isFocused = props.listItemId === currentFocusItemId;

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
      onClick={isFocused ? null : props.handleFocusClick}
      onDoubleClick={() => {
        debugger;
        dispatch(
          toggleOpen({ idToModify: props.listItemId, setOpen: !isOpen })
        );
      }}
      className={
        isSelected
          ? "shape shape__selected "
          : isFocused
          ? "shape shape__focused"
          : "shape"
      }
    >
      {content}
    </div>
  );
};

export default ListItemShape;
