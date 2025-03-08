// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import fs from 'node:fs'
import path from 'node:path'

export default defineNuxtConfig({
  runtimeConfig: {
    botToken: process.env.BOT_TOKEN, // Доступно только на сервере
    chatId: process.env.CHAT_ID, // Доступно только на сервере
    public: {
      botToken: process.env.BOT_TOKEN, // Доступно на клиенте
      chatId: process.env.CHAT_ID, // Доступно на клиенте
    }
  },
  devServer: {
    https: {
      key: fs.readFileSync(path.resolve(process.cwd(), 'localhost-key.pem'), 'utf-8'),
      cert: fs.readFileSync(path.resolve(process.cwd(), 'localhost.pem'), 'utf-8')
    }
  },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@/assets/scss/global.scss'
  ],
  script: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.6/umd/popper.min.js',
      body: true,
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js',
      body: true,
    }
  ],
  primevue: {
    /* Configuration */
  },
  modules: [
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@pinia/nuxt',
    '@nuxt/image',
    '@primevue/nuxt-module',
    'dayjs-nuxt',
    'nuxt-typed-router'
  ],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  fonts: {
    families: [
      { name: 'montserrat', provider: 'google' }
    ]
  },
  vite: {
    css: {
      optimizeDeps: {
        include: ['emoji-picker-element'],
      },
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/vars" as *;
            @use "@/assets/scss/mixins" as *;
          `
        }
      }
    }
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
        }
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js',
          strategy: 'body'
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js',
          strategy: 'body'
        }
      ]
    }
  },
  pinia: {  
    autoImports: [  
      ['defineStore', 'definePiniaStore'],  
    ],  
  },
  plugins: [
    '~/plugins/axios.ts',
  ],
})
