<template>
  <div class="container">
    <!-- Поле поиска -->
    <div class="search-container">
      <input
        type="text"
        v-model="query"
        class="form-control mb-3"
        placeholder="Search..."
        style="
          max-width: 300px;
          display: inline-block;
          border-bottom: 2px solid #ccc !important;
          border-top: none !important;
          border-left: none !important;
          border-right: none !important;
          box-shadow: none !important;
        "
      />
      <svg
        @click="searchTags"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-search pointer"
        viewBox="0 0 16 16"
        style="cursor: pointer; margin-left: 10px"
      >
        <path
          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
        />
      </svg>
    </div>

    <!-- Список тегов -->
    <div class="tags-list">
      <div class="tags-lis" v-if="tags.length > 0" >
        <div style="color: cornflowerblue" class="fw-bold text-center">
          Total: {{ tags.length }}
        </div>
        <div
          class="scrollable-tags-list rounded"
          ref="tagsList"
          style="max-height: 300px; overflow-y: auto"
        >
         
        
        <button
  v-for="tag in sortedTags"
  :key="tag.id"
  class="btn-danger2 m-1"
  @click="() => { selectTag(tag.name); fetchNews(tag.name); }"
>
  {{ tag.name }} -
  <span class="badge">{{ tag.popularity }}</span>
</button>

        <!-- <button
            v-for="tag in sortedTags"
            :key="tag.id"
            class="btn-danger2 m-1"
            @click="fetchNews(tag.name)"
          >
            {{ tag.name }} -
            <span class="badge">{{ tag.popularity }}</span>
          </button> -->
        </div>
      </div>
    </div>

    <!-- Список новостей -->
    <div v-if="news.length > 0" class="news-list">
      <div style="position: relative">
         <!-- Сохранённые теги -->
         <div class="saved-tags">
          <span
            v-for="tag in savedTags"
            :key="tag"
            class="badge bg-success saved-tag pointer m-1"
            @click="fetchNews(tag)"
          >
            {{ tag }}
            <i
              @click.stop="removeSavedTag(tag)"
              class="bi bi-x-circle pointer text-white"
            ></i>
          </span>
        </div>
        
       
        <button
  class="btn-danger1 me-2"
  :class="{ 'btn-danger': isTagSaved }"
  @click="toggleSaveTag(currentTag)"
>
  {{ isTagSaved ? "Delete" : "Save" }}
</button>

        
        <!-- Button trigger modal -->
        <button
          type="button"
          class="btn-danger1"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Setting
        </button>

        <!-- Modal -->
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
              <!-- <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div> -->
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
                <!-- <button type="button" class="btn btn-primary">Understood</button> -->
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
      <!-- Индикатор загрузки -->
      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <!-- <span class="visually-hidden">Loading...</span> -->
        </div>
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
                Edit
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

    <!-- Модальное окно для редактирования -->

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
            <setting />
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
</template>

<script>
import { useTopPopularStore } from "../../stores/popular";
import { useTagStore } from "../../stores/tags";
import { useChannelStore } from "@/stores/channelStore";
import { computed, onMounted, ref } from "vue";
import setting from "../../components/Setting.vue";
export default {
  methods: {},
  components: { setting },

  setup(props) {
    const store = useTagStore();
    const channelStore = useChannelStore();
    const storePop = useTopPopularStore();
   
    // const autopilotInterval = ref(null);
    // const autopilotActive = ref(false);

    //getters
    
    const sortedTags = computed(() => store.sortedTags);
    const savedTags = computed(() => storePop.savedTags);
    const currentTag = ref(""); // Текущий выбранный тег
    const selectTag = (tagName) => {
  currentTag.value = tagName;
  console.log("Текущий тег установлен:", tagName);
};

// Вызываем метод сохранения/удаления тега
const toggleSaveTag = () => {
  if (!currentTag.value.trim()) {
    console.error("Текущий тег пустой, невозможно сохранить.");
    return;
  }
  storePop.toggleSaveTag(currentTag.value); // Передаём текущий тег в метод store
  console.log("Тег сохранён/удалён:", currentTag.value);
};


// Проверяем, сохранён ли текущий тег
const isTagSaved = computed(() => storePop.savedTags.includes(currentTag.value));

   
const removeSavedTag = (tag) => {
  const updatedTags = storePop.savedTags.filter((savedTag) => savedTag !== tag); // Фильтруем теги
  storePop.savedTags = updatedTags; // Обновляем массив сохранённых тегов в store
  localStorage.setItem("savedTags", JSON.stringify(updatedTags)); // Сохраняем изменения в localStorage
  console.log("Тег удалён:", tag); // Лог для проверки
};

    // Действия
    const activeChannelId = computed(() => channelStore.activeChannelId); // Достаём ID активного канала

    const tagsList = ref(null);
    const editableItem = ref({});
    const query = computed({
      get: () => store.query,
      set: (value) => (store.query = value),
    });

    const sortOption = computed({
      get: () => store.sortOption,
      set: (value) => store.updateSortOption(value),
    });

    const uploadImage = (event) => {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        editableItem.value.tempImageUrl = imageUrl;
      }
    };
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

    const searchTags = () => store.searchTags();

    const fetchNews = (tagName) => store.fetchNews(tagName);
    const clearNews = () => store.clearNews();

    const sendToTelegram = (item) => {
      if (!activeChannelId.value) {
        alert("Please select a Telegram channel first.");
        return;
      }
      store.sendToTelegram(item, activeChannelId.value);
    };


    const scrollToTop = () => store.scrollToTop(tagsList.value);
    // const sendChatIdAndTagId = () => {
    //   // Реализуйте логику автоматической отправки данных
    // };

    onMounted(() => {
      storePop.loadSavedTags(); // Загружаем сохранённые теги
  if (storePop.savedTags.length > 0) {
    currentTag.value = storePop.savedTags[0]; // Устанавливаем первый тег как текущий
  }

    });

    return {
      selectTag,
      currentTag,
      savedTags,
      sortedTags,
      removeSavedTag,
      isTagSaved,
      toggleSaveTag,
      // autopilotActive,
      // toggleAutopilot,
      query,
      tags: computed(() => store.tags),
      news: computed(() => store.news),
      loading: computed(() => store.loading),
      sortOption,
      totalTags: computed(() => store.totalTags),
      progress: computed(() => store.progress),
      image: computed(() => store.image),
     
      searchTags,
      fetchNews,
      clearNews,
      sendToTelegram,
      

      scrollToTop,
      tagsList,
      // sendChatIdAndTagId,
      formatDateTime: store.formatDateTime,
      activeChannelId,
      editableItem,
      openEditModal,
      saveChanges,
    };
  },
};
</script>

<style lang="css" scoped>
.overlay {
  overflow-x: hidden;
  overflow-y: auto;
  height: 250px;
}
/* .c{
  height: 200px;
}
@media screen and (max-width: 350px) {
  .c{
  height: 180px;
}
} */
.over {
  overflow-x: hidden;
  overflow-y: auto;
  height: 250px;
}
a {
  text-decoration: none;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.search-input {
  width: 250px;
}

.loading {
  text-align: center;
  margin-top: 20px;
}

.tags-lis {
  box-shadow: 0px 8px 16px rgba(19, 93, 147, 0.3);
  border-radius: 20px;
}

.scrollable-tags-list {
  max-height: 300px;
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

.card-img-top {
  width: 100%;
  /* height: auto; */
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
font-size: 14px;
}
.saved-tag {
 
  
}
.save-tag-btn {
  margin-left: 10px;
  padding: 5px 10px;
  cursor: pointer;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
}
.save-tag-btn.active {
  background-color: #f93402;
}
.save-tag-btn:hover {
  background-color: #0366cf;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
</style>
