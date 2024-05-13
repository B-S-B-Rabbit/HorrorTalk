// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "nuxt-quasar-ui",
    "@nuxtjs/google-fonts",
    "vue3-carousel-nuxt",
  ],
  alias: {
    "vue3-carousel/dist/carousel": "vue3-carousel/dist/carousel.es.js",
  },
  css: [`/public/assets/colors.scss`],
  googleFonts: {
    families: {
      Inter: true, // Это добавит шрифт Inter
      "Jersey 10 Charted": true,
      "Permanent Marker": true,
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
