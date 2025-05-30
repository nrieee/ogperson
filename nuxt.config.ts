import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: true,
  runtimeConfig: {
    public: {
      sentryDsn: process.env.SENTRY_DSN,
    },
  },
  modules: [
    '@sentry/nuxt/module',
    ['@nuxtjs/google-fonts', {
      families: {
        'Noto+Sans+JP': true,
      }
    }],
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify({ autoImport: true }));
      })
    },
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
    }
  },
  css: ['~/assets/css/style.css'],
})