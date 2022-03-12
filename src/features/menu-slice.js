import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMenu: "",
};

export const menuSlice = createSlice({
  name: "menuReducer",
  initialState,
  reducers: {
    setMenu: (state, action) => {
      if (!action.payload.noToggle) {
        if (state.currentMenu !== action.payload.tabName)
          state.currentMenu = action.payload.tabName;
        else state.currentMenu = "";
      } else {
        state.currentMenu = action.payload.tabName;
      }
    },
  },
});

export const { setMenu } = menuSlice.actions;

export default menuSlice.reducer;
