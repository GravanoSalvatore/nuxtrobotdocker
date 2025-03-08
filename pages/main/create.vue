<template>
  <div class="container">
    <!-- Кнопка "КриптоНовости" -->
    <button class="btn btn-danger2 mb-3" @click="fetchCryptoNews">
      Крипто Новости
    </button>

    <div v-if="news.length > 0" class="news-list">
      <div class="row row-cols-1 row-cols-md-3 g-3 mt-3">
        <div v-for="item in news" :key="item.id" class="col">
          <div class="car">
            <img v-if="item.urlToImage" :src="item.urlToImage" class="card-img-top c" />
            <img v-else src="" class="card-img-top c" />

            <div class="card-body">
              <h5 class="card-title">
               
                <p style="background-color: cornflowerblue;color:white" class="p-1 fw-bold  ">{{ item.sourceName }}</p>
                <a class="fw-bold" :href="item.url" target="_blank">{{ item.title }}</a>
              </h5>
              <p class="card-text">
                <small class="text-muted">{{ formatDateTime(item.publishedAt) }}</small>
              </p>
              <p>{{ item.description }}</p>
              <p>{{ item.content }}</p>
              <!-- Кнопка отправки новости в Telegram -->

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
import { ref, computed } from "vue";

export default {
  setup() {
    const channelStore = useChannelStore();
    const news = ref([]);
    const loadingNews = ref(false);

    // Активный Telegram канал
    const activeChannelId = computed(() => channelStore.activeChannelId);
    const botToken = computed(() => channelStore.botToken);

    // Метод для загрузки крипто-новостей
    const fetchCryptoNews = async () => {
      try {
        loadingNews.value = true;
        const response = await axios.get(
          "https://4v-news-api.azurewebsites.net/News?SiteId=1&LanguageCode=ru&CategoryId=16&Page=1&PageSize=50"
        );
        news.value = response.data.items;
      } catch (error) {
        console.error("Ошибка загрузки крипто-новостей:", error);
      } finally {
        loadingNews.value = false;
      }
    };

    // Метод для отправки новости в Telegram
    const sendToTelegram = async (item) => {
      if (!activeChannelId.value) {
        alert("Выберите канал для отправки новостей!");
        return;
      }

      const message = `<b>🔊🔊🔊${item.title}</b>\n${item.content || ""}\<a href="${item.url}">➡️➡️➡️<b>Читать полностью</b></a>`;

      const data = {
        chat_id: activeChannelId.value,
        text: message,
        parse_mode: "HTML",
      };

      try {
        await axios.post(`https://api.telegram.org/bot${botToken.value}/sendMessage`, data);
        alert("Новость успешно отправлена в Telegram!");
      } catch (error) {
        console.error("Ошибка отправки в Telegram:", error);
        alert(`Ошибка: ${error.message}`);
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
    return {
      formatDateTime,
      news,
      loadingNews,
      fetchCryptoNews,
      sendToTelegram,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
}
.card-body{
  overflow-x: hidden;
  overflow-y: auto;
  height: 350px;
  ;
}
.card-img-top {
  width: 100%;
  height: auto;
}

.btn {
  cursor: pointer;
}
</style>

