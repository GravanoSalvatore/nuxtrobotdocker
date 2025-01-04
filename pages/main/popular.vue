<template>
  <div class="container">
    <!-- Индикатор загрузки -->
    <div v-if="loading" class="text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <rect width="2.8" height="12" x="1" y="6" fill="currentColor">
          <animate
            id="svgSpinnersBarsScale0"
            attributeName="y"
            begin="0;svgSpinnersBarsScale1.end-0.1s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
            values="6;1;6"
          />
          <animate
            attributeName="height"
            begin="0;svgSpinnersBarsScale1.end-0.1s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
            values="12;22;12"
          />
        </rect>
        <rect width="2.8" height="12" x="5.8" y="6" fill="currentColor">
          <animate
            attributeName="y"
            begin="svgSpinnersBarsScale0.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
            values="6;1;6"
          />
          <animate
            attributeName="height"
            begin="svgSpinnersBarsScale0.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
            values="12;22;12"
          />
        </rect>
        <rect width="2.8" height="12" x="10.6" y="6" fill="currentColor">
          <animate
            attributeName="y"
            begin="svgSpinnersBarsScale0.begin+0.2s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
            values="6;1;6"
          />
          <animate
            attributeName="height"
            begin="svgSpinnersBarsScale0.begin+0.2s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
            values="12;22;12"
          />
        </rect>
        <rect width="2.8" height="12" x="15.4" y="6" fill="currentColor">
          <animate
            attributeName="y"
            begin="svgSpinnersBarsScale0.begin+0.3s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
            values="6;1;6"
          />
          <animate
            attributeName="height"
            begin="svgSpinnersBarsScale0.begin+0.3s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
            values="12;22;12"
          />
        </rect>
        <rect width="2.8" height="12" x="20.2" y="6" fill="currentColor">
          <animate
            id="svgSpinnersBarsScale1"
            attributeName="y"
            begin="svgSpinnersBarsScale0.begin+0.4s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
            values="6;1;6"
          />
          <animate
            attributeName="height"
            begin="svgSpinnersBarsScale0.begin+0.4s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
            values="12;22;12"
          />
        </rect>
      </svg>
    </div>

    <!-- Список тегов -->
    <div v-else class="tags-list">
      <div class="tags-lis" v-if="tags.length > 0">
        <!-- <div style="color: cornflowerblue" class="text-center">
          Total: {{ tags.length }}
        </div> -->

        <div  class="scrollable-tags-list rounded" ref="tagsList">
          <button
         
          v-for="tag in filteredSortedTags"
            :key="tag.id"
            class="btn-danger2"
            @click="fetchNews(tag.name)"
          >
          <span
        
          >
            {{ tag.name }}
            <span class="rounded" style="padding: 5px">
              {{ tag.popularity }}
            </span>
          </span>
          </button>
        </div>
      </div>
      <!-- <div v-else-if="loadingTags">
        <v-progress-circular
          indeterminate
          color="primary"
          size="50"
        ></v-progress-circular>
      </div> -->
    </div>

    <br />
    <!-- Индикатор загрузки новостей -->
    <div v-if="loadingNews" class="text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <rect width="2.8" height="12" x="1" y="6" fill="currentColor">
          <animate
            id="svgSpinnersBarsScale0"
            attributeName="y"
            begin="0;svgSpinnersBarsScale1.end-0.1s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
            values="6;1;6"
          />
          <animate
            attributeName="height"
            begin="0;svgSpinnersBarsScale1.end-0.1s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
            values="12;22;12"
          />
        </rect>
        <rect width="2.8" height="12" x="5.8" y="6" fill="currentColor">
          <animate
            attributeName="y"
            begin="svgSpinnersBarsScale0.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
            values="6;1;6"
          />
          <animate
            attributeName="height"
            begin="svgSpinnersBarsScale0.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
            values="12;22;12"
          />
        </rect>
        <rect width="2.8" height="12" x="10.6" y="6" fill="currentColor">
          <animate
            attributeName="y"
            begin="svgSpinnersBarsScale0.begin+0.2s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
            values="6;1;6"
          />
          <animate
            attributeName="height"
            begin="svgSpinnersBarsScale0.begin+0.2s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
            values="12;22;12"
          />
        </rect>
        <rect width="2.8" height="12" x="15.4" y="6" fill="currentColor">
          <animate
            attributeName="y"
            begin="svgSpinnersBarsScale0.begin+0.3s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
            values="6;1;6"
          />
          <animate
            attributeName="height"
            begin="svgSpinnersBarsScale0.begin+0.3s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
            values="12;22;12"
          />
        </rect>
        <rect width="2.8" height="12" x="20.2" y="6" fill="currentColor">
          <animate
            id="svgSpinnersBarsScale1"
            attributeName="y"
            begin="svgSpinnersBarsScale0.begin+0.4s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
            values="6;1;6"
          />
          <animate
            attributeName="height"
            begin="svgSpinnersBarsScale0.begin+0.4s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
            values="12;22;12"
          />
        </rect>
      </svg>
    </div>

    <div v-if="news.length > 0" class="news-list">
      <!-- <div style="color:cornflowerblue" class="fw-bold text-center ">
       Total: {{ news.length }}
        </div> -->
      <div style="position: relative">
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
        <h4 class="fw-bold mt-2">{{ currentTag }}</h4>
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
        <button
          type="button"
          class="btn-danger1"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Setting
        </button>

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
          style="position: absolute; right: 0; top: -25px"
          @click="clearNews"
          class="bi bi-x-circle pointer"
        ></i>
      </div>
     
      <!-- Список новостей -->
      <!-- <div class="row row-cols-1 row-cols-md-3 g-3 mt-3">
        <div v-for="item in news" :key="item.id" class="col">
          <div class="card">
            <img
              v-if="item.tempImageUrl || item.urlToImage"
              :src="item.tempImageUrl || item.urlToImage"
              class="card-img-top"
            />
            <img v-else :src="image" class="card-img-top" />

            <div class="card-body">
              <div class="overlay">
              <h5 class="card-title">
                <a style="font-size: 12px;" :href="item.url" target="_blank">{{ item.sourceName }}</a>
              </h5>
              <p class="card-text">
                <small class="text-muted">{{ formatDateTime(item.publishedAt) }}</small>
              </p>
              <p v-if="item.author" class="badge bg-primary" :style="{ 'max-width': '200px', 'white-space': 'nowrap', 'overflow': 'hidden', 'text-overflow': 'ellipsis' }">  
  {{ item.author }}  
</p>
              <p v-else class="badge bg-secondary">Unknown</p>
              <p style="color: cornflowerblue;" class="fw-bold">{{ item.title }}</p>
              <p>{{ item.description }}</p>
              <p v-html="item.content"></p>
            </div>
              <button @click="openEditModal(item)" class="btn-danger1 mt-2">
                Edit
              </button>
              <button @click="sendToTelegram(item)" class="btn-danger1 mt-2">
                Send to Telegram
                <i class="bi bi-telegram"></i>
              </button>
            </div>
          </div>
        </div>
      </div> -->
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
                Edit
              </button>
              <button @click="sendToTelegram(item)" class="btn-danger1 mt-2">
                Telegram
                <i style="color: cornflowerblue" class="bi bi-telegram"></i>
              </button>
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
                <div class="mb-3">
                  <label for="editImageFile" class="form-label"
                    >Upload Image</label
                  >
                  <input
                    id="editImageFile"
                    type="file"
                    @change="uploadImage"
                    class="form-control"
                  />
                </div>
                <div class="mb-3">
                  <label for="editImage" class="form-label">Image URL</label>
                  <input
                    id="editImage"
                    type="text"
                    v-model="editableItem.tempImageUrl"
                    class="form-control"
                  />
                </div>
                <label for="editTitle" class="form-label">Title</label>
                <input
                  id="editTitle"
                  type="text"
                  v-model="editableItem.title"
                  class="form-control"
                />
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
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn-danger1" data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                class="btn-danger1"
                @click="saveChanges"
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
              <button @click="sendToTelegram(item)" class="btn-danger1 mt-2">
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

import { useTopPopularStore } from "../../stores/popular";
import { computed, onMounted, ref } from "vue";
import { useChannelStore } from "@/stores/channelStore";
import Setting from '@/components/Setting.vue'
export default {
  components:{Setting},
  setup() {
    const store = useTopPopularStore(); // Использование store
    const channelStore = useChannelStore(); // Store для работы с каналами

    const editableItem = ref({});
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

      const editedItem = {
        ...item,
        title: item.title?.trim() || "", // Если title null или undefined, используем пустую строку
        description: item.description?.trim() || "",
        content: item.content?.trim() || "",
      };

      // Отправляем сообщение
      store.sendToTelegram(editedItem, activeChannelId.value);
    };

    // Инициализация при загрузке компонента
    onMounted(() => {
      store.loadSavedTags(); // Загружаем сохранённые теги
      fetchTags(); // Загружаем теги
    });

    return {
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
  gap: 5px;
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
  box-shadow: 0px 8px 16px rgba(19, 93, 147, 0.3);
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
  margin-top: 20px;
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
