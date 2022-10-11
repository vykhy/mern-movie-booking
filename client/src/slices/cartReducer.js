import { createSlice } from "@reduxjs/toolkit";

// state of current booking
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: {},
  },
  reducers: {
    create: (state, action) => {
      const data = action.payload;
      state.value = {
        name: data.name,
        date: data.date,
        seats: data.seats,
        price: data.price,
        movie: data.movie,
        status: data.status,
      };
    },
    setBookingId: (state, action) => {
      state.value = { ...state.value, bookingId: action.payload };
    },
    clearCart: (state) => {
      state.value = {};
    },
  },
});

export const { create, clearCart, setBookingId } = cartSlice.actions;
export default cartSlice.reducer;
