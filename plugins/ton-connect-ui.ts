import { defineNuxtPlugin } from '#app';
import { TonConnectUIPlugin } from '@townsquarelabs/ui-vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(TonConnectUIPlugin, {
    manifestUrl: '/tonconnect-manifest.json',
  });
});
