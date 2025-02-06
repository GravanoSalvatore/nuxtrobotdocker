<template>
  <div class="news-ticker">
    <!-- Кнопка настроек -->
    <!-- <button class="settings-btn" @click="showModal = true">⚙️</button> -->
    <svg class="settings-btn" @click="showModal = true" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5"/></svg>
    <span style="color:cornflowerblue" class="selected-category fw-bold">{{ newsOptions[selectedCategory]?.label || 'Выберите категорию' }}</span>
    <!-- Бегущая строка -->
    <div class="ticker-content" ref="ticker">
      <div v-for="(item, index) in news" :key="'news-' + index" class="ticker-item">
        <a :href="item.url" target="_blank">
          <img v-if="item.urlToImage" :src="item.urlToImage" class="news-logo" />
          <img v-else src="https://s3.coinmarketcap.com/static-gravity/image/d889592fdf2042a782200649ee970afb.jpg" class="news-logo" />
          
          <span class="news-title "> {{ item.title }}</span>
          <span class="news-source fw-bold"> — {{ item.sourceName }}</span>
          <span class="news-date"> [{{ formatDate(item.publishedAt) }}] </span>
        </a>
      </div>
      <!-- Дублируем для плавности -->
      <div v-for="(item, index) in news" :key="'news-duplicate-' + index" class="ticker-item">
        <a :href="item.url" target="_blank">
          <img v-if="item.urlToImage" :src="item.urlToImage" class="news-logo" />
          <img v-else src="https://s3.coinmarketcap.com/static-gravity/image/d889592fdf2042a782200649ee970afb.jpg" class="news-logo" />
          <span class="news-title "> {{ item.title }}</span>
          <span class="news-source fw-bold"> — {{ item.sourceName }}</span>
          <span class="news-date"> [{{ formatDate(item.publishedAt) }}] </span>
        </a>
      </div>
    </div>

    <!-- Модальное окно выбора категории -->
    <transition name="fade">
      <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
        <div class="modal-content">
          <!-- <h3>Выберите категорию новостей</h3> -->
          <ul>
            <li v-for="(option, key) in newsOptions" :key="key">
              <label>
                <input type="radio" :value="key" v-model="selectedCategory" @change="fetchNews" />
                {{ option.label }}
              </label>
            </li>
          </ul>
          <button @click="showModal = false" class="close-btn btn-danger3">Закрыть</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, watch  } from 'vue';
import axios from 'axios';

const news = ref([]);
const showModal = ref(false);
const selectedCategory = ref('ton');

const newsOptions = {
  bitcoin: {
    label: 'Bitcoin',
    url: 'https://4v-news-api.azurewebsites.net/News?SiteId=1&CategoryId=16&Page=1&PageSize=100'
  },
  science: {
    label: 'Science',
    url: 'https://4v-news-api.azurewebsites.net/News?SiteId=1&CategoryId=6&Page=1&PageSize=100'
  },
  technology: {
    label: 'Technology',
    url: 'https://4v-news-api.azurewebsites.net/News?SiteId=1&CategoryId=8&Page=1&PageSize=100'
  },

  ton: {
    label: 'TON ',
    url: 'https://data-api.ccdata.io/news/v1/article/list?lang=EN&limit=100&categories=TON'
  }
};

const fetchNews = async () => {
  try {
    const response = await axios.get(newsOptions[selectedCategory.value].url);
    if (selectedCategory.value === 'ton') {
      // Обрабатываем API TON
      news.value = response.data.Data.map(article => ({
        title: article.TITLE,
        url: article.URL,
        urlToImage: article.IMAGE_URL || '',
        sourceName: article.SOURCE_DATA?.NAME || 'Unknown',
        publishedAt: new Date(article.PUBLISHED_ON * 1000).toISOString()
      }));
    } else {
      // Обрабатываем API стандартных новостей
      news.value = response.data.items.map(article => ({
        title: article.title,
        url: article.url,
        urlToImage: article.urlToImage || '',
        sourceName: article.sourceName || 'Unknown',
        publishedAt: article.publishedAt
      }));
    }
  } catch (error) {
    console.error('Ошибка загрузки новостей:', error);
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).replace(',', '');
};
watch(selectedCategory, fetchNews);
onMounted(fetchNews);
</script>

<style scoped>
.selected-category{
  z-index:10000000;
  position: absolute;
  top: 35px;
  right: 25px;
  background: transparent;
  border: none;
  font-size: 12px;
  cursor: pointer;
  z-index: 10;
}
.news-title , .news-date{
  margin-left: 5px;
}
.news-ticker {
  width: 100%;
  overflow: hidden;
  background: var(--bs-body-bg);
  color: var(--bs-body-color);
  white-space: nowrap;
  position: relative;
  padding: 5px 0;
}

.ticker-content {
  display: flex;
  width: max-content;
  animation: ticker-scroll 1000s linear infinite;
}

.ticker-item {
  flex-shrink: 0;
  padding: 0 15px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
}

.ticker-item a {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
}

.news-logo {
  width: 60px;
  height: 40px;
  border-radius: 5px;
}

/* Кнопка настроек */
.settings-btn {
  z-index:10000000;
  position: absolute;
  top: 38px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
}

/* Модальное окно */
.modal-overlay {
  z-index:10000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
 
  background: var(--bs-body-bg);
  color: var(--bs-body-color);
  padding: 20px;
  border-radius: 8px;
  /* text-align: center; */
  width: 300px;
}

/* Кнопка закрытия */
.close-btn {
  margin-top: 10px;
  /* padding: 5px 10px;
  border: none;
  background: var(--bs-border-color); */
  cursor: pointer;
}

/* Плавное появление */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Бегущая строка */
@keyframes ticker-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>
