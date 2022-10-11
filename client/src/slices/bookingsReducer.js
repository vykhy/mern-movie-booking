import { createSlice } from "@reduxjs/toolkit";

// all the bookings which our user has made
export const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    value: [],
  },
  reducers: {
    loaded: (state, action) => {
      state.value = [...action.payload];
    },

    add: (state, action) => {
      state.value = [action.payload, ...state.value];
      console.log(state.value);
    },
  },
});

export const { loaded, add } = bookingsSlice.actions;
export default bookingsSlice.reducer;
