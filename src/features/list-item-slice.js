import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nextId: 8,
  listItems: {
    0: { isOpen: true, content: "Item 0", childrenIds: [1, 2] },
    1: { isOpen: true, content: "Item 1", childrenIds: [3] },
    2: { isOpen: true, content: "Item 2", childrenIds: [4, 5, 6] },
    3: { isOpen: true, content: "Item 3", childrenIds: [] },
    4: { isOpen: true, content: "Item 4", childrenIds: [] },
    5: { isOpen: true, content: "Item 5", childrenIds: [7] },
    6: { isOpen: true, content: "Item 6", childrenIds: [] },
    7: { isOpen: true, content: "Item 7", childrenIds: [] },
  },
};

// const initialState = {
//   value: 8,
//   listItems: [
//     { 0: { content: "Item 0", childrenIds: [1, 2] } },
//     { 1: { content: "Item 1", childrenIds: [3] } },
//     { 2: { content: "Item 2", childrenIds: [4, 5, 6] } },
//     { 3: { content: "Item 3", childrenIds: [] } },
//     { 4: { content: "Item 4", childrenIds: [] } },
//     { 5: { content: "Item 5", childrenIds: [7] } },
//     { 6: { content: "Item 6", childrenIds: [] } },
//     { 7: { content: "Item 7", childrenIds: [] } },
//   ],
// };

export const listItemSlice = createSlice({
  name: "listItemArray",
  initialState,
  reducers: {
    deleteListItem: (state, idToRemove) => {
      const idx = null;

      state.listItems.splice(
        state.listItems.findIndex((listItem) => {
          return listItem.id === idToRemove;
        }),
        1
      );

      // update backend
    },

    modifyListItem: (state, action) => {
      let newProperty = action.payload.newProperty;

      state.listItems[action.payload.idToModify] = {
        ...action.payload.listItem,
        ...newProperty,
      };
      console.log({ ...action.payload.listItem, ...newProperty });
    },

    addListItem: (state, action) => {
      state.listItems[action.payload.newListItemKey] =
        action.payload.newListItemValue;

      state.listItems[action.payload.parentItemId].childrenIds = [
        ...state.listItems[action.payload.parentItemId].childrenIds,
        state.nextId,
      ];
    },

    toggleOpen: (state, action) => {
      state.listItems[action.payload.parentItemId].isOpen =
        action.payload.toggledValue;
    },
  },
});

export const selectListItems = (state) => {
  return state.listItems.listItems;
};

// export const selectCount = (state) => {
//   console.log(state.listItems.value);
//   debugger;
//   return state.listItems.value;
// };

export const { addListItem, deleteListItem, modifyListItem, toggleOpen } =
  listItemSlice.actions;

export default listItemSlice.reducer;
