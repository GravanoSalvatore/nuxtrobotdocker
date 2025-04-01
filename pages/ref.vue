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
<!-- <template>
  <div>
 
    <button class="btn-danger2" @click="fetchNews">fetchNews</button>
    

    <div v-if="news.length > 0">
      <div v-for="item in news" :key="item.id">
        <div class="card">
          <h2>{{ item.title }}</h2>
          <p>{{ item.content }}</p>
          <img v-if="item.urlToImage" :src="item.urlToImage" alt="News Image">


          <button class="btn-danger2" @click="sendTelegram(item)">sendTelegram</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const news = ref([]);
    const activeChannelId = ref('-1002273327727'); // ID Телеграм-канала
    const botToken = ref('7278946722:AAFImxEmuP9zuitDYktDJMJkIu99ut1y--k'); // Токен бота

    // Метод для загрузки новостей
    const fetchNews = async () => {
      try {
        const url = 'https://4v-news-api.azurewebsites.net/News';
        const language = 'ru';
        const category = 16;
        const pageSize = 10;

        const response = await axios.get(`${url}?SiteId=1&LanguageCode=${language}&CategoryId=${category}&Page=1&PageSize=${pageSize}`);
        
        if (response.data && response.data.items) {
          news.value = response.data.items;
        } else {
          console.error("Ошибка: API не вернул данные");
        }
        
        console.log(news.value);
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
      }
    };

    // Метод для отправки новости в Telegram
    const sendTelegram = async (item) => {
      if (!activeChannelId.value) {
        alert("Выберите канал для отправки новостей!");
        return;
      }

      const message = `<b>🔊🔊🔊${item.title}</b>\n${item.content || ""}\n<a href="${item.url}">➡️➡️➡️<b>Читать полностью</b></a>`;
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

    return {
      news,
      fetchNews,
      sendTelegram
    };
  }
};
</script>

<style>
</style> -->

<!-- <template>
  <div>
   
    <button class="btn-danger2" @click="fetchNews">fetchNews</button>
    
   
    <div v-if="news.length > 0">
      <div v-for="item in news" :key="item.id">
        <div class="card">
          <h2>{{ item.title }}</h2>
          <p>{{ item.content }}</p>
          <img v-if="item.urlToImage" :src="item.urlToImage" alt="News Image">

         
          <button class="btn-danger2" @click="sendTelegram(item)">sendTelegram</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useChannelStore } from "@/stores/channelStore";
export default {
  setup() {
    const channelStore = useChannelStore();
    const news = ref([]);
    const activeChannelId = computed(() => channelStore.activeChannelId);
    const botToken = computed(() => channelStore.botToken);

    // Метод для загрузки новостей
    const fetchNews = async () => {
      try {
        const url = 'https://4v-news-api.azurewebsites.net/News';
        const language = 'ru';
        const category = 16;
        const pageSize = 10;

        const response = await axios.get(`${url}?SiteId=1&LanguageCode=${language}&CategoryId=${category}&Page=1&PageSize=${pageSize}`);
        
        if (response.data && response.data.items) {
          news.value = response.data.items;
        } else {
          console.error("Ошибка: API не вернул данные");
        }
        
        console.log(news.value);
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
      }
    };

    // Метод для отправки новости в Telegram с reply_markup
    const sendTelegram = async (item) => {
      if (!activeChannelId.value) {
        alert("Выберите канал для отправки новостей!");
        return;
      }

      const message = `<b>🔊🔊🔊${item.title}</b>\n🔊🔊🔊${item.content || ""}\n<a href="${item.url}">➡️➡️➡️</a>`;

      const data = {
        chat_id: activeChannelId.value,
        text: message,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [[
            { text: "📖 Читать полностью", url: item.url }
          ]]
        }
      };

      try {
        await axios.post(`https://api.telegram.org/bot${botToken.value}/sendMessage`, data);
        alert("Новость успешно отправлена в Telegram!");
      } catch (error) {
        console.error("Ошибка отправки в Telegram:", error);
        alert(`Ошибка: ${error.message}`);
      }
    };
//     const sendTelegram = async (item) => {
//   if (!activeChannelId.value) {
//     alert("Выберите канал для отправки новостей!");
//     return;
//   }

//   // Функция экранирования спецсимволов для MarkdownV2
//   const escapeMarkdownV2 = (text) => {
//     return text
//       .replace(/_/g, "\\_")
//       .replace(/\*/g, "\\*")
//       .replace(/\[/g, "\\[")
//       .replace(/\]/g, "\\]")
//       .replace(/\(/g, "\\(")
//       .replace(/\)/g, "\\)")
//       .replace(/~/g, "\\~")
//       .replace(/`/g, "\\`")
//       .replace(/>/g, "\\>")
//       .replace(/#/g, "\\#")
//       .replace(/\+/g, "\\+")
//       .replace(/-/g, "\\-")
//       .replace(/=/g, "\\=")
//       .replace(/\|/g, "\\|")
//       .replace(/\{/g, "\\{")
//       .replace(/\}/g, "\\}")
//       .replace(/\./g, "\\.")
//       .replace(/!/g, "\\!");
//   };

//   // Заголовок и скрытый текст (спойлер)
//   const title = escapeMarkdownV2(item.title);
//   const hiddenContent = `||${escapeMarkdownV2(item.content || "")}||`;
  
//   const message = `🔊🔊🔊 *${title}*\n\n${hiddenContent}\n[➡️➡️➡️ Читать полностью](${item.url})`;

//   const data = {
//     chat_id: activeChannelId.value,
//     text: message,
//     parse_mode: "MarkdownV2",
//     reply_markup: {
//       inline_keyboard: [[
//         { text: "📖 Читать полностью", url: item.url }
//       ]]
//     }
//   };

//   try {
//     await axios.post(`https://api.telegram.org/bot${botToken.value}/sendMessage`, data);
//     alert("Новость успешно отправлена в Telegram!");
//   } catch (error) {
//     console.error("Ошибка отправки в Telegram:", error);
//     alert(`Ошибка: ${error.message}`);
//   }
// };




    return {
      news,
      fetchNews,
      sendTelegram
    };
  }
};
</script>

<style>
</style> -->


 <!-- <template >
  <div class="row">
    <div class="col-md-4 card" v-for="item in news" :key="item.id">
      
      <img class  :src="item.urlToImage">
   <div class="over"> 
    <h4 class="fw-bold">  
      {{item.title}}</h4>
      {{item.content}}
    </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { ref, onMounted} from 'vue';
export default {
  setup(){
      const news = ref([]);
      const fetchNews = async () => {
      const category = 16;
      const page = 1;
      const pageSize = 10;
      const siteId = 1;
      const baseUrl = "https://4v-news-api.azurewebsites.net/News";
      const url = `${baseUrl}?SiteId=${siteId}&CategoryId=${category}&Page=${page}&PageSize=${pageSize}`
     
     
      try {
      const response = await axios.get(url)
      news.value = response.data.items
      console.log(news.value)  
      } catch (error) {
         console.log(error)
      }
    }
   onMounted(() =>{
     fetchNews()
    })
   return{
    news
   }
  }
}
</script>
<style scoped >
  .over{
    overflow-x: hidden;
    overflow-y: auto;
    height: 200px;
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
