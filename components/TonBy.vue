<template>
    <div class="ton-buy-links mb-6">
      <h2 class="title fw-bold">Where to buy TON</h2>
      <div class="links-grid">
        <a v-for="platform in platforms" :key="platform.name" :href="platform.url" target="_blank" class="link-item">
          <NuxtImg :src="platform.icon" :alt="platform.name" class="icon" />
          <span class="label">{{ platform.name }}</span>
        </a>
      </div>
    </div>
  </template>
  
  <script setup>
  const platforms = [
    { name: 'OKX', url: 'https://www.okx.com/trade-spot/ton-usdt', icon: 'https://zengo.com/wp-content/uploads/OKEx_300x300@x2.png' },
    { name: 'Binance', url: 'https://www.binance.com/en/trade/TON_USDT', icon: 'https://images.seeklogo.com/logo-png/59/2/binance-icon-logo-png_seeklogo-598330.png' },
    { name: 'Huobi', url: 'https://www.huobi.com/en-us/exchange/ton_usdt/', icon: 'https://zengo.com/wp-content/uploads/Huobi-Token.png' },
    { name: 'TON DEX', url: 'https://ton.app/dex', icon: 'https://pbs.twimg.com/profile_images/1659135796765491201/WIYCHYUz_400x400.jpg' },
    { name: 'Crypto Bot', url: 'https://t.me/CryptoBot?start=buy_ton', icon: 'https://cwallet.com/_next/static/media/bot-two4.e09d21ba.png' }
  ];
  </script>
  
  <style scoped>
  .ton-buy-links {
    text-align: center;
    padding: 20px;
  }
  
  .title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .links-grid {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
  }
  
  .link-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s ease-in-out;
  }
  
  .link-item:hover {
    transform: scale(1.1);
  }
  
  .icon {
    width: 50px;
    height: 50px;
    border-radius: 10px;
  }
  
  .label {
    margin-top: 5px;
    font-size: 14px;
  }
  </style>