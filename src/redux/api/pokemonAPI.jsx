import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonAPI = createApi({
  reducerPath: "pokemonAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  tagTypes: ["Pokedex"],
  endpoints: (builder) => ({
    getPokemonGenerations: builder.query({
      query: () => "generation",
      providesTags: ["Pokedex"],
    }),
    getPokemonListByGeneration: builder.query({
      async queryFn(generationId, _queryApi, _extraOptions, baseQuery) {
        const generationData = await baseQuery(`/generation/${generationId}`);
        if (generationData.error) return { error: generationData.error };

        const pokemonData = await Promise.all(
          generationData.data.pokemon_species.map((item) =>
            baseQuery(`/pokemon/${item.url.match(/\d+/g)[1]}`)
          )
        ).then((response) => Promise.all(response.map((r) => r.data)));
        return { data: pokemonData };
      },
      providesTags: ["Pokedex"],
    }),
  }),
});

export const {
  useGetPokemonGenerationsQuery,
  useGetPokemonListByGenerationQuery,
} = pokemonAPI;
