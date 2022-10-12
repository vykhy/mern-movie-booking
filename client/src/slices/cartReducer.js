import { createSlice } from "@reduxjs/toolkit";

const initialCart = {
  name: "",
  date: "",
  seats: [],
  price: 0,
  movieId: null,
  status: "",
};
// state of current booking
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: initialCart,
  },
  reducers: {
    addSeat: (state, action) => {
      let arr = [...state.value.seats, action.payload];
      arr.sort((a, b) => a - b);
      state.value = { ...state.value, seats: arr };
    },
    clearAllSeats: (state) => {
      state.value.seats = [];
    },
    removeSeat: (state, action) => {
      const seats = [...state.value.seats];
      seats.splice(seats.indexOf(action.payload), 1);
      state.value = { ...state.value, seats: seats };
    },
    setCartData: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    setBookingId: (state, action) => {
      state.value = { ...state.value, bookingId: action.payload };
    },
    clearCart: (state) => {
      state.value = initialCart;
    },
  },
});

export const {
  clearCart,
  setBookingId,
  setCartData,
  addSeat,
  removeSeat,
  clearAllSeats,
} = cartSlice.actions;
export default cartSlice.reducer;
