import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as TAB_NAMES from "../app/tabNames";
import EditMenu from "./edit-menu";

const SecondaryMenu = () => {
  const currentMenuSelection = useSelector((state) => {
    return state.menu.currentMenu;
  });

  const currentFocusItemId = useSelector((state) => {
    return state.listItems.currentFocusItemId;
  });

  let currentMenu = "";
  switch (currentMenuSelection) {
    case TAB_NAMES.EDIT_LIST_ITEM:
      currentMenu = <EditMenu />;
      break;

    case TAB_NAMES.VIEW:
      currentMenu = TAB_NAMES.VIEW;
      break;

    case TAB_NAMES.ACCOUNT:
      currentMenu = TAB_NAMES.ACCOUNT;
      break;

    case TAB_NAMES.SEARCH:
      currentMenu = TAB_NAMES.SEARCH;
      break;

    case TAB_NAMES.SETTINGS:
      currentMenu = TAB_NAMES.SETTINGS;
      break;

    case TAB_NAMES.EXPORT:
      currentMenu = TAB_NAMES.EXPORT;
      break;

    case TAB_NAMES.ADD_LIST_ITEM:
      currentMenu = TAB_NAMES.ADD_LIST_ITEM;
      break;

    case TAB_NAMES.COPY_LIST_ITEM:
      currentMenu = TAB_NAMES.COPY_LIST_ITEM;
      break;

    case TAB_NAMES.DELETE_LIST_ITEM:
      currentMenu = TAB_NAMES.DELETE_LIST_ITEM;
      break;

    case TAB_NAMES.MOVE_LIST_ITEM:
      currentMenu = TAB_NAMES.MOVE_LIST_ITEM;
      break;

    default:
      break;
  }

  if (currentMenuSelection) {
    return <div className="secondary-menu">{currentMenu}</div>;
  } else return null;
};

export default SecondaryMenu;
