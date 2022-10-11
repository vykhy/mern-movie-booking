import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import bookingsReducer from "./slices/bookingsReducer";
import seatsReducer from "./slices/seatsReducer";
import moviesReducer from "./slices/moviesReducer";
import cartReducer from "./slices/cartReducer";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    bookings: bookingsReducer,
    seats: seatsReducer,
    movies: moviesReducer,
    cart: cartReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
