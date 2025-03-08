<template>
  <div class="container">
    <!-- <label for="categorySelect" class="form-label">Category</label> -->
    <select v-model="selectedCategoryId" class="form-control w-100 mb-3">
      <option :value="null">All categories</option>
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
    <!-- <label for="languageSelect" class="form-label ">Language</label> -->
    <select v-model="selectedLanguageId" @change="filterTagsByLanguage" class="form-control w-100 mb-3">
      <option :value="null">All languages</option>
      <option v-for="language in languages" :key="language.id" :value="language.id">
        {{ language.name }}
      </option>
    </select>


    <!-- Поле поиска с иконкой -->
    <div class="d-flex align-items-center w-100">
     
      <input
        type="text"
        v-model="query"
        class="form-control flex-grow-1"
        placeholder="Search..."
      />
      <svg
        class="pointer ms-2"
        @click="searchTags"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M12.94 4v2.717c3.004.269 5.01 2.746 5.01 5.597a5.6 5.6 0 0 1-4.223 5.434L12.9 20.34l-.115.346c1.478-.096 2.956-.623 4.242-1.506l.51.767c1.421.518 2.516 1.652 3.006 2.737c.49 1.104.507 1.678 2.244 2.964c1.738 1.277 2.872 2.219 3.15 2.315c.288.096.913.038 1.499-.547c.584-.587.64-1.211.544-1.49s-1.036-1.41-2.322-3.149c-1.286-1.738-1.873-1.757-2.967-2.246s-2.227-1.575-2.736-2.996l-.758-.498c.922-1.344 1.508-2.966 1.508-4.723c0-4.426-3.418-8.045-7.766-8.314zm-1.768.068C7.12 4.634 4 8.12 4 12.314c0 4.224 3.005 7.755 7.066 8.303v-2.793c-2.563-.508-4.35-2.784-4.35-5.51a5.61 5.61 0 0 1 3.6-5.242l.788-2.754zm.828.498l-2.846 9.936l2.852-1.258v6.799L15.52 9.117L12 10.586zm14.492 21.495c.231 0 .422.191.422.421a.42.42 0 0 1-.422.414a.41.41 0 0 1-.412-.414c0-.23.181-.421.412-.421"
        />
      </svg>
    </div>

    <br />
    <div style="position: relative">
      <i
        v-if="tags.length > 0"
        style="position: absolute; right: 0; top: 10px"
        @click="clearTags"
        class="bi bi-x-circle pointer"
      ></i>

      <div v-if="loadingTags" class="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="82"
          height="82"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
            transform="matrix(0 0 0 0 12 12)"
          >
            <animateTransform
              id="svgSpinnersPulseRingsMultiple0"
              attributeName="transform"
              begin="0;svgSpinnersPulseRingsMultiple2.end"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              type="translate"
              values="12 12;0 0"
            />
            <animateTransform
              additive="sum"
              attributeName="transform"
              begin="0;svgSpinnersPulseRingsMultiple2.end"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              type="scale"
              values="0;1"
            />
            <animate
              attributeName="opacity"
              begin="0;svgSpinnersPulseRingsMultiple2.end"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              values="1;0"
            />
          </path>
          <path
            fill="currentColor"
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
            transform="matrix(0 0 0 0 12 12)"
          >
            <animateTransform
              id="svgSpinnersPulseRingsMultiple1"
              attributeName="transform"
              begin="svgSpinnersPulseRingsMultiple0.begin+0.2s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              type="translate"
              values="12 12;0 0"
            />
            <animateTransform
              additive="sum"
              attributeName="transform"
              begin="svgSpinnersPulseRingsMultiple0.begin+0.2s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              type="scale"
              values="0;1"
            />
            <animate
              attributeName="opacity"
              begin="svgSpinnersPulseRingsMultiple0.begin+0.2s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              values="1;0"
            />
          </path>
          <path
            fill="currentColor"
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
            transform="matrix(0 0 0 0 12 12)"
          >
            <animateTransform
              id="svgSpinnersPulseRingsMultiple2"
              attributeName="transform"
              begin="svgSpinnersPulseRingsMultiple0.begin+0.4s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              type="translate"
              values="12 12;0 0"
            />
            <animateTransform
              additive="sum"
              attributeName="transform"
              begin="svgSpinnersPulseRingsMultiple0.begin+0.4s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              type="scale"
              values="0;1"
            />
            <animate
              attributeName="opacity"
              begin="svgSpinnersPulseRingsMultiple0.begin+0.4s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              values="1;0"
            />
          </path>
        </svg>
      </div>
      <!-- Список тегов -->

      <div v-else class="tags-list">
        <br />
        <div class="tags-lis">
          <!-- <div style="color: cornflowerblue" class="fw-bold text-center">
          Total: {{ tags.length }}
        </div> -->
          <div
            class="scrollable-tags-list rounded p-1"
            ref="tagsList"
            style="max-height: 300px; overflow-y: auto"
          >
            <button
              style="
                color: var(--bs-body-color);
                background-color: var(--bs-body-bg);
              "
              v-for="tag in sortedTags"
              :key="tag.id"
              class="btn-danger2"
              @click="
                selectTag(tag.name);
                fetchNews(tag.name);
              "
            >
              {{ tag.name }}
              <span
                style="
                  color: var(--bs-body-color);
                  background-color: var(--bs-body-bg);
                "
                class="badge"
                >{{ tag.popularity }}</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Список новостей -->
    <div v-if="news.length > 0" class="news-list">
      <div style="position: relative">
        <h5 class="fw-bold mt-1">{{ currentTag }}: {{ news.length }}</h5>
        <!-- Сохранённые теги -->
        <!-- <button  @click="toggleSavedTags" v-if="savedTags.length > 0"   class="pl-4 btn-danger1">
        <i class="bi bi-floppy2-fill pointer "> Saved tags</i> 
        </button>
         <div class="saved-tags mb-1">
          
  <span
    v-for="tag in savedTags"
    :key="tag"
    class="badge bg-success saved-tag pointer "
    @click="() => { selectTag(tag); fetchNews(tag); }"
  >
    {{ tag }}
    <i
      @click.stop="removeSavedTag(tag)"
      class="bi bi-x-circle pointer text-white"
    ></i>
  </span>
</div> -->
        <button
          class="btn-danger1"
          :class="{ 'btn-danger': isTagSaved }"
          @click="toggleSaveTag"
        >
          {{ isTagSaved ? "Delete" : "Save" }}
        </button>

        <button
          @click="toggleSavedTags"
          v-if="savedTags.length > 0"
          class="pl-4 btn-danger1"
        >
          <i class="bi bi-floppy2-fill pointer"> Saved tags</i>
        </button>

        <!-- Блок с сохранёнными тегами -->
        <div v-if="showSavedTags" class="saved-tags mb-1">
          <span
            v-for="tag in savedTags"
            :key="tag"
            class="badge bg-success saved-tag pointer"
            @click="
              () => {
                selectTag(tag);
                fetchNews(tag);
              }
            "
          >
            {{ tag }}
            <i
              @click.stop="removeSavedTag(tag)"
              class="bi bi-x-circle pointer text-white"
            ></i>
          </span>
        </div>

        <!-- <button
    class="btn-danger1 "
    :class="{ 'btn-danger': isTagSaved }"
    @click="toggleSaveTag(currentTag)"
  >
    {{ isTagSaved ? "Delete" : "Save" }}
  </button> -->

        <button
          @click="toggleAutopilot"
          :class="['btn-danger1 fw-bold ', { 'btn-primary': autopilotActive }]"
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
          style="position: absolute; right: 0; top: -20px"
          @click="clearNews"
          class="bi bi-x-circle pointer"
        ></i>
      </div>

      <div v-if="loadingNews" class="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="52"
          height="52"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
            transform="matrix(0 0 0 0 12 12)"
          >
            <animateTransform
              id="svgSpinnersPulseRingsMultiple0"
              attributeName="transform"
              begin="0;svgSpinnersPulseRingsMultiple2.end"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              type="translate"
              values="12 12;0 0"
            />
            <animateTransform
              additive="sum"
              attributeName="transform"
              begin="0;svgSpinnersPulseRingsMultiple2.end"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              type="scale"
              values="0;1"
            />
            <animate
              attributeName="opacity"
              begin="0;svgSpinnersPulseRingsMultiple2.end"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              values="1;0"
            />
          </path>
          <path
            fill="currentColor"
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
            transform="matrix(0 0 0 0 12 12)"
          >
            <animateTransform
              id="svgSpinnersPulseRingsMultiple1"
              attributeName="transform"
              begin="svgSpinnersPulseRingsMultiple0.begin+0.2s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              type="translate"
              values="12 12;0 0"
            />
            <animateTransform
              additive="sum"
              attributeName="transform"
              begin="svgSpinnersPulseRingsMultiple0.begin+0.2s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              type="scale"
              values="0;1"
            />
            <animate
              attributeName="opacity"
              begin="svgSpinnersPulseRingsMultiple0.begin+0.2s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              values="1;0"
            />
          </path>
          <path
            fill="currentColor"
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
            transform="matrix(0 0 0 0 12 12)"
          >
            <animateTransform
              id="svgSpinnersPulseRingsMultiple2"
              attributeName="transform"
              begin="svgSpinnersPulseRingsMultiple0.begin+0.4s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              type="translate"
              values="12 12;0 0"
            />
            <animateTransform
              additive="sum"
              attributeName="transform"
              begin="svgSpinnersPulseRingsMultiple0.begin+0.4s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              type="scale"
              values="0;1"
            />
            <animate
              attributeName="opacity"
              begin="svgSpinnersPulseRingsMultiple0.begin+0.4s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              values="1;0"
            />
          </path>
        </svg>
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
                    <a :href="item.url" target="_blank"> {{ item.title }}</a>
                  </p>
                  <p>{{ item.description }}</p>
                  <p v-html="item.content"></p>
                </div>
              </div>
              <button @click="openEditModal(item)" class="btn-danger1 mt-2">
                Editing and sending
              </button>
              <!-- <button @click="sendToTelegram(item)" class="btn-danger1 mt-2">
                Send to Telegram
                <i style="color: cornflowerblue" class="bi bi-telegram"></i>
              </button> -->
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
            <div>
              <!-- Кнопка для открытия компонента -->
              <button @click="toggleSetting" class="btn">
                <i class="bi bi-sliders"></i>
              </button>
              <i
                style="position: absolute; right: 5px; top: 3px"
                class="bi bi-x-circle pointer"
                data-bs-dismiss="modal"
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
              <!-- <div class="mb-3">
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
                </div> -->
              <label style="color:cornflowerblue" for="editTitle" class="form-label fw-bold">Title</label>
              <textarea
                id="editTitle"
                type="text"
                v-model="editableItem.title"
                class="form-control"
              ></textarea>
            </div>
            <div class="mb-3">
              <label style="color:cornflowerblue" for="editDescription" class="form-label fw-bold"
                >Description</label
              >
              <textarea
                id="editDescription"
                v-model="editableItem.description"
                class="form-control"
              ></textarea>
            </div>
            <div class="mb-3">
              <label style="color:cornflowerblue" for="editContent" class="form-label fw-bold">Content</label>
              <!-- <textarea
                  id="editContent"
                  v-model="editableItem.content"
                  class="form-control"
                ></textarea> -->
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
            <button @click="sendToTelegram(editableItem)" class="btn-danger1">
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
import axios from "axios";
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
    const showSetting = ref(false);
    const showSavedTags = ref(false);
    const toggleSavedTags = () => {
      showSavedTags.value = !showSavedTags.value;
    };
    const toggleSetting = () => {
      showSetting.value = !showSetting.value;
    };

    // const autopilotInterval = ref(null);
    // const autopilotActive = ref(false);
    const loadingTags = ref(false); // Состояние загрузки тегов
    const loadingNews = ref(false);
    //getters

    const sortedTags = computed(() => store.sortedTags);
    const savedTags = computed(() => storePop.savedTags);
    //const currentTag = computed(() => storePop.currentTag);
    const currentTag = ref(""); // Текущий выбранный тег
    //     const selectTag = (tagName) => {
    //   currentTag.value = tagName;
    //   console.log("Текущий тег установлен:", tagName);
    // };

    const clearTags = () => {
      store.tags = []; // Очистка массива тегов в сторе
      console.log("Теги очищены!");
    };

    // Проверяем, сохранён ли текущий тег
    const isTagSaved = computed(() => {
      return storePop.savedTags.includes(currentTag.value);
    });

    const selectTag = (tagName) => {
      currentTag.value = tagName;
      console.log("Выбранный тег:", currentTag.value);
    };

    const toggleSaveTag = () => {
      if (!currentTag.value.trim()) {
        console.error("Ошибка: Текущий тег пустой, невозможно сохранить.");
        return;
      }

      if (storePop.savedTags.includes(currentTag.value)) {
        // Удаляем тег
        storePop.savedTags = storePop.savedTags.filter(
          (tag) => tag !== currentTag.value
        );
        console.log(`Тег удалён: ${currentTag.value}`);
      } else {
        // Добавляем тег
        storePop.savedTags.push(currentTag.value);
        console.log(`Тег сохранён: ${currentTag.value}`);
      }

      // Обновляем `localStorage`
      localStorage.setItem("savedTags", JSON.stringify(storePop.savedTags));
    };

    // Удаление тега из списка сохранённых
    const removeSavedTag = (tag) => {
      const updatedTags = storePop.savedTags.filter(
        (savedTag) => savedTag !== tag
      );
      storePop.savedTags = updatedTags;
      localStorage.setItem("savedTags", JSON.stringify(updatedTags));
      console.log("Тег удалён:", tag);
    };

    // Действия
    const activeChannelId = computed(() => channelStore.activeChannelId); // Достаём ID активного канала

    const tagsList = ref(null);
    const editableItem = ref({
      title: "",
      description: "",
      content: "",
      tempImageUrl: "",
      urlToImage: "",
      id: null,
    });

    //const editableItem = ref({});
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
    const logQuery = () =>
      console.log("Текущий ввод в поле поиска:", store.query);

    //const searchTags = () => store.searchTags();
    const searchTags = async () => {
      console.log("Запуск поиска тегов...");
      loadingTags.value = true;
      try {
        await store.searchTags();
        console.log("Теги загружены:", store.tags);
      } catch (error) {
        console.error("Ошибка при поиске тегов:", error);
      } finally {
        loadingTags.value = false;
      }
    };

    const fetchNews = async (tagName) => {
      try {
        loadingNews.value = true; // Включаем прелоадер
        await store.fetchNews(tagName); // Загружаем новости
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
      } finally {
        loadingNews.value = false; // Отключаем прелоадер
      }
    };

    //const fetchNews = (tagName) => store.fetchNews(tagName);
    const clearNews = () => store.clearNews();

    // const sendToTelegram = (item) => {
    //   if (!activeChannelId.value) {
    //     alert("Please select a Telegram channel first.");
    //     return;
    //   }
    //   store.sendToTelegram(item, activeChannelId.value);
    // };

    const openEditModal = (item) => {
      editableItem.value = { ...item };
      const modal = new bootstrap.Modal(document.getElementById("editModal"));
      modal.show();
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
      const message = `<b>🔥🔥🔥${item.title}🔥🔥🔥</b>\n${description}\n${content}\n<a href="${item.url}"><b>➡️Читать полностью</b></a>`;

      const data = {
        chat_id: activeChannelId.value,
        text: message,
        parse_mode: "HTML",
      };

      axios
        .post(`https://api.telegram.org/bot${store.botToken}/sendMessage`, data)
        .then((response) => {
          console.log(
            "Сообщение успешно отправлено в Telegram:",
            response.data
          );
          alert("Сообщение отправлено!");
        })
        .catch((error) => {
          console.error("Ошибка отправки сообщения:", error);
          alert(`Ошибка отправки: ${error.message}`);
        });
    };

    // const sendToTelegram = (item) => {
    //   if (!activeChannelId.value) {
    //     alert("Выберите канал для отправки новостей!");
    //     return;
    //   }

    //   // Логируем данные перед отправкой
    //   console.log("Отправка данных:", item);

    //   const message = `<b>${item.title}</b>\n${item.description}\n${item.content}\n<a href="${item.url}">Читать полностью</a>`;
    //   const data = {
    //     chat_id: activeChannelId.value,
    //     text: message,
    //     parse_mode: "HTML",
    //   };

    //   axios
    //     .post(`https://api.telegram.org/bot${store.botToken}/sendMessage`, data)
    //     .then((response) => {
    //       console.log("Сообщение успешно отправлено в Telegram:", response.data);
    //       alert("Сообщение отправлено!");
    //     })
    //     .catch((error) => {
    //       console.error("Ошибка отправки сообщения:", error);
    //       alert(`Ошибка отправки: ${error.message}`);
    //     });
    // };

    const scrollToTop = () => store.scrollToTop(tagsList.value);
    // const sendChatIdAndTagId = () => {
    //   // Реализуйте логику автоматической отправки данных
    // };

    onMounted(() => {
      store.fetchLanguages();
      store.fetchCategories();
      storePop.loadSavedTags(); // Загружаем сохранённые теги
      if (storePop.savedTags.length > 0) {
        currentTag.value = storePop.savedTags[0]; // Устанавливаем первый тег как текущий
      }
    });

    return {
      languages: computed(() => store.languages),
      selectedLanguageId: computed({
        get: () => store.selectedLanguageId,
        set: (value) => {
          store.selectedLanguageId = value;
          store.filterTagsByLanguage(); // Перефильтровываем теги при смене языка
        },
      }),
      clearTags,
      logQuery,
      toggleSavedTags,
      showSavedTags,
      loadingNews,
      loadingTags,
      showSetting,
      toggleSetting,
      // savedTags: computed(() => storePop.savedTags),
      selectTag,
      currentTag,
      savedTags,
      sortedTags,
      removeSavedTag,
      isTagSaved,
      toggleSaveTag,
      // autopilotActive,
      // toggleAutopilot,
      query: computed({
        get: () => store.query,
        set: (value) => (store.query = value),
      }),
      selectedCategoryId: computed({
        get: () => store.selectedCategoryId,
        set: (value) => (store.selectedCategoryId = value),
      }),
      categories: computed(() => store.categories),
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

/* .search-input {
  width: 250px;
} */

.loading {
  text-align: center;
  margin-top: 20px;
}

.tags-lis {
  /* box-shadow: 0px 8px 16px rgba(19, 93, 147, 0.3); */
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
.modal-content {
  border-radius: 15px;
  padding: 20px;
  border: 2px solid cornflowerblue;
}
</style>
