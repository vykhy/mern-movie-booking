import { createSlice } from "@reduxjs/toolkit";

// currently selected seats
export const seatsSlice = createSlice({
  name: "seats",
  initialState: {
    value: [],
  },
  reducers: {
    removeSeat: (state, action) => {
      state.value.splice(state.value.indexOf(action.payload), 1);
      state.value = [...state.value];
    },

    addSeat: (state, action) => {
      let arr = [...state.value, action.payload];
      arr.sort((a, b) => a - b);
      state.value = arr;
    },
    clearAllSeats: (state) => {
      state.value = [];
    },
  },
});

export const { removeSeat, addSeat, clearAllSeats } = seatsSlice.actions;
export default seatsSlice.reducer;
