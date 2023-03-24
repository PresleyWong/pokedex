import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const indexAPI = createApi({
  reducerPath: "indexAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/",
  }),
  endpoints: () => ({}),
});
