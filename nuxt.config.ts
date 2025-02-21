// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    
    'bootstrap/dist/css/bootstrap.min.css',
    '@/assets/scss/global.scss'  // подключаем стили Bootstrap
  ],
  script: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.6/umd/popper.min.js',  // Подключаем Popper.js
      body: true,
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js',  // Подключаем Bootstrap
      body: true,
    }
  ],
  primevue: {
    /* Configuration */
},
  modules: [
    '@nuxt/icon',
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
      // automatically imports `defineStore`  
      // 'defineStore',   
      // automatically imports `defineStore` as `definePiniaStore`  
      ['defineStore', 'definePiniaStore'],  
    ],  
  },  
  plugins: [
    '~/plugins/axios.ts',
   
    
  ],
  
  
})