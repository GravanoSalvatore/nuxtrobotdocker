<!-- <template>
  <div class="container">
    <select
      v-model="selectedCategory"
      @change="fetchNews"
      class="form-control w-100 mb-3"
    >
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>

    <div v-if="news.length > 0" class="news-list">
      <div class="row row-cols-1 row-cols-md-3 g-3 mt-3">
        <div v-for="item in news" :key="item.id" class="col">
          <div class="car">
            <img
              v-if="item.urlToImage"
              :src="item.urlToImage"
              class="card-img-top c"
            />
            <img v-else src="" class="card-img-top c" />

            <div class="card-body">
              <h5 class="card-title">
                <p
                  style="background-color: cornflowerblue; color: white"
                  class="p-1 fw-bold"
                >
                  {{ item.sourceName }}
                </p>
                <a class="fw-bold" :href="item.url" target="_blank">{{
                  item.title
                }}</a>
              </h5>
              <p class="card-text">
                <small class="text-muted">{{
                  formatDateTime(item.publishedAt)
                }}</small>
              </p>
              <p>{{ item.description }}</p>
              <p>{{ item.content }}</p>
            </div>
            <button @click="sendToTelegram(item)" class="btn btn-danger1 mt-2">
              Отправить в Telegram <i class="bi bi-telegram"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loadingNews" class="text-center">
      <p>Загрузка новостей...</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { useChannelStore } from "@/stores/channelStore";
import { ref, computed, onMounted, watch } from "vue";

export default {
  setup() {
    const channelStore = useChannelStore();
    const news = ref([]);
    const loadingNews = ref(false);
    const selectedCategory = ref(16); // По умолчанию Криптовалюта
    const autoSendInterval = ref(null); // Для автообновления новостей
    const messageQueue = ref([]); // Очередь сообщений для отправки
    const isSending = ref(false); // Флаг отправки

    const categories = ref([
      { id: 16, name: "Криптовалюта" },
      { id: 19, name: "IT" },
      { id: 8, name: "Технологии" },
    ]);

    const activeChannelId = computed(() => channelStore.activeChannelId);
    const botToken = computed(() => channelStore.botToken);

    // ✅ Безопасно загружаем `localStorage`
    const getStoredSentNewsIds = () => {
      if (typeof window !== "undefined" && window.localStorage) {
        return new Set(JSON.parse(localStorage.getItem("sentNewsIds") || "[]"));
      }
      return new Set();
    };

    // ✅ Обновляем `localStorage`, если он доступен
    const updateStoredSentNewsIds = (sentNewsIds) => {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("sentNewsIds", JSON.stringify([...sentNewsIds]));
      }
    };

    // ✅ Храним отправленные новости (с защитой)
    const sentNewsIds = ref(getStoredSentNewsIds());

    const fetchNews = async () => {
      try {
        loadingNews.value = true;
        const response = await axios.get(
          `https://4v-news-api.azurewebsites.net/News?SiteId=1&LanguageCode=ru&CategoryId=${selectedCategory.value}&Page=1&PageSize=40`
        );
        news.value = response.data.items;

        if (selectedCategory.value === 16) {
          autoSendNewCryptoNews(response.data.items);
        }
      } catch (error) {
        console.error("Ошибка загрузки новостей:", error);
      } finally {
        loadingNews.value = false;
      }
    };

    const autoSendNewCryptoNews = (newItems) => {
      sentNewsIds.value = getStoredSentNewsIds(); // Загружаем уже отправленные новости
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Оставляем только дату

      let todayNews = newItems.filter((item) => {
        const newsDate = new Date(item.publishedAt);
        newsDate.setHours(0, 0, 0, 0);
        return newsDate.getTime() === today.getTime(); // Только новости за сегодня
      });

      // Сортируем по времени по ВОЗРАСТАНИЮ (сначала старые, потом новые)
      todayNews.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));

      todayNews.forEach((item) => {
        if (!sentNewsIds.value.has(item.id)) {
          messageQueue.value.push(item);
          sentNewsIds.value.add(item.id);
        }
      });

      if (messageQueue.value.length > 0) {
        updateStoredSentNewsIds(sentNewsIds.value); // Сохраняем в `localStorage`
      }

      if (!isSending.value) {
        sendNextMessage();
      }
    };

    const sendToTelegram = async (item) => {
      if (!activeChannelId.value) {
        console.error("Не выбран канал для отправки новостей!");
        return;
      }

      const message = `<b>🔊 ${item.title}</b>\n💬 ${item.content || ""}\n<a href="${item.url}">➡️ Читать</a>`;
      const data = {
        chat_id: activeChannelId.value,
        text: message,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [[{ text: "📖 Читать на сайте", url: item.url }]],
        },
      };

      try {
        await axios.post(`https://api.telegram.org/bot${botToken.value}/sendMessage`, data);
        console.log(`✅ Новость "${item.title}" отправлена в Telegram`);
      } catch (error) {
        console.error("❌ Ошибка отправки в Telegram:", error);
      }
    };

    const sendNextMessage = () => {
      if (messageQueue.value.length === 0) {
        isSending.value = false;
        return;
      }

      isSending.value = true;
      const item = messageQueue.value.shift();

      sendToTelegram(item).finally(() => {
        setTimeout(() => {
          isSending.value = false;
          sendNextMessage();
        }, 3000); // Задержка 3 секунды между сообщениями
      });
    };

    const formatDateTime = (dateString) => {
      if (!dateString) return "Неизвестно";
      const date = new Date(dateString);
      return date.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const startAutoFetch = () => {
      if (autoSendInterval.value) clearInterval(autoSendInterval.value);
      autoSendInterval.value = setInterval(fetchNews, 60000); // Проверка раз в минуту
    };

    const stopAutoFetch = () => {
      if (autoSendInterval.value) {
        clearInterval(autoSendInterval.value);
        autoSendInterval.value = null;
      }
    };

    watch(selectedCategory, (newCategory) => {
      fetchNews();
      if (newCategory === 16) {
        startAutoFetch();
      } else {
        stopAutoFetch();
      }
    });

    onMounted(() => {
      sentNewsIds.value = getStoredSentNewsIds(); // Загружаем данные при старте
      fetchNews();
      if (selectedCategory.value === 16) startAutoFetch();
    });

    return {
      news,
      loadingNews,
      selectedCategory,
      categories,
      fetchNews,
      sendToTelegram,
      formatDateTime,
    };
  },
};
</script>


<style scoped>
.container {
  max-width: 800px;
  margin: auto;
}
.card-body {
  overflow-x: hidden;
  overflow-y: auto;
  height: 350px;
}
.card-img-top {
  width: 100%;
  height: auto;
}
.btn {
  cursor: pointer;
}
</style> -->


<template>
  <div class="container">
    <!-- <CryptoPrice/> -->
    <select
      v-model="selectedCategory"
      @change="fetchNews"
      class="form-control w-100 mb-3"
    >
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>

    <div v-if="news.length > 0" class="news-list">
      <div class="row row-cols-1 row-cols-md-3 g-3 mt-3">
        <div v-for="item in news" :key="item.id" class="col">
          <div class="car">
            <img
              v-if="item.urlToImage"
              :src="item.urlToImage"
              class="card-img-top c"
            />
            <img v-else src="" class="card-img-top c" />

            <div class="card-body">
              <h5 class="card-title">
                <p
                  style="background-color: cornflowerblue; color: white"
                  class="p-1 fw-bold"
                >
                  {{ item.sourceName }}
                </p>
                <a class="fw-bold" :href="item.url" target="_blank">{{
                  item.title
                }}</a>
              </h5>
              <p class="card-text">
                <small class="text-muted">{{
                  formatDateTime(item.publishedAt)
                }}</small>
              </p>
              <div class="over">
              <p>{{ item.description }}</p>
              <p>{{ item.content }}</p>
            </div>
            </div>
            <button @click="sendToTelegram(item)" class="btn btn-danger1 mt-2">
              Отправить в Telegram <i class="bi bi-telegram"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loadingNews" class="text-center">
      <svg 
     
     xmlns="http://www.w3.org/2000/svg" 
     width="82" 
     height="82" 
     viewBox="0 0 24 24">
     <path 
     fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)"><animateTransform id="svgSpinnersPulseRingsMultiple0" attributeName="transform" begin="0;svgSpinnersPulseRingsMultiple2.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/><animateTransform additive="sum" attributeName="transform" begin="0;svgSpinnersPulseRingsMultiple2.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/><animate attributeName="opacity" begin="0;svgSpinnersPulseRingsMultiple2.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></path><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)"><animateTransform id="svgSpinnersPulseRingsMultiple1" attributeName="transform" begin="svgSpinnersPulseRingsMultiple0.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/><animateTransform additive="sum" attributeName="transform" begin="svgSpinnersPulseRingsMultiple0.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/><animate attributeName="opacity" begin="svgSpinnersPulseRingsMultiple0.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></path><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)"><animateTransform id="svgSpinnersPulseRingsMultiple2" attributeName="transform" begin="svgSpinnersPulseRingsMultiple0.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/><animateTransform additive="sum" attributeName="transform" begin="svgSpinnersPulseRingsMultiple0.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/><animate attributeName="opacity" begin="svgSpinnersPulseRingsMultiple0.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></path></svg>
  
    </div>
   
  </div>
</template>

<script>
import axios from "axios";
import { useChannelStore } from "@/stores/channelStore";
import { ref, computed, onMounted } from "vue";
import CryptoPrice from '../../components/CryptoPrice.vue'
export default {
  components:{CryptoPrice},
  setup() {
    const channelStore = useChannelStore();
    const news = ref([]);
    const loadingNews = ref(false);
    const selectedCategory = ref(16); // По умолчанию Криптовалюта

    const categories = ref([
      { id: 16, name: "Криптовалюта" },
      { id: 19, name: "IT" },
      { id: 8, name: "Технологии" },
      { id: 13, name: "Новости из Украины на русском" },
    ]);

    const activeChannelId = computed(() => channelStore.activeChannelId);
    const botToken = computed(() => channelStore.botToken);

    const fetchNews = async () => {
      try {
        loadingNews.value = true;
        const response = await axios.get(`
          https://4v-news-api.azurewebsites.net/News?SiteId=1&LanguageCode=ru&CategoryId=${selectedCategory.value}&Page=1&PageSize=100
       ` );
        news.value = response.data.items;
      } catch (error) {
        console.error("Ошибка загрузки новостей:", error);
      } finally {
        loadingNews.value = false;
      }
    };


// const sendToTelegram = async (item) => {
//   if (!activeChannelId.value) {
//     alert("Выберите канал для отправки новостей!");
//     return;
//   }

//   const messageText = `<b>🔊🔊🔊 ${item.title}</b>\n\n${item.content || ""}\n\n ➡️➡️➡️<a href="${item.url}"><b>Читать на сайте</b></a>`;

//   try {
//     // 1️⃣ Отправляем основное сообщение (чтобы можно было комментировать)
//     await axios.post(`https://api.telegram.org/bot${botToken.value}/sendMessage`, {
//       chat_id: activeChannelId.value,
//       text: messageText,
//       parse_mode: "HTML"
//     });

//     // 2️⃣ Отправляем сообщение ТОЛЬКО С КНОПКОЙ (невидимый текст)
//     // await axios.post(`https://api.telegram.org/bot${botToken.value}/sendMessage`, {
//     //   chat_id: activeChannelId.value,
//     //   text: "", // Zero Width Space (невидимый символ)
//     //   parse_mode: "HTML",
//     //   reply_markup: {
//     //     inline_keyboard: [
//     //       [{ text: "📖 Читать на сайте", url: item.url }]
//     //     ]
//     //   }
//     // });

//     alert("Новость успешно отправлена в Telegram!");
//   } catch (error) {
//     console.error("Ошибка отправки в Telegram:", error);
//     alert(`Ошибка: ${error.response?.data?.description || error.message}`);
//   }
// };
const sendToTelegram = async (item) => {
  if (!activeChannelId.value) {
    alert("Выберите канал для отправки новостей!");
    return;
  }

  const messageText = `<b>🔊🔊🔊 ${item.title}</b>\n\n${item.content || ""}\n\n ➡️➡️➡️<a href="${item.url}"><b>Читать на сайте</b></a>`;

  try {
    await $fetch('/api/telegram', {
      method: 'POST',
      body: {
        chatId: activeChannelId.value,
        botToken: botToken.value,
        text: messageText
      }
    })
    
    alert("Новость успешно отправлена в Telegram!");
  } catch (error) {
    console.error("Ошибка отправки в Telegram:", error);
    alert(`Ошибка: ${error.data?.message || error.message}`);
  }
};



    const formatDateTime = (dateString) => {
      if (!dateString) return "Неизвестно";
      const date = new Date(dateString);
      return date.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    onMounted(fetchNews);

    return {
      news,
      loadingNews,
      selectedCategory,
      categories,
      fetchNews,
      sendToTelegram,
      formatDateTime,
    };
  },
};
</script>
<style scoped>
.over{
  overflow-x: hidden;
  overflow-y: auto;
  height: 200px;
}
</style> 
