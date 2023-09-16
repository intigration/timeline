
import locales from "./config/locales.json";

export default defineI18nConfig(() => {
    return {
           locales: locales,
            lazy: {
              skipNuxtState: true,
            },
            langDir: "./locales/",
            strategy: "prefix_and_default",
            defaultLocale: "en",
            vueI18n: {
              legacy: false,
              fallbackLocale: "en",
            }

    }
  })