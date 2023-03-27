import { configureStore } from "@reduxjs/toolkit";
import { pokemonAPI } from "./api/pokemonAPI";
import pokedexReducer from "./features/pokedex/pokedexSlice";

export const store = configureStore({
  reducer: {
    [pokemonAPI.reducerPath]: pokemonAPI.reducer,
    pokedex: pokedexReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([pokemonAPI.middleware]),
});
