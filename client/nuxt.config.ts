// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "nuxt-quasar-ui", "@nuxtjs/google-fonts"],
  css: [`/public/assets/colors.scss`],
  googleFonts: {
    families: {
      Inter: true, // Это добавит шрифт Inter
    },
  },
  quasar: {
    config: {
      brand: {
        primary: "#BC0909",
        dark: "#120C0A",
        negative: "#BD7700",
        positive: "#BC0909",
      },
    },
  },
});
