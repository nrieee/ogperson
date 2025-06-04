import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: true,
  runtimeConfig: {
    public: {
      sentryDsn: process.env.SENTRY_DSN,
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID
    },
  },
  modules: [
    '@sentry/nuxt/module',
    ['@nuxtjs/google-fonts', {
      families: {
        'Noto+Sans+JP': true,
      }
    }],
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  sentry: {
    sourceMapsUploadOptions: {
      org: 'nrieee',
      project: 'ogperson'
    },
    autoInjectServerSentry: 'top-level-import'
  },
  sourcemap: {
    client: 'hidden'
  },
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      }
    },
    plugins: [vuetify({ autoImport: true })]
  },
  css: ['~/assets/css/style.css'],
})