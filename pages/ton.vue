<template>
    <div class="container ">
      <!-- Title Section -->
      <h1 class="text-center fw-bold"><span style="color:cornflowerblue">TON</span> - The Open Network</h1>
      <p class="text-center lead">
        A highly scalable and fast <a href="https://tonscan.org/" target="_blank">blockchain</a> designed for Web3 applications.
      </p>
  <!-- Video Section -->
  <div class="iframe-container">
      <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/XgzHmV_nnpY?si=qAxTfx-wqnvKcbfg" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" 
        allowfullscreen>
      </iframe>
    </div>
      <!-- Description Section -->
      <div class="text-center my-4">
        <p>
          TON (The Open Network) is a decentralized, high-performance blockchain
          designed for fast transactions, low fees, and scalable applications.
          Initially developed by Telegram, it is now maintained by an independent
          community of developers.
        </p>
      </div>
  
      
      <!-- Two-Column Section -->
      <div class="row my-5 align-items-center">
        <div class="col-md-6 position-relative">
          <div class="image-wrapper">
            <img src="https://forklog.com.ua/wp-content/uploads/2024/04/TON_-The-Open-Network-2.webp"
                 class="img-fluid rounded shadow-lg ton-image" alt="TON Logo" />
            <!-- Badge "NEWS" in the top-right corner of the image -->
         <NuxtLink to="/tonNews"  ><span class="badge bg-primary news-badge">NEWS</span></NuxtLink> 
          </div>
        </div>
        <div class="col-md-6">
          <h2>What is TON?</h2>
          <p>
            TON is a third-generation blockchain platform designed for
            ultra-fast transactions, decentralized applications, and secure
            digital payments. It features dynamic sharding, low fees, and an
            innovative consensus mechanism.
          </p>
          <p>
            The network is capable of processing millions of transactions per
            second, making it one of the most scalable blockchain solutions in
            the industry.
          </p>
        </div>
      </div>
  
      <!-- Detailed Ecosystem Explanation -->
      <div class="my-5">
        <h2 class="text-center fw-bold">The TON Ecosystem</h2>
        <p>
          The TON ecosystem consists of several key components, each designed to
          enhance the efficiency and scalability of decentralized applications
          and transactions.
        </p>
  
        <h4>1. TON Blockchain</h4>
        <p>
          A high-performance blockchain that uses dynamic sharding to distribute
          transactions across multiple chains, ensuring fast and secure processing.
        </p>
  
        <h4>2. TON Payments</h4>
        <p>
          The TON blockchain enables instant and low-cost payments, making it an
          ideal solution for digital financial applications.
        </p>
  
        <h4>3. TON DNS</h4>
        <p>
          TON DNS replaces complex blockchain addresses with human-readable names,
          allowing users to interact with smart contracts and wallets effortlessly.
        </p>
  
        <h4>4. TON Storage</h4>
        <p>
          A decentralized storage solution that ensures data availability and
          security for dApps, documents, and multimedia files.
        </p>
  
        <h4>5. TON Services</h4>
        <p>
          A platform that enables developers to create and deploy smart contracts,
          Web3 applications, and decentralized marketplaces.
        </p>
  
        <h4>6. TON Proxy</h4>
        <p>
          A privacy-focused layer that enables secure browsing and anonymous
          transactions within the TON network.
        </p>
  <!-- TradingView Chart -->
  <div class="tradingview-widget-container my-5">
        <div id="tradingview_chart"></div>
      </div>
  
        <h2 class="text-center fw-bold mt-5">TON & Telegram Integration</h2>
        <p>
          TON was initially created by Telegram to provide seamless blockchain
          integration into the messaging app. Although Telegram officially
          discontinued its involvement, the community has continued to develop
          TON, ensuring its integration with Telegram’s ecosystem.
        </p>
        <p>
          Today, TON allows Telegram users to send and receive digital assets,
          make micropayments, and interact with blockchain-based services
          directly from their chats.
        </p>
      </div>
  
     <!-- Blockchain Comparison Table -->
    <div class="table-responsive my-5">
      <h2 class="text-center fw-bold">TON vs Other Blockchains</h2>
      <table class="table table-dark table-striped text-center mt-3">
        <thead>
          <tr>
            <th>Feature</th>
            <th>TON</th>
            <th>Bitcoin</th>
            <th>Ethereum</th>
            <th>Cardano</th>
            <th>Solana</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Transaction Speed</strong></td>
            <td>500,000+ TPS</td>
            <td>7 TPS</td>
            <td>30 TPS</td>
            <td>250 TPS</td>
            <td>65,000 TPS</td>
          </tr>
          <tr>
            <td><strong>Transaction Finality</strong></td>
            <td>~1 sec</td>
            <td>~10 min</td>
            <td>~5 min</td>
            <td>~5-10 min</td>
            <td>~2.5 sec</td>
          </tr>
          <tr>
            <td><strong>Scalability</strong></td>
            <td>High (Dynamic Sharding)</td>
            <td>Low</td>
            <td>Moderate (Ethereum 2.0 Improves)</td>
            <td>Moderate</td>
            <td>High</td>
          </tr>
          <tr>
            <td><strong>Consensus Mechanism</strong></td>
            <td>Proof-of-Stake (PoS)</td>
            <td>Proof-of-Work (PoW)</td>
            <td>Proof-of-Stake (PoS)</td>
            <td>Ouroboros PoS</td>
            <td>Proof-of-History (PoH) + PoS</td>
          </tr>
          <tr>
            <td><strong>Average Fee</strong></td>
            <td>Less than $0.01</td>
            <td>$2-10</td>
            <td>$5-50</td>
            <td>$0.1</td>
            <td>$0.00025</td>
          </tr>
          <tr>
            <td><strong>Smart Contracts</strong></td>
            <td>Yes</td>
            <td>No</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td><strong>Adoption & Use Cases</strong></td>
            <td>Telegram Ecosystem, Payments, dApps</td>
            <td>Store of Value</td>
            <td>DeFi, NFTs, Smart Contracts</td>
            <td>Academic & Financial Solutions</td>
            <td>High-frequency dApps</td>
          </tr>
        </tbody>
      </table>
    </div>
  
      <!-- Conclusion Section -->
      <div class="my-5">
        <h2 class="text-center fw-bold">The Future of TON & Telegram</h2>
        <p>
          With over 800 million active users, Telegram is one of the fastest-growing messaging platforms in the world. It is expected that in the coming years, Telegram's user base will surpass **1 billion users**, making it a dominant force in global communication. With the increasing demand for secure, instant, and low-cost transactions, **TON blockchain** is uniquely positioned to become the backbone of Telegram’s financial ecosystem.
        </p>
        <p>
          Imagine a future where sending money is as simple as sending a message. With **TON's ultra-fast transactions**, users will be able to send digital assets across borders instantly, without relying on traditional banking systems. **Smart contracts and dApps built on TON** will enable peer-to-peer services, decentralized finance, and secure identity verification, all within the Telegram ecosystem.
        </p>
        <p>
          TON is not just another blockchain—it is a **fully integrated financial network** that will redefine the way we interact with digital assets. As more businesses and developers build on TON, it will become a hub for **Web3 applications**, **NFTs**, **gaming**, and **decentralized marketplaces**.
        </p>
        <p class="fw-bold text-center">
          The future is TON. A decentralized world, powered by Telegram, secured by blockchain, and accessible to billions.
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from "vue";
  
  onMounted(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: 400,
      symbol: "BINANCE:TONUSDT",
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      save_image: false,
      container_id: "tradingview_chart",
    });
  
    document.querySelector(".tradingview-widget-container").appendChild(script);
  });
  </script>
 <style scoped>
 /* Wrapper for positioning */
 .image-wrapper {
   position: relative;
   display: inline-block;
   overflow: hidden;
   border-radius: 10px;
 }
 
 /* Основные стили изображения */
 .ton-image {
   width: 100%;
   height: auto;
   display: block;
   filter: brightness(80%); /* Исходное затемнение */
   transition: transform 0.3s ease, filter 0.3s ease; /* Плавная анимация */
 }
 
 /* Эффекты при наведении */
 .image-wrapper:hover .ton-image {
   transform: scale(1.05); /* Легкое увеличение */
   filter: brightness(100%); /* Осветление */
 }
 
 /* Позиционирование бейджа NEWS */
 .news-badge {
   position: absolute;
   top: 10px;
   right: 10px;
   font-size: 14px;
   text-transform: uppercase;
   font-weight: bold;
   border-radius: 10px;
   padding: 5px 10px;
 }
 
 /* Стили для адаптивного видео */
 .iframe-container {
   position: relative;
   width: 100%;
   max-width: 800px;
   margin: 20px auto;
   aspect-ratio: 16 / 9; /* Адаптивное соотношение сторон */
 }
 
 .iframe-container iframe {
   width: 100%;
   height: 100%;
   border-radius: 10px;
 }
 </style>
