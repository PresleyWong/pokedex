import { indexAPI } from "./indexAPI";

const extendedindexAPI = indexAPI.injectEndpoints({
  tagTypes: ["Pokemon"],
  endpoints: (builder) => ({
    getPokemonGenerations: builder.query({
      query: () => "generation",
      providesTags: ["Pokemon"],
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
      providesTags: ["Pokemon"],
    }),
  }),
});

export const {
  useGetPokemonGenerationsQuery,
  useGetPokemonListByGenerationQuery,
} = extendedindexAPI;
