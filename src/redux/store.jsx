import { configureStore } from "@reduxjs/toolkit";
import { indexAPI } from "./api/indexAPI";
import pokedexReducer from "./features/pokedex/pokedexSlice";

export const store = configureStore({
  reducer: {
    [indexAPI.reducerPath]: indexAPI.reducer,
    pokedex: pokedexReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([indexAPI.middleware]),
});
