// plugins/tonConnectUI.js
import { defineNuxtPlugin } from '#app';
import { createTonConnectUIProvider, TonConnectUIContext, TonConnectUIOptionsContext } from 'ton-ui-vue';

export default defineNuxtPlugin((nuxtApp) => {
  const { tonConnectUI, setOptions } = createTonConnectUIProvider({
    manifestUrl: 'https://your-manifest-url' // Замените на URL вашего манифеста
  });

  nuxtApp.vueApp.provide(TonConnectUIContext, tonConnectUI);
  nuxtApp.vueApp.provide(TonConnectUIOptionsContext, setOptions);
});
