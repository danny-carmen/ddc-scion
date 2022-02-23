import { configureStore } from "@reduxjs/toolkit";
import listItemsReducer from "../features/list-item-slice";
import menuReducer from "../features/menu-slice";

export const store = configureStore({
  reducer: {
    listItems: listItemsReducer,
    menu: menuReducer,
  },
});
