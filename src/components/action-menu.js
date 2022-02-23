import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addListItem,
  deleteListItem,
  setSelectedItem,
  toggleOpen,
  setMode,
  moveListItem,
  setChild,
  setFocusItem,
  finishAction,
  removeChild,
  deleteListItemAndChildren,
} from "../features/list-item-slice";
import {
  faArrowsAlt,
  faCog,
  faCopy,
  faEye,
  faInfo,
  faPlus,
  faSearch,
  faShare,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import * as actionTypes from "../app/actionTypes";
import IconButton from "./icon-button";
import * as TAB_NAMES from "../app/tabNames";
import { setMenu } from "../features/menu-slice";

const ActionMenu = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    console.log("The action menu rendered.");
  });

  const { currentFocusItemId, currentMode, currentSelectedItemId } =
    useSelector((state) => {
      return state.listItems;
    });

  function handleAddNewListItem() {
    dispatch(toggleOpen({ idToModify: null, setOpen: true }));

    dispatch(addListItem());
  }

  function openMenu(payload) {
    dispatch(setMenu(payload));
  }

  function handleMoveListItem() {
    debugger;
    dispatch(setSelectedItem());
    dispatch(setMode(actionTypes.MOVE_LIST_ITEM));
  }

  useEffect(() => {
    if (currentMode === actionTypes.MOVE_LIST_ITEM) {
      debugger;
      dispatch(removeChild(currentSelectedItemId));
      dispatch(setChild());
      dispatch(finishAction());
    }
  }, [currentFocusItemId]);

  function handleDeleteListItem() {
    debugger;
    dispatch(removeChild(currentFocusItemId));
    dispatch(deleteListItemAndChildren());
  }

  return (
    <div className="action-menu-wrapper">
      <div className="action-menu general-actions">
        <IconButton
          icon={faSearch}
          text="Search"
          openMenu={openMenu}
          tabName={TAB_NAMES.SEARCH}
        />
        <IconButton
          icon={faEye}
          text="Appearance"
          openMenu={openMenu}
          tabName={TAB_NAMES.VIEW}
        />
        <IconButton
          icon={faCog}
          text="Settings"
          openMenu={openMenu}
          tabName={TAB_NAMES.SETTINGS}
        />
        <IconButton
          icon={faShare}
          text="Export"
          openMenu={openMenu}
          tabName={TAB_NAMES.EXPORT}
        />
        <IconButton
          icon={faUser}
          text="Account"
          openMenu={openMenu}
          tabName={TAB_NAMES.ACCOUNT}
        />
      </div>
      <div className="action-menu list-actions">
        <IconButton
          icon={faInfo}
          text="Edit List Item"
          openMenu={openMenu}
          tabName={TAB_NAMES.EDIT_LIST_ITEM}
        />
        <IconButton
          icon={faTrash}
          text="Delete List Item"
          primaryAction={handleDeleteListItem}
          openMenu={openMenu}
          tabName={TAB_NAMES.DELETE_LIST_ITEM}
        />
        <IconButton
          icon={faArrowsAlt}
          text="Move List Item"
          primaryAction={handleMoveListItem}
          openMenu={openMenu}
          tabName={TAB_NAMES.MOVE_LIST_ITEM}
        />
        <IconButton
          icon={faCopy}
          text="Copy List Item"
          primaryAction={handleAddNewListItem}
          openMenu={openMenu}
          tabName={TAB_NAMES.COPY_LIST_ITEM}
        />
        <IconButton
          icon={faPlus}
          text="Add List Item"
          primaryAction={handleAddNewListItem}
          openMenu={openMenu}
          tabName={TAB_NAMES.ADD_LIST_ITEM}
        />
      </div>
    </div>
  );
};

export default ActionMenu;
