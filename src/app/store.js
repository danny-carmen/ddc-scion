import { configureStore } from "@reduxjs/toolkit";
import listItemsReducer from "../features/list-item-slice";

export const store = configureStore({
  reducer: {
    listItems: listItemsReducer,
  },
});
