<template>
    <div class="container">
      <button @click="openCryptoModal" class="btn btn-primary mt-4">
        📊 Показать курс BTC и ETH
      </button>
  
      <div v-if="showCryptoModal" class="modal-overlay">
        <div class="modal-content p-4">
          <button class="close-btn" @click="closeCryptoModal">❌</button>
          <h4 class="text-center fw-bold mb-3">📊 ТОП-2 Криптовалют</h4>
  
          <div class="row row-cols-1 row-cols-md-2 g-3">
            <div v-for="coin in cryptoData" :key="coin.rank" class="col">
              <div class="card shadow-sm border-0">
                <div class="card-body text-center">
                  <img :src="coin.image" class="crypto-icon mb-2" />
                  <h5 class="card-title fw-bold">{{ coin.name }} ({{ coin.symbol }})</h5>
                  <p class="crypto-price text-primary fw-bold">💰 {{ coin.price }}</p>
                  <p class="crypto-market-cap text-secondary">🏦 {{ coin.marketCap }}</p>
                  <span class="crypto-change badge" :class="coin.change24h >= 0 ? 'bg-success' : 'bg-danger'">
                    📈 {{ coin.change24h }}%
                  </span>
                </div>
              </div>
            </div>
          </div>
  
          <button @click="sendCryptoToTelegram" class="btn btn-success mt-4 w-100">
            📢 Обновить курс в Telegram
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted, onUnmounted } from "vue";
  import axios from "axios";
  import { useChannelStore } from "@/stores/channelStore";
  
  export default {
    setup() {
      const channelStore = useChannelStore();
      const cryptoData = ref([]);
      const showCryptoModal = ref(false);
      const pinnedMessageId = ref(null);
      let lastMessageText = "";
      let updateInterval = null;
  
      const activeChannelId = computed(() => channelStore.activeChannelId);
      const botToken = computed(() => channelStore.botToken);
  
      if (typeof window !== "undefined") {
        pinnedMessageId.value = localStorage.getItem("pinnedMessageId") || null;
      }
  
      const savePinnedMessageId = (messageId) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("pinnedMessageId", messageId);
        }
      };
  
      const removePinnedMessageId = () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("pinnedMessageId");
        }
      };
  
      const fetchCryptoPrices = async () => {
        try {
          console.log("📊 Запрос курса BTC и ETH...");
          const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
            params: { vs_currency: "usd", ids: "bitcoin,ethereum", order: "market_cap_desc" },
          });
  
          cryptoData.value = response.data.map((coin) => ({
            rank: coin.market_cap_rank,
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            price: `$${coin.current_price.toLocaleString()}`,
            marketCap: `$${(coin.market_cap / 1e9).toFixed(2)}B`,
            image: coin.image,
            change24h: coin.price_change_percentage_24h.toFixed(2),
          }));
  
          console.log("✅ Курсы загружены:", cryptoData.value);
          showCryptoModal.value = true;
        } catch (error) {
          console.error("Ошибка загрузки криптовалют:", error);
        }
      };
  
    //   const sendCryptoToTelegram = async () => {
    //     if (!activeChannelId.value) return alert("Выберите канал!");
  
    //     console.log("📤 Отправка курса BTC и ETH в Telegram...");
  
    //     let messageText ="";
    //     cryptoData.value.forEach((coin) => {
    //       messageText += `* (${coin.symbol})*${coin.price}\n\n`;
    //     });

    //     if (messageText === lastMessageText) {
    //       console.log("🔄 Текст сообщения не изменился. Telegram не требует обновления.");
    //       return;
    //     }
  
    //     try {
    //       if (!pinnedMessageId.value) {
    //         console.log("📌 Сообщение не найдено или удалено, отправляем новое...");
  
    //         const response = await axios.post(
    //           `https://api.telegram.org/bot${botToken.value}/sendMessage`,
    //           {
    //             chat_id: activeChannelId.value,
    //             text: messageText,
    //             parse_mode: "Markdown",
    //           }
    //         );
  
    //         pinnedMessageId.value = response.data.result.message_id;
    //         savePinnedMessageId(pinnedMessageId.value);
    //         lastMessageText = messageText;
    //         console.log("✅ Новое сообщение отправлено. ID:", pinnedMessageId.value);
    //       } else {
    //         console.log("📢 Обновление закрепленного сообщения:", {
    //           chat_id: activeChannelId.value,
    //           message_id: pinnedMessageId.value,
    //           text: messageText,
    //           parse_mode: "Markdown",
    //         });
  
    //         await axios.post(`https://api.telegram.org/bot${botToken.value}/editMessageText`, {
    //           chat_id: activeChannelId.value,
    //           message_id: pinnedMessageId.value,
    //           text: messageText,
    //           parse_mode: "Markdown",
    //         });
  
    //         console.log("📌 Открепляем и заново закрепляем для обновления в UI...");
    //         await axios.post(`https://api.telegram.org/bot${botToken.value}/unpinChatMessage`, {
    //           chat_id: activeChannelId.value,
    //           message_id: pinnedMessageId.value,
    //         });
  
    //         await axios.post(`https://api.telegram.org/bot${botToken.value}/pinChatMessage`, {
    //           chat_id: activeChannelId.value,
    //           message_id: pinnedMessageId.value,
    //           disable_notification: true,
    //         });
  
    //         lastMessageText = messageText;
    //         console.log("✅ Курс успешно обновлен в Telegram!");
    //       }
    //     } catch (error) {
    //       console.error("❌ Ошибка отправки в Telegram:", error.response?.data || error.message);
  
    //       if (error.response?.data?.error_code === 400) {
    //         console.warn("⚠️ Telegram отклонил запрос! Возможно, сообщение удалено.");
    //         removePinnedMessageId();
    //         pinnedMessageId.value = null;
    //       }
    //     }
    //   };




//     const sendCryptoToTelegram = async () => {
//   if (!activeChannelId.value) return alert("Выберите канал!");

//   console.log("📤 Отправка курса BTC и ETH в Telegram...");

//   let messageText = "";
//   cryptoData.value.forEach((coin) => {
//     messageText += `*${coin.name} (${coin.symbol})*\n💰 ${coin.price}\n🏦 ${coin.marketCap}\n📈 ${coin.change24h}%\n\n`;
//   });

//   // Если курс не изменился, Telegram не требует обновления
//   if (messageText === lastMessageText) {
//     console.log("🔄 Курс не изменился, обновление не требуется.");
//     return;
//   }

//   try {
//     if (!pinnedMessageId.value) {
//       console.log("📌 Сообщение не найдено или удалено, отправляем новое...");

//       const response = await axios.post(
//         `https://api.telegram.org/bot${botToken.value}/sendMessage`,
//         {
//           chat_id: activeChannelId.value,
//           text: messageText,
//           parse_mode: "Markdown",
//         }
//       );

//       pinnedMessageId.value = response.data.result.message_id;
//       savePinnedMessageId(pinnedMessageId.value);
//       lastMessageText = messageText;
//       console.log("✅ Новое сообщение отправлено. ID:", pinnedMessageId.value);

//       // Закрепляем сообщение только один раз, если оно новое
//       await axios.post(`https://api.telegram.org/bot${botToken.value}/pinChatMessage`, {
//         chat_id: activeChannelId.value,
//         message_id: pinnedMessageId.value,
//         disable_notification: true,
//       });
//     } else {
//       console.log("📢 Обновление закрепленного сообщения без перезакрепления...");

//       await axios.post(`https://api.telegram.org/bot${botToken.value}/editMessageText`, {
//         chat_id: activeChannelId.value,
//         message_id: pinnedMessageId.value,
//         text: messageText,
//         parse_mode: "Markdown",
//       });

//       lastMessageText = messageText;
//       console.log("✅ Курс успешно обновлен в Telegram!");
//     }
//   } catch (error) {
//     console.error("❌ Ошибка отправки в Telegram:", error.response?.data || error.message);

//     if (error.response?.data?.error_code === 400) {
//       console.warn("⚠️ Telegram отклонил запрос! Возможно, сообщение удалено.");
//       removePinnedMessageId();
//       pinnedMessageId.value = null;
//     }
//   }
// };


const sendCryptoToTelegram = async () => {
  if (!activeChannelId.value) return alert("Выберите канал!");

  console.log("📤 Отправка курса BTC и ETH в Telegram...");

  // ID анимированного эмодзи биткоина
  //const bitcoinEmojiId = "5379773896352355687";

//   let messageText = "";
//   cryptoData.value.forEach((coin) => {
//     if (coin.symbol.toLowerCase() === "btc") {
//       messageText += ` ${coin.symbol.toLowerCase()} ${coin.price}\n`;
//     } else {
//       messageText += `${coin.symbol.toLowerCase()} ${coin.price}\n`;
//     }
//   });
let messageText = "Топ 100 криптовалют - курс, капитализация и объёмы торгов";
  cryptoData.value.forEach((coin) => {
    messageText += `*${coin.name} (${coin.symbol})*\n💰 ${coin.price}\n🏦 ${coin.marketCap}\n📈 ${coin.change24h}%\n\n`;
  });
  // Если курс не изменился, Telegram не требует обновления
  if (messageText === lastMessageText) {
    console.log("🔄 Курс не изменился, обновление не требуется.");
    return;
  }

  try {
    if (pinnedMessageId.value) {
      console.log("📢 Обновление закрепленного сообщения...");

      await axios.post(`https://api.telegram.org/bot${botToken.value}/editMessageText`, {
        chat_id: activeChannelId.value,
        message_id: pinnedMessageId.value,
        text: messageText,
        parse_mode: "HTML",
      });

      lastMessageText = messageText;
      console.log("✅ Курс успешно обновлен в Telegram!");
    } else {
      console.log("📌 Закрепленного сообщения нет! Отправляем новое...");

      const response = await axios.post(
        `https://api.telegram.org/bot${botToken.value}/sendMessage`,
        {
          chat_id: activeChannelId.value,
          text: messageText,
          parse_mode: "HTML",
        }
      );

      pinnedMessageId.value = response.data.result.message_id;
      savePinnedMessageId(pinnedMessageId.value);
      lastMessageText = messageText;

      // Закрепляем сообщение только ОДИН раз при первом создании
      await axios.post(`https://api.telegram.org/bot${botToken.value}/pinChatMessage`, {
        chat_id: activeChannelId.value,
        message_id: pinnedMessageId.value,
        disable_notification: true,
      });

      console.log("✅ Новое сообщение закреплено!");
    }
  } catch (error) {
    console.error("❌ Ошибка отправки в Telegram:", error.response?.data || error.message);

    if (error.response?.data?.error_code === 400) {
      console.warn("⚠️ Сообщение удалено! Отправляем новое...");

      const response = await axios.post(
        `https://api.telegram.org/bot${botToken.value}/sendMessage`,
        {
          chat_id: activeChannelId.value,
          text: messageText,
          parse_mode: "HTML",
        }
      );

      pinnedMessageId.value = response.data.result.message_id;
      savePinnedMessageId(pinnedMessageId.value);
      lastMessageText = messageText;

      // Закрепляем ТОЛЬКО если это новое сообщение
      await axios.post(`https://api.telegram.org/bot${botToken.value}/pinChatMessage`, {
        chat_id: activeChannelId.value,
        message_id: pinnedMessageId.value,
        disable_notification: true,
      });

      console.log("✅ Новое сообщение закреплено!");
    }
  }
};

      const startUpdating = () => {
        if (!updateInterval) {
          updateInterval = setInterval(async () => {
            console.log("🔄 Обновление курса криптовалют...");
            await fetchCryptoPrices();
            await sendCryptoToTelegram();
          }, 60000);
          console.log("✅ Таймер обновления запущен.");
        }
      };
  
      const stopUpdating = () => {
        if (updateInterval) {
          clearInterval(updateInterval);
          updateInterval = null;
          console.log("🛑 Таймер обновления курса остановлен.");
        }
      };
  
      onMounted(() => {
        startUpdating();
      });
  
      onUnmounted(() => {
        stopUpdating();
      });
  
      return {
        removePinnedMessageId,
        fetchCryptoPrices,
        sendCryptoToTelegram,
        showCryptoModal,
        cryptoData,
        openCryptoModal: fetchCryptoPrices,
        closeCryptoModal: () => (showCryptoModal.value = false),
      };
    },
  };
  </script>
  
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    border-radius: 10px;
    width: 80%;
    max-width: 700px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: none;
    font-size: 20px;
    cursor: pointer;
  }
  
  .crypto-icon {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
  
  .crypto-price {
    font-size: 18px;
  }
  
  .crypto-market-cap {
    font-size: 14px;
  }
  
  .crypto-change {
    font-size: 14px;
    padding: 5px 10px;
    border-radius: 5px;
  }
  </style>
  
  