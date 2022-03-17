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
      isOpen: true,
      isFocused: false,
      content: "Item 0",
      childrenIds: [
        { id: 1, priority: 0 },
        { id: 2, priority: 1 },
        { id: 3, priority: 1.5 },
        { id: 5, priority: 3 },
        { id: 6, priority: 1 },
        { id: 7, priority: 1 },
      ],
      isSelected: false,
      parentId: null,
    },
    1: {
      actionType: "",
      isOpen: false,
      isFocused: false,
      isCompleted: true,
      content: "Item 1",
      childrenIds: [],
      isSelected: false,
      parentId: null,
    },
    2: {
      actionType: "",
      isOpen: true,
      isFocused: false,
      content: "Item 2",
      childrenIds: [],
      isSelected: false,
      parentId: null,
    },
    3: {
      actionType: "",
      isOpen: true,
      isFocused: false,
      content: "Item 3",
      childrenIds: [{ id: 4, priority: 2 }],
      isSelected: false,
      parentId: null,
    },
    4: {
      actionType: "",
      isOpen: true,
      isFocused: false,
      content: "Item 4",
      childrenIds: [],
      isSelected: false,
      parentId: null,
    },
    5: {
      actionType: "",
      isOpen: true,
      isFocused: false,
      content: "Item 5",
      childrenIds: [],
      isSelected: false,
      parentId: null,
    },
    6: {
      actionType: "",
      isOpen: true,
      isFocused: false,
      content: "Item 6",
      childrenIds: [],
      isSelected: false,
      parentId: null,
    },
    7: {
      actionType: "",
      isOpen: true,
      isFocused: false,
      content: "Item 7",
      childrenIds: [],
      isSelected: false,
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

    //remove child should be an action type, rather than going through entire list of items TODO
    removeChild: (state, action) => {
      debugger;
      const childIdToRemove = action.payload;
      const keys = Object.keys(state.listItems);
      keys.forEach((key) => {
        if (
          state.listItems[key].childrenIds.some(
            (childItem) => childItem.id === childIdToRemove
          )
        ) {
          state.listItems[key].childrenIds = state.listItems[
            key
          ].childrenIds.filter((child) => {
            return child.id !== childIdToRemove;
          });

          return;
        }
      });
    },

    //set child should probably receive a payload at some point, maybe not, also probably should be called add child
    setChild: (state, action) => {
      debugger;
      state.listItems[state.currentFocusItemId].childrenIds = [
        ...state.listItems[state.currentFocusItemId].childrenIds,
        { id: state.currentSelectedItemId, priority: 0 },
      ];
    },

    setPriority: (state, action) => {
      debugger;
      const childItem = state.listItems[action.payload.itemId];
      state.listItems[childItem.parentId].childrenIds.forEach((child) => {
        if (child.id === action.payload.itemId) {
          debugger;
          child.priority = parseFloat(action.payload.newPriority);
        }
      });
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
        { id: state.nextId, priority: 0 },
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
      debugger;
      const idToModify =
        action.payload !== null ? action.payload : state.currentFocusItemId;
      state.listItems[idToModify].isCompleted =
        !state.listItems[idToModify].isCompleted;

      const listItem = state.listItems[idToModify];

      state.listItems[listItem.parentId].childrenIds.forEach((child) => {
        debugger;
        if (child.id === idToModify) child.priority = 0;
      });
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

      const childArray = [...state.listItems?.[action.payload]?.childrenIds];
      if (childArray === undefined || childArray.length <= 1) return;
      const childrenWithoutSetPriority = childArray.filter((childItem) => {
        if (state.listItems[childItem.id].isCompleted !== true)
          return childItem.priority === 0;
      });

      const completedChildren = childArray.filter((childItem) => {
        return state.listItems[childItem.id].isCompleted === true;
      });

      const childrenWithSetPriority = childArray.filter((childItem) => {
        return childItem.priority !== 0;
      });

      childrenWithSetPriority.sort((childId1, childId2) => {
        return childId1.priority - childId2.priority;
      });

      const priorityArray = childrenWithSetPriority.map((childItem) => {
        return childItem.priority;
      });
      const priorityArrayWithoutDuplicates = Array.from(new Set(priorityArray));

      priorityArrayWithoutDuplicates.sort((a, b) => {
        return a - b;
      });

      childrenWithSetPriority.map((childItem) => {
        debugger;
        const newPriority =
          priorityArrayWithoutDuplicates.indexOf(childItem.priority) + 1;
        childItem.priority = newPriority;
      });

      state.listItems[action.payload].childrenIds = [
        ...childrenWithSetPriority,
        ...childrenWithoutSetPriority,
        ...completedChildren,
      ];
    },
  },
});

export const selectListItems = (state) => {
  return state.listItems.listItems;
};

export const getSelectedItem = (state) => {
  return state.currentSelectedItemId;
};

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
