import { createSlice } from "@reduxjs/toolkit";
import * as actionTypes from "../app/actionTypes";

const initialState = {
  currentFocusItemId: null,
  currentSelectedItemId: null,
  currentMode: "",
  newListItem: {
    listItemVersion: "0.0.1",
    actionType: actionTypes.NEW_LIST_ITEM,
    isOpen: true,
    isFocused: true,
    content: "",
    childrenIds: [],
    isSelected: false,
  },
  nextId: 8,
  listItems: {
    0: {
      actionType: "",
      priority: 3,
      isOpen: true,
      isFocused: false,
      content: "Item 0",
      childrenIds: [1, 2],
      isSelected: false,
    },
    1: {
      actionType: "",
      priority: 1,
      isOpen: false,
      isFocused: false,
      isCompleted: true,
      content: "Item 1",
      childrenIds: [3],
      isSelected: false,
    },
    2: {
      actionType: "",
      priority: 1,
      isOpen: true,
      isFocused: false,
      content: "Item 2",
      childrenIds: [4, 5, 6],
      isSelected: false,
    },
    3: {
      actionType: "",
      priority: 1,
      isOpen: true,
      isFocused: false,
      content: "Item 3",
      childrenIds: [],
      isSelected: false,
    },
    4: {
      actionType: "",
      priority: 1,
      isOpen: true,
      isFocused: false,
      content: "Item 4",
      childrenIds: [],
      isSelected: false,
    },
    5: {
      actionType: "",
      priority: 1,
      isOpen: true,
      isFocused: false,
      content: "Item 5",
      childrenIds: [7],
      isSelected: false,
    },
    6: {
      actionType: "",
      priority: 1,
      isOpen: true,
      isFocused: false,
      content: "Item 6",
      childrenIds: [],
      isSelected: false,
    },
    7: {
      actionType: "",
      priority: 1,
      isOpen: true,
      isFocused: false,
      content: "Item 7",
      childrenIds: [],
      isSelected: false,
    },
  },
};

//need to prevent deleting main root node

//Main component to house all, or just fine being in the div?

//way to do undo

//do actions onclick rather than mousedown, I think that will be needed for mobile

//incorporate arrow keys, escape key at some point,

//also inputs need to define focused element when tabbed to

//Next step incorporating with mongodb?

//OR move and copy functions? Info?

export const listItemSlice = createSlice({
  name: "listItemArray",
  initialState,
  reducers: {
    setActionType: (state, action) => {
      debugger;
      state.listItems[
        action.payload.idToModify !== null
          ? action.payload.idToModify
          : state.currentFocusItemId
      ].actionType = action.payload.newActionType;
    },

    removeChild: (state, action) => {
      const childIdToRemove = action.payload;
      const keys = Object.keys(state.listItems);
      keys.forEach((key) => {
        if (state.listItems[key].childrenIds.includes(childIdToRemove)) {
          state.listItems[key].childrenIds.splice(
            state.listItems[key].childrenIds.indexOf(childIdToRemove),
            1
          );
          return;
        }
      });
    },

    //set child should probably receive a payload at some point, maybe not
    setChild: (state, action) => {
      debugger;
      state.listItems[state.currentFocusItemId].childrenIds = [
        ...state.listItems[state.currentFocusItemId].childrenIds,
        state.currentSelectedItemId,
      ];
    },

    deleteListItemAndChildren: (state, action) => {
      debugger;
      let itemsToDelete = [];
      itemsToDelete.push(state.currentFocusItemId);

      for (var i = 0; i < itemsToDelete.length; i++) {
        itemsToDelete.push(...state.listItems[itemsToDelete[i]].childrenIds);
      }

      itemsToDelete.forEach((item) => {
        delete state.listItems[item];
      });

      state.currentFocusItemId = null;
    },

    modifyListItemContent: (state, action) => {
      state.listItems[action.payload.idToModify].content =
        action.payload.content;
    },

    addListItem: (state) => {
      state.listItems[state.nextId] = state.newListItem;

      state.listItems[state.currentFocusItemId].childrenIds = [
        ...state.listItems[state.currentFocusItemId].childrenIds,
        state.nextId,
      ];

      state.nextId += 1; //remove this once getting info from mongoDB
    },

    finishAction: (state) => {
      //start working from here
      //set actiontype to remove child from parent of selected item
      //set focused item to be parent of selected item
      //set selecteditem to be focused item, way to move to
      debugger;
      state.listItems[state.currentSelectedItemId].isSelected = false;
      state.currentSelectedItemId = null;
      state.currentMode = null;
    },

    toggleOpen: (state, action) => {
      state.listItems[
        action.payload.idToModify !== null
          ? action.payload.idToModify
          : state.currentFocusItemId
      ].isOpen = action.payload.setOpen;
    },

    toggleCompleted: (state, action) => {
      const idToModify =
        action.payload !== null ? action.payload : state.currentFocusItemId;
      state.listItems[idToModify].isCompleted =
        !state.listItems[idToModify].isCompleted;
    },

    setFocusItem: (state, action) => {
      if (state.currentFocusItemId !== action.payload) {
        if (state.currentFocusItemId !== null) {
          state.listItems[state.currentFocusItemId].isFocused = false;
        }
        state.listItems[action.payload].isFocused = true;
        state.currentFocusItemId = action.payload;
      }
    },

    setSelectedItem: (state, action) => {
      if (state.currentSelectedItemId === null) {
        state.listItems[state.currentFocusItemId].isSelected = true;
        state.currentSelectedItemId = state.currentFocusItemId;
      }
    },

    setMode: (state, action) => {
      state.currentMode = action.payload;
    },
  },
});

export const selectListItems = (state) => {
  return state.listItems.listItems;
};

export const {
  addListItem,
  deleteListItem,
  modifyListItemContent,
  toggleOpen,
  setFocusItem,
  setSelectedItem,
  removeChild,
  setMode,
  finishAction,
  setChild,
  deleteListItemAndChildren,
  toggleCompleted,
} = listItemSlice.actions;

export default listItemSlice.reducer;
