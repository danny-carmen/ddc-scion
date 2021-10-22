import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addListItem,
  deleteListItem,
  setActionType,
  toggleOpen,
} from "../features/list-item-slice";
import * as actionTypes from "../app/actionTypes";

const ActionMenu = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    console.log("The action menu rendered.");
  });

  function handleAddNewListItem() {
    dispatch(toggleOpen({ idToModify: null, setOpen: true }));

    dispatch(addListItem());
  }

  function handleDeleteClick() {
    dispatch(
      setActionType({
        idToModify: null,
        newActionType: actionTypes.DELETE_LIST_ITEM,
      })
    );
  }

  return (
    <div className="action-menu-wrapper">
      <div className="action-menu">
        <button onClick={handleAddNewListItem}>ADD</button>
        <button>MOVE</button>
        <button>COPY</button>
        <button onClick={handleDeleteClick}>DELETE</button>
      </div>
    </div>
  );
};

export default ActionMenu;
