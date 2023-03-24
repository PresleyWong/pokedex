import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  generation: "generation-i",
  page: 0,
};

export const pokedexSlice = createSlice({
  initialState,
  name: "pokedexSlice",
  reducers: {
    setGeneration: (state, { payload }) => {
      state.generation = payload;
    },
    setPage: (state, { payload }) => {
      state.page = payload;
    },
  },
});

export default pokedexSlice.reducer;
export const { setGeneration, setPage } = pokedexSlice.actions;
export const selectCurrentGeneration = (state) => state.pokedex.generation;
export const selectCurrentPage = (state) => state.pokedex.page;
