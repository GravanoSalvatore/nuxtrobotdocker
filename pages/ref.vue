<!-- <template>
  <div class="container">
   
    
    <input v-model="searchQuery" @input="fetchVideos" placeholder="Поиск видео..." class="search-input" />
    
    <div v-if="loading" class="text-center">
      <p>Загрузка видео...</p>
    </div>
    
    <div v-else>
      <div class="video-list">
        <div v-for="video in paginatedVideos" :key="video.id" class="video-item">
          <video :src="video.url" controls class="video-player"></video>
          <div class="video-info">
            <p class="video-title">{{ video.title }}</p>
            <button @click="sendToTelegram(video)" class="btn-danger1">
              Send to Telegram
            </button>
          </div>
        </div>
      </div>
      
      
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Назад</button>
        <span>Страница {{ currentPage }} из {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Вперед</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';

const videos = ref([]);
const loading = ref(true);
const searchQuery = ref('funny');
const botToken = '6903896787:AAG-rPGukp422cw17k4y17UsJUiDMl5tdbc';
const chatId = '-1002272715205';
const currentPage = ref(1);
const videosPerPage = 10;

const fetchVideos = async () => {
  if (!searchQuery.value.trim()) return;
  loading.value = true;
  try {
    const response = await axios.get('https://pixabay.com/api/videos/', {
      params: {
        key: '38493945-5c7d35b7bac4a53d9ead4ac6f',
        q: searchQuery.value,
        per_page: 100
      }
    });

    videos.value = response.data.hits.map(video => ({
      id: video.id,
      title: video.tags,
      url: video.videos.medium.url
    }));
    currentPage.value = 1; // Сбрасываем страницу при новом поиске
  } catch (error) {
    console.error('Ошибка загрузки видео:', error);
  } finally {
    loading.value = false;
  }
};

const paginatedVideos = computed(() => {
  const start = (currentPage.value - 1) * videosPerPage;
  return videos.value.slice(start, start + videosPerPage);
});

const totalPages = computed(() => Math.ceil(videos.value.length / videosPerPage));

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const sendToTelegram = async (video) => {
  try {
    const data = {
      chat_id: chatId,
      text: `<a href='${video.url}'>Смотреть видео</a>`,
      parse_mode: 'HTML'
    };
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, data);
    alert('Видео отправлено в Telegram!');
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error);
    alert('Ошибка отправки видео!');
  }
};

onMounted(fetchVideos);
</script>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
}
.search-input {
  color: var(--bs-body-color);
  background-color: var(--bs-body-bg);
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}
.video-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
.video-item {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.video-player {
  width: 100%;
  border-radius: 10px;
}
.video-title {
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
}
.btn-send {
  margin-top: 5px;
  padding: 8px 12px;
  background-color: #0088cc;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
.btn-send:hover {
  background-color: #006699;
}
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.pagination button {
  padding: 5px 10px;
  border: none;
  background-color: #0088cc;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}
.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style> -->
<template lang="">
  <div>
    
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="">
  
</style>