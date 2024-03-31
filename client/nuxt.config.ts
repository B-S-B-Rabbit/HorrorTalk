// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "nuxt-quasar-ui"],
  quasar: {
    config: {
      brand: {
        primary: "#BC0909",
        dark: "#120C0A",
        negative: "purple",
        positive: "#BC0909",
      },
    },
  },
});
