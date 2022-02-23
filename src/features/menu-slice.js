import { createSlice } from "@reduxjs/toolkit";
import * as actionTypes from "../app/actionTypes";
import * as TAB_NAMES from "../app/tabNames";

const initialState = {
  currentMenu: "",
};

export const menuSlice = createSlice({
  name: "menuReducer",
  initialState,
  reducers: {
    setMenu: (state, action) => {
      if (state.currentMenu !== action.payload)
        state.currentMenu = action.payload;
      else state.currentMenu = "";
    },
    // setActionType: (state, action) => {
    //   debugger;
    //   state.listItems[
    //     action.payload.idToModify !== null
    //       ? action.payload.idToModify
    //       : state.currentFocusItemId
    //   ].actionType = action.payload.newActionType;
    // },
    // removeChild: (state, action) => {
    //   const childIdToRemove = action.payload;
    //   const keys = Object.keys(state.listItems);
    //   keys.forEach((key) => {
    //     if (state.listItems[key].childrenIds.includes(childIdToRemove)) {
    //       state.listItems[key].childrenIds.splice(
    //         state.listItems[key].childrenIds.indexOf(childIdToRemove),
    //         1
    //       );
    //       return;
    //     }
    //   });
    // },
    // //set child should probably receive a payload at some point, maybe not
    // setChild: (state, action) => {
    //   debugger;
    //   state.listItems[state.currentFocusItemId].childrenIds = [
    //     ...state.listItems[state.currentFocusItemId].childrenIds,
    //     state.currentSelectedItemId,
    //   ];
    // },
    // deleteListItemAndChildren: (state, action) => {
    //   debugger;
    //   let itemsToDelete = [];
    //   itemsToDelete.push(state.currentFocusItemId);
    //   for (var i = 0; i < itemsToDelete.length; i++) {
    //     itemsToDelete.push(...state.listItems[itemsToDelete[i]].childrenIds);
    //   }
    //   itemsToDelete.forEach((item) => {
    //     delete state.listItems[item];
    //   });
    //   state.currentFocusItemId = null;
    // },
    // modifyListItemContent: (state, action) => {
    //   state.listItems[action.payload.idToModify].content =
    //     action.payload.content;
    // },
    // addListItem: (state) => {
    //   state.listItems[state.nextId] = state.newListItem;
    //   state.listItems[state.currentFocusItemId].childrenIds = [
    //     ...state.listItems[state.currentFocusItemId].childrenIds,
    //     state.nextId,
    //   ];
    //   state.nextId += 1; //remove this once getting info from mongoDB
    // },
    // finishAction: (state) => {
    //   //start working from here
    //   //set actiontype to remove child from parent of selected item
    //   //set focused item to be parent of selected item
    //   //set selecteditem to be focused item, way to move to
    //   debugger;
    //   state.listItems[state.currentSelectedItemId].isSelected = false;
    //   state.currentSelectedItemId = null;
    //   state.currentMode = null;
    // },
    // toggleOpen: (state, action) => {
    //   state.listItems[
    //     action.payload.idToModify !== null
    //       ? action.payload.idToModify
    //       : state.currentFocusItemId
    //   ].isOpen = action.payload.setOpen;
    // },
    // setFocusItem: (state, action) => {
    //   if (state.currentFocusItemId !== action.payload) {
    //     if (state.currentFocusItemId !== null) {
    //       state.listItems[state.currentFocusItemId].isFocused = false;
    //     }
    //     state.listItems[action.payload].isFocused = true;
    //     state.currentFocusItemId = action.payload;
    //   }
    // },
    // setSelectedItem: (state, action) => {
    //   if (state.currentSelectedItemId === null) {
    //     state.listItems[state.currentFocusItemId].isSelected = true;
    //     state.currentSelectedItemId = state.currentFocusItemId;
    //   }
    // },
    // setMode: (state, action) => {
    //   state.currentMode = action.payload;
    // },
  },
});

export const currentMenu = (state) => {
  return state.currentMenu;
};

export const { setMenu } = menuSlice.actions;

export default menuSlice.reducer;
