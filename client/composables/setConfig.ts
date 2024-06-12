export async function useSetConfig() {
  useState("evnVars", () =>
    ref<ApiConfig>({
      proxyUrl: process.env.PROXY_URL ?? "35.185.196.38",
      proxyPort: process.env.PROXY_PORT ?? "3128",
      tbdbApiKey: process.env.TMDB_API_KEY ?? "",
      tmdbUrl: process.env.TMDB_URL ?? "https://api.themoviedb.org/",
      tmdbApiVer: process.env.TMDB_API_VER ?? "3",
    }),
  );
}
