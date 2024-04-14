// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "nuxt-quasar-ui", "aak-nuxt-auth-fetch"],
  quasar: {},
  experimental: {
    appManifest: false,
  },
  ssr: false,
  runtimeConfig: {
    public: {
      aakNuxt: {
        fetch: {
          baseUrl: process.env.VITE_BASE_URL || "api/app/",
          refreshUrl: process.env.VITE_REFRESH_URL || "",
          loginUrl: process.env.VITE_LOGIN_URL || "api/app/",
          logoutUrl: process.env.VITE_LOGOUT_URL || "",
          timeout: process.env.VITE_TIMEOUT,
        },
        tokenOptions: {
          accessKey: process.env.VITE_ACCESS_KEY || "",
          refreshKey: process.env.VITE_REFRESH_KEY || "",
        },
        authType: "keycloak", // 'keycloak' | 'custom'
      },
    },
  },
});
