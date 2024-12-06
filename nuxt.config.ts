// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  primevue: {
    /* Configuration */
},
  modules: [
    // "@prisma/nuxt",
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@pinia/nuxt',
    '@nuxt/image',
    // '@nuxtjs/tailwindcss',
    // '@nuxt/ui'
    '@primevue/nuxt-module',
    'dayjs-nuxt',
    'nuxt-typed-router'
  ],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  fonts:{
    families:[{ name:'montserrat',provider:'google'}

    ]
  },
  // rollupOptions: {
  //   external: ['@prisma/nuxt/dist/runtime/server/utils/prisma.d.ts']
  // },
  // prisma:{
  //   autoSetupPrisma:true
  // } ,
  css: ['@/assets/scss/global.scss'], // Глобальные стили
  vite: {
    css: {
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
      // automatically imports `defineStore`  
      'defineStore',   
      // automatically imports `defineStore` as `definePiniaStore`  
      ['defineStore', 'definePiniaStore'],  
    ],  
  },  
  plugins: [
    '~/plugins/axios.ts'
  ]

})