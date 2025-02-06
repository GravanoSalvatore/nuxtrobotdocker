<template>
    <div class="container">
      <h2 class="title">Короткие видео</h2>
      
      <div v-if="loading" class="text-center">
        <p>Загрузка видео...</p>
      </div>
      
      <div v-else class="video-list">
        <div v-for="video in videos" :key="video.id" class="video-item">
          <video :src="video.url" controls class="video-player"></video>
          <div class="video-info">
            <p class="video-title">{{ video.title }}</p>
            <button @click="sendToTelegram(video)" class="btn-send">
              Отправить в Telegram
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  
  const videos = ref([]);
  const loading = ref(true);
  const botToken = '6903896787:AAG-rPGukp422cw17k4y17UsJUiDMl5tdbc';
  const chatId = '-1002272715205';
  
  const fetchVideos = async () => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 10,
          q: 'funny short videos',
          type: 'video',
          key: 'AIzaSyAVE64D8-wk6vn-2zn_bC8HshjDAG4IBv4'
        }
      });
      videos.value = response.data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`
      }));
    } catch (error) {
      console.error('Ошибка загрузки видео:', error);
    } finally {
      loading.value = false;
    }
  };
  
  const sendToTelegram = async (video) => {
    try {
      const data = {
        chat_id: chatId,
        text: `<b>${video.title}</b>\n<a href='${video.url}'>Смотреть видео</a>`,
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
  </style>
  