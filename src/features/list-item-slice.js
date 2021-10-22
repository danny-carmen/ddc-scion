import { createSlice } from "@reduxjs/toolkit";
import * as actionTypes from "../app/actionTypes";

const initialState = {
  currentFocusItemId: null,
  newListItem: {
    actionType: actionTypes.NEW_LIST_ITEM,
    isOpen: true,
    isFocused: true,
    content: "",
    childrenIds: [],
  },
  nextId: 8,
  listItems: {
    0: {
      actionType: "",
      isOpen: true,
      isFocused: false,
      content: "Item 0",
      childrenIds: [1, 2],
    },
    1: {
      actionType: "",
      isOpen: true,
      isFocused: false,
      content: "Item 1",
      childrenIds: [3],
    },
    2: {
      actionType: "",
      isOpen: true,
      isFocused: false,
      content: "Item 2",
      childrenIds: [4, 5, 6],
    },
    3: {
      actionType: "",
      isOpen: true,
      isFocused: false,
      content: "Item 3",
      childrenIds: [],
    },
    4: {
      actionType: "",
      isOpen: true,
      isFocused: false,
      content: "Item 4",
      childrenIds: [],
    },
    5: {
      actionType: "",
      isOpen: true,
      isFocused: false,
      content: "Item 5",
      childrenIds: [7],
    },
    6: {
      actionType: "",
      isOpen: true,
      isFocused: false,
      content: "Item 6",
      childrenIds: [],
    },
    7: {
      actionType: "",
      isOpen: true,
      isFocused: false,
      content: "Item 7",
      childrenIds: [],
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
      state.listItems[
        action.payload.idToModify !== null
          ? action.payload.idToModify
          : state.currentFocusItemId
      ].actionType = action.payload.newActionType;
    },
    removeChild: (state, action) => {
      state.listItems[action.payload.parentItemId].childrenIds.splice(
        state.listItems[action.payload.parentItemId].childrenIds.indexOf(
          action.payload.childItemIdToRemove
        ),
        1
      );
    },

    gatherAndDeleteListItemAndChildren: (state, action) => {
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

    toggleOpen: (state, action) => {
      state.listItems[
        action.payload.idToModify !== null
          ? action.payload.idToModify
          : state.currentFocusItemId
      ].isOpen = action.payload.setOpen;
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
  setActionType,
  removeChild,
  gatherAndDeleteListItemAndChildren,
} = listItemSlice.actions;

export default listItemSlice.reducer;
