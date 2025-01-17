<template>
  <div class="container">
    <!-- Индикатор загрузки -->
    <div v-if="loading" class="text-center">
      <svg 
      
      xmlns="http://www.w3.org/2000/svg" 
      width="52" 
      height="52" 
      viewBox="0 0 24 24">
      <path 
      fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)"><animateTransform id="svgSpinnersPulseRingsMultiple0" attributeName="transform" begin="0;svgSpinnersPulseRingsMultiple2.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/><animateTransform additive="sum" attributeName="transform" begin="0;svgSpinnersPulseRingsMultiple2.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/><animate attributeName="opacity" begin="0;svgSpinnersPulseRingsMultiple2.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></path><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)"><animateTransform id="svgSpinnersPulseRingsMultiple1" attributeName="transform" begin="svgSpinnersPulseRingsMultiple0.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/><animateTransform additive="sum" attributeName="transform" begin="svgSpinnersPulseRingsMultiple0.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/><animate attributeName="opacity" begin="svgSpinnersPulseRingsMultiple0.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></path><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)"><animateTransform id="svgSpinnersPulseRingsMultiple2" attributeName="transform" begin="svgSpinnersPulseRingsMultiple0.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/><animateTransform additive="sum" attributeName="transform" begin="svgSpinnersPulseRingsMultiple0.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/><animate attributeName="opacity" begin="svgSpinnersPulseRingsMultiple0.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></path></svg>
    </div>

    <!-- Список тегов -->
    <div v-else class="tags-list">
      <div class="tags-lis" v-if="tags.length > 0">
        <!-- <div style="color: cornflowerblue" class="text-center">
          Total: {{ tags.length }}
        </div> -->

        <div class="scrollable-tags-list rounded px-1" ref="tagsList">
          <button
            v-for="tag in filteredSortedTags"
            :key="tag.id"
            class="btn-danger2"
            @click="fetchNews(tag.name)"
          >
            <span>
              {{ tag.name }}
              <span class="rounded" style="padding: px">
                {{ tag.popularity }}
              </span>
            </span>
          </button>
        </div>
      </div>
     
    </div>

    <div v-if="news.length > 0" class="news-list">
      
      <div style="position: relative">
        <h5 class="fw-bold mt-1">{{ currentTag }}: {{ news.length }}</h5>
        <!-- Сохранённые теги -->
        <div class="saved-tags">
          <span
            v-for="tag in savedTags"
            :key="tag"
            class="badge bg-success saved-tag"
            @click="fetchNews(tag)"
          >
            {{ tag }}
            <i
              @click.stop="removeSavedTag(tag)"
              class="bi bi-x-circle pointer text-white"
            ></i>
          </span>
        </div>

        <!-- Кнопка сохранения текущего тега -->
        <button
          class="btn-danger1 me-2"
          :class="{ 'btn-danger': isTagSaved }"
          @click="toggleSaveTag(currentTag)"
        >
          {{ isTagSaved ? "Delete" : "Save" }}
        </button>

        <!-- Другие кнопки -->
        <button
      @click="toggleAutopilot"
      :class="[
        'btn-danger1 fw-bold me-2',
        { 'btn-primary': autopilotActive },
      ]"
    >
      {{ autopilotActive ? "Stop Autopilot" : "Start Autopilot" }}
    </button>
        <!-- <button
          type="button"
          class="btn-danger1"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Setting
        </button> -->
        <!-- Индикатор загрузки новостей -->
        <div v-if="loadingNews" class="text-center">
          <svg 
      
      xmlns="http://www.w3.org/2000/svg" 
      width="52" 
      height="52" 
      viewBox="0 0 24 24">
      <path 
      fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)"><animateTransform id="svgSpinnersPulseRingsMultiple0" attributeName="transform" begin="0;svgSpinnersPulseRingsMultiple2.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/><animateTransform additive="sum" attributeName="transform" begin="0;svgSpinnersPulseRingsMultiple2.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/><animate attributeName="opacity" begin="0;svgSpinnersPulseRingsMultiple2.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></path><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)"><animateTransform id="svgSpinnersPulseRingsMultiple1" attributeName="transform" begin="svgSpinnersPulseRingsMultiple0.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/><animateTransform additive="sum" attributeName="transform" begin="svgSpinnersPulseRingsMultiple0.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/><animate attributeName="opacity" begin="svgSpinnersPulseRingsMultiple0.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></path><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)"><animateTransform id="svgSpinnersPulseRingsMultiple2" attributeName="transform" begin="svgSpinnersPulseRingsMultiple0.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/><animateTransform additive="sum" attributeName="transform" begin="svgSpinnersPulseRingsMultiple0.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/><animate attributeName="opacity" begin="svgSpinnersPulseRingsMultiple0.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></path></svg>
        </div>
        <!-- Модальное окно -->
        <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <setting />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn-danger1"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <i
          style="position: absolute; right: 0; top: 0"
          @click="clearNews"
          class="bi bi-x-circle pointer"
        ></i>
      </div>

      
      <div class="row row-cols-1 row-cols-md-3 g-3 mt-3">
        <div v-for="item in news" :key="item.id" class="col">
          <div class="car">
            <img
              v-if="item.tempImageUrl || item.urlToImage"
              :src="item.tempImageUrl || item.urlToImage"
              class="card-img-top c"
            />
            <img v-else :src="image" class="card-img-top c" />

            <div class="card-body">
              <div class="overlay">
                <h5 class="card-title">
                  <a style="font-size: 12px" :href="item.url" target="_blank">{{
                    item.sourceName
                  }}</a>
                </h5>
                <p class="card-text">
                  <small class="text-muted">{{
                    formatDateTime(item.publishedAt)
                  }}</small>
                </p>
                <p
                  v-if="item.author"
                  class="badge bg-primary"
                  :style="{
                    'max-width': '200px',
                    'white-space': 'nowrap',
                    overflow: 'hidden',
                    'text-overflow': 'ellipsis',
                  }"
                >
                  {{ item.author }}
                </p>
                <p v-else class="badge bg-secondary">Unknown</p>
                <div class="">
                  <p style="color: cornflowerblue" class="fw-bold">
                    {{ item.title }}
                  </p>
                  <p>{{ item.description }}</p>
                  <p v-html="item.content"></p>
                </div>
              </div>
              <button @click="openEditModal(item)" class="btn-danger1 mt-2">
                Editing and sending
              </button>
              <!-- <button @click="sendToTelegram(item)" class="btn-danger1 mt-2">
                Telegram
                <i style="color: cornflowerblue" class="bi bi-telegram"></i>
              </button> -->
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="editModal"
        tabindex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <div>
                <!-- Кнопка для открытия компонента -->
                <button @click="toggleSetting" class="btn">
                  <i class="bi bi-sliders"></i>
                </button>
                <i
          style="position: absolute; right: 5px; top: 3px"
          
          class="bi bi-x-circle pointer" data-bs-dismiss="modal"
        ></i>
                <!-- Анимированный блок с настройками -->
                <transition name="fade">
                  <div v-if="showSetting" class="setting-container">
                    <setting />
                    <!-- Кнопка для закрытия -->
                    <!-- <button @click="toggleSetting" class="btn btn-danger mt-3">Close</button> -->
                  </div>
                </transition>
              </div>
              <div class="mb-3">
                <div class="text-center mt-3">
                  <img
                    :src="editableItem.tempImageUrl || editableItem.urlToImage"
                    class="img-fluid"
                    alt="Preview"
                  />
                </div>
               
                <label for="editTitle" class="form-label">Title</label>
                <textarea
                  id="editTitle"
                  type="text"
                  v-model="editableItem.title"
                  class="form-control"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="editDescription" class="form-label"
                  >Description</label
                >
                <textarea
                  id="editDescription"
                  v-model="editableItem.description"
                  class="form-control"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="editContent" class="form-label">Content</label>
                <textarea
  id="editContent"
  v-model="editableItem.content"
  class="form-control"
></textarea>
<!-- <p v-html="editableItem.content || 'Контент отсутствует'"></p> -->

              </div>
            </div>

            <div class="modal-footer">
             
              <button type="button" class="btn-danger1" @click="saveChanges">
                Save changes
              </button>
              <button
                @click="sendToTelegram(editableItem)"
                class="btn-danger1 "
              >
                Send to Telegram
                <i style="color: cornflowerblue" class="bi bi-telegram"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useTopPopularStore } from "../../stores/popular";
import { computed, onMounted, ref } from "vue";
import { useChannelStore } from "@/stores/channelStore";
import Setting from "@/components/Setting.vue";
export default {
  components: { Setting },
  setup() {
    const store = useTopPopularStore(); // Использование store
    const channelStore = useChannelStore(); // Store для работы с каналами
   
    const currentTagId = ref(10); // Жестко заданный ID тега

// Получение токена из куков
const autopilotActive = ref(false);
    const loadingAutopilot = ref(false);

    // Функция для получения токена из куков
    const getAuthTokenFromCookies = () => {
      console.log("[TOKEN] Читаем куки...");
      const cookieName = ".AspNetCore.Identity.Application=";
      const cookies = document.cookie.split("; ");

      for (const cookie of cookies) {
        if (cookie.startsWith(cookieName)) {
          const token = cookie.substring(cookieName.length);
          console.log("[TOKEN] Найден токен:", token);
          return token;
        }
      }
      console.warn("[TOKEN] Токен не найден!");
      return null;
    };

    // Функция для запуска автопостинга
    const toggleAutopilot = async () => {
  console.log("[AUTOPOSTING] Клик по кнопке, проверяем данные...");

  if (!channelStore.activeChannelId) {
    alert("Выберите канал для автопостинга!");
    return;
  }

  const apiUrl = `https://4v-news-api.azurewebsites.net/AutoPosting?TelegramChatId=${channelStore.activeChannelId}`;

  loadingAutopilot.value = true;
  console.log("[AUTOPOSTING] Отправка запроса:", apiUrl);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      credentials: "include", // 🔥 Гарантируем, что куки передадутся
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("[AUTOPOSTING] Ответ сервера:", response);

    if (!response.ok) {
      console.error(`[AUTOPOSTING] Ошибка: статус ${response.status}`);
      alert(`Ошибка автопостинга: ${response.status}`);
      return;
    }

    const data = await response.json();
    console.log("[AUTOPOSTING] Данные ответа:", data);

    if (data.isSuccess) {
      autopilotActive.value = !autopilotActive.value;
      alert("Автопостинг успешно активирован!");
    } else {
      console.error("[AUTOPOSTING] Ошибка активации:", data.errors);
      alert("Ошибка автопостинга: " + JSON.stringify(data.errors));
    }
  } catch (error) {
    console.error("[AUTOPOSTING] Ошибка сети:", error);
    alert("Ошибка сети: " + error.message);
  } finally {
    loadingAutopilot.value = false;
  }
};



   
   
   
   
   
   
    const editableItem = ref({
  title: "",
  description: "",
  content: "",
  tempImageUrl: "",
  urlToImage: "",
  id: null,
});
    


    const openEditModal = (item) => {
      editableItem.value = { ...item };
      const modal = new bootstrap.Modal(document.getElementById("editModal"));
      modal.show();
    };

    const saveChanges = () => {
      const index = store.news.findIndex(
        (news) => news.id === editableItem.value.id
      );
      if (index !== -1) {
        // Проверяем, есть ли новое изображение
        if (editableItem.value.tempImageUrl !== editableItem.value.urlToImage) {
          // Сохраняем новое изображение
          store.news[index].urlToImage = editableItem.value.tempImageUrl;
        }
        // Сохраняем остальные изменения
        store.news[index] = { ...editableItem.value };
      }
    };

    const showSetting = ref(false);

    const toggleSetting = () => {
      showSetting.value = !showSetting.value;
    };

    // Локальные переменные и данные
    const tagsList = ref(null); // Список тегов
    const localNews = ref([]); // Локальная копия новостей для редактирования

    // Геттеры для computed свойств
    const savedTags = computed(() => store.savedTags);
    const tags = computed(() => store.tags);
    const sortedTags = computed(() => store.sortedTags);
    const currentTag = computed(() => store.currentTag);
    const isTagSaved = computed(() => store.isTagSaved);

    const activeChannelId = computed(() => channelStore.activeChannelId);
    const news = computed(() => store.news);
    const loadingTags = computed(() => store.loadingTags);
    const loadingNews = computed(() => store.loadingNews);
    const loading = computed(() => store.loading);
    // Методы
    const fetchTags = () => store.fetchTags();

    const fetchNews = async (tagName) => {
      await store.fetchNews(tagName);
      localNews.value = store.news.map((item) => ({ ...item })); // Локальная копия новостей
    };

    const clearNews = () => {
      store.clearNews();
      localNews.value = [];
    };

    const toggleSaveTag = (tag) => {
      store.toggleSaveTag(tag);
    };
    const filteredSortedTags = computed(() => {
      const result = sortedTags.value.filter(
        (tag) => tag.name && tag.name.trim() !== "" && tag.name !== "0"
      );
      console.log("Фильтрованные теги:", result);
      return result;
    });

    const removeSavedTag = (tag) => {
      store.savedTags = store.savedTags.filter((savedTag) => savedTag !== tag); // Удаляем тег
      localStorage.setItem("savedTags", JSON.stringify(store.savedTags)); // Сохраняем изменения в localStorage
      console.log("Тег удалён:", tag);
    };
    const sendToTelegram = (item) => {
  if (!activeChannelId.value) {
    alert("Выберите канал для отправки новостей!");
    return;
  }

  // Проверяем, есть ли description и content
  const description = item.description ? item.description : "";
  const content = item.content ? item.content : "";

  // Формируем сообщение
  const message = `<b>${item.title}</b>\n${description}\n${content}\n<a href="${item.url}">Читать полностью</a>`;

  const data = {
    chat_id: activeChannelId.value,
    text: message,
    parse_mode: "HTML",
  };

  axios
    .post(`https://api.telegram.org/bot${store.botToken}/sendMessage`, data)
    .then((response) => {
      console.log("Сообщение успешно отправлено в Telegram:", response.data);
      alert("Сообщение отправлено!");
    })
    .catch((error) => {
      console.error("Ошибка отправки сообщения:", error);
      alert(`Ошибка отправки: ${error.message}`);
    });
};
    
    
    onMounted(() => {
      store.loadSavedTags(); // Загружаем сохранённые теги
      fetchTags(); // Загружаем теги
    });

    return {
      toggleAutopilot,
      autopilotActive,
      loadingAutopilot,
      filteredSortedTags,
      openEditModal,
      saveChanges,
      editableItem,
      showSetting,
      toggleSetting,
      // Данные и методы для использования в шаблоне
      savedTags,
      tags,
      news,
      loadingTags,
      loadingNews,
      loading,
      sortedTags,
      currentTag,
      isTagSaved,
      localNews,
      activeChannelId,
      fetchTags,

      fetchNews,
      clearNews,
      toggleSaveTag,
      removeSavedTag,
      sendToTelegram,
    };
  },
  methods: {
    formatDateTime(dateTime) {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      return new Date(dateTime).toLocaleString("en-US", options);
    },
  },
};
</script>

<style scoped>
.overlay {
  overflow-x: hidden;
  overflow-y: auto;
  height: 250px;
}

.saved-tags {
  display: flex;
  gap: 2px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.saved-tag {
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 10px;
}

.saved-tag .bi-x-circle {
  color: red;
}
.saved-tag:hover {
  background-color: #dc3545;
  color: white;
}
.tags-lis {
  /* box-shadow: 0px 8px 16px rgba(19, 93, 147, 0.3); */
  border-radius: 20px;
}
.form-control {
  width: 100%;
  margin-bottom: 10px;
}
a {
  text-decoration: none;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading {
  text-align: center;
  margin-top: 20px;
}

.tags-list {
  margin-top: px;
}

.scrollable-tags-list {
  max-height: 310px;
  overflow-y: auto;
  /* padding: 10px; */
}

.tag-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

.tag-item:hover {
  background-color: #f0f0f0;
  color: rgb(3, 145, 246);
}

.no-tags {
  text-align: center;
  margin-top: 20px;
}

.news-list {
  /* margin-top: 20px; */
}

.card-body {
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
}
.overlay {
  overflow-x: hidden;
  overflow-y: auto;
  height: 250px;
}
.card-img-top {
  width: 100%;
  height: auto;
}

.btn {
  cursor: pointer;
}

.v-progress-circular {
  margin: 1rem;
}

.span {
  border-radius: 5px;
  margin: 5px;
  padding: 1px 12px 3px;
  box-shadow: 1px 0px 4px 1px rgb(138, 163, 182);
}

.span:hover {
  background-color: #092541;
  color: white;
}

.pointer {
  cursor: pointer;
}

.saved-tags {
  margin: 5px 0;
}
.saved-tag {
  /* margin: 5px 0; */
  font-weight: bold;
}
.save-tag-btn {
  margin-left: 10px;
  padding: 5px 10px;
  cursor: pointer;
  color: #fff;
  /* background-color: #007bff; */
  /* border: none;
    border-radius: 5px; */
}
.save-tag-btn.active {
  background-color: #f93402;
}
.save-tag-btn:hover {
  background-color: #0056b3;
}
</style>
