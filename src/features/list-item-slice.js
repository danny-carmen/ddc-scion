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
      priority: 0,
      isOpen: true,
      isFocused: false,
      content: "Item 0",
      childrenIds: [1, 2, 3, 5, 6, 7],
      isSelected: false,
      lowestSetPriority: 0,
      parentId: null,
    },
    1: {
      actionType: "",
      priority: 0,
      isOpen: false,
      isFocused: false,
      isCompleted: true,
      content: "Item 1",
      childrenIds: [],
      isSelected: false,
      lowestSetPriority: 0,
      parentId: null,
    },
    2: {
      actionType: "",
      priority: 1,
      isOpen: true,
      isFocused: false,
      content: "Item 2",
      childrenIds: [],
      isSelected: false,
      lowestSetPriority: 0,
      parentId: null,
    },
    3: {
      actionType: "",
      priority: 1.5,
      isOpen: true,
      isFocused: false,
      content: "Item 3",
      childrenIds: [4],
      isSelected: false,
      lowestSetPriority: 0,
      parentId: null,
    },
    4: {
      actionType: "",
      priority: 2,
      isOpen: true,
      isFocused: false,
      content: "Item 4",
      childrenIds: [],
      isSelected: false,
      lowestSetPriority: 0,
      parentId: null,
    },
    5: {
      actionType: "",
      priority: 3,
      isOpen: true,
      isFocused: false,
      content: "Item 5",
      childrenIds: [],
      isSelected: false,
      lowestSetPriority: 0,
      parentId: null,
    },
    6: {
      actionType: "",
      priority: 1,
      isOpen: true,
      isFocused: false,
      content: "Item 6",
      childrenIds: [],
      isSelected: false,
      lowestSetPriority: 0,
      parentId: null,
    },
    7: {
      actionType: "",
      priority: 1,
      isOpen: true,
      isFocused: false,
      content: "Item 7",
      childrenIds: [],
      isSelected: false,
      lowestSetPriority: 0,
      parentId: null,
    },
  },
};

//need to prevent deleting main root node

//Main component to house all, or just fine being in the div?

//way to do undo

//incorporate arrow keys, escape key at some point,

//also inputs need to define focused element when tabbed to

export const listItemSlice = createSlice({
  name: "listItemArray",
  initialState,
  reducers: {
    setActionType: (state, action) => {
      // debugger;
      state.listItems[
        action.payload.idToModify !== null
          ? action.payload.idToModify
          : state.currentFocusItemId
      ].actionType = action.payload.newActionType;
    },

    removeChild: (state, action) => {
      const childIdToRemove = action.payload;
      state.listItems[action.payload].priority = 0;
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
      // debugger;
      state.listItems[state.currentFocusItemId].childrenIds = [
        ...state.listItems[state.currentFocusItemId].childrenIds,
        state.currentSelectedItemId,
      ];
    },

    setPriority: (state, action) => {
      // debugger;
      state.listItems[action.payload.itemId].priority = parseFloat(
        action.payload.newPriority
      );
    },

    deleteListItemAndChildren: (state, action) => {
      // debugger;
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
      // debugger;
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
      state.listItems[idToModify].priority = 0;
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

    setParentItemId: (state, action) => {
      state.listItems[action.payload.childId].parentId =
        action.payload.parentId;
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

    orderChildItems: (state, action) => {
      //order by priority
      debugger;

      const childArray = [...state.listItems[action.payload].childrenIds];
      if (childArray.length <= 1) return;
      const childrenWithoutSetPriority = childArray.filter((childItem) => {
        return state.listItems[childItem].priority === 0;
      });

      const childrenWithSetPriority = childArray.filter((childItem) => {
        return state.listItems[childItem].priority !== 0;
      });

      childrenWithSetPriority.sort((childId1, childId2) => {
        return (
          state.listItems[childId1].priority -
          state.listItems[childId2].priority
        );
      });

      const priorityArray = childrenWithSetPriority.map((childItem) => {
        return state.listItems[childItem].priority;
      });
      const priorityArrayWithoutDuplicates = Array.from(new Set(priorityArray));

      priorityArrayWithoutDuplicates.sort((a, b) => {
        return a - b;
      });

      childrenWithSetPriority.map((childItem) => {
        // debugger;
        const newPriority =
          priorityArrayWithoutDuplicates.indexOf(
            state.listItems[childItem].priority
          ) + 1;
        state.listItems[childItem].priority = newPriority;
      });

      state.listItems[action.payload].childrenIds = [
        ...childrenWithSetPriority,
        ...childrenWithoutSetPriority,
      ];
      //condense list to remove non-integers or gaps
    },
  },
});

export const selectListItems = (state) => {
  return state.listItems.listItems;
};

export const getSelectedItem = (state) => {
  return state.currentSelectedItemId;
};

// export const determineLowestSetPriority = (state) => {

// }

export const {
  addListItem,
  deleteListItem,
  modifyListItemContent,
  toggleOpen,
  setFocusItem,
  setSelectedItem,
  setActionType,
  removeChild,
  setMode,
  finishAction,
  setChild,
  deleteListItemAndChildren,
  toggleCompleted,
  orderChildItems,
  setParentItemId,
  setPriority,
} = listItemSlice.actions;

export default listItemSlice.reducer;
