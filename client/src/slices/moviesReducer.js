import { createSlice } from "@reduxjs/toolkit";

// stores all the movies
export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    value: [],
  },
  reducers: {
    loadedMovies: (state, action) => {
      state.value = [...action.payload];
    },
  },
});

export const { loadedMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
