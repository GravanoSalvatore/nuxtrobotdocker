<template lang="">
  <!-- <TonConnectUIProvider :options="options"> -->
  <nav class="navbar navbar-expand-lg mb-4">
    <div class="container-fluid">
      <NuxtLink class="navbar-brand" to="/"
        ><img style="max-width: 200px" src="@/assets/img/4vrobot.png"
      /></NuxtLink>
      <!-- <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      > -->
      <svg
        class="navbar-toggler"
        xmlns="http://www.w3.org/2000/svg"
        width="52"
        height="52"
        viewBox="0 0 2048 2048"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        style="border: none !important"
      >
        <path
          fill="cornflowerblue"
          d="M2048 128v128H0V128zM0 1664h2048v128H0zm0-768h2048v128H0zm0-384h2048v128H0zm0 768h2048v128H0z"
        />
      </svg>
      <!-- <span class="navbar-toggler-icon"></span>
      </button> -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <NuxtLink
              class="nav-link"
              :class="{ active: $route.path === '/' }"
              to="/"
            >
              Home
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink
              class="nav-link"
              :class="{ active: $route.path === '/doc' }"
              to="/doc"
            >
              Documentation
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink
              class="nav-link"
              :class="{ active: $route.path === '/terms' }"
              to="/terms"
            >
              Personal account
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <div class="">
      <NuxtLink style="text-decoration: none; margin-left:" to="/">
        <!-- <h5
        style="color: cornflowerblue; padding-left: 20px"
        class="fw-bold pointer my-4"
      >
        4V.ROBOT
      </h5> -->
      </NuxtLink>
    </div>
    <button
      class="theme-toggle-btn"
      @click="themeStore.toggleTheme"
      :title="
        themeStore.isDark
          ? 'Переключить на светлую тему'
          : 'Переключить на тёмную тему'
      "
    >
      <Icon
        v-if="!themeStore.isDark"
        name="meteocons:clear-day"
        style="font-size: 30px; margin-left: 20px"
      />

      <Icon
        v-else
        name="meteocons:clear-night"
        style="font-size: 30px; margin-left: 20px"
      />
    </button>
    <Grid />
    <div class="row">
      <!-- Левая колонка -->
      <div class="col-12 col-md-3 fixed-sidebar mb-4 mb-md-0">
        <div class="sidebar-content">
          <div class="accordion accordion-flush" id="accordionFlushExample">
            <div
              v-for="(item, index) in accordionItems"
              :key="index"
              class="accordion-item"
            >
              <h2 class="accordion-header">
                <button
                  :class="{ 'active-item': activeIndex === index }"
                  @click="handleItemClick(item, index)"
                  class="accordion-button pointer"
                >
                  <div class="card-icon me-2" v-html="item.icon"></div>
                  <span style="color:">{{ item.title }}</span>
                </button>
              </h2>
            </div>
            <br />
            <Pay />
          </div>

          <footer class="">
            <div class="container">
              <div class="row align-items-center">
                <!-- Социальные иконки -->
                <div class="col-md-12 text-center text-md-start mb-3 mb-md-0">
                  <div
                    class="d-flex justify-content-center justify-content-md-start"
                  >
                    <a href="#" class="me-3 fs-4" aria-label="Facebook">
                      <i class="bi bi-facebook"></i>
                    </a>
                    <a href="#" class="me-3 fs-4" aria-label="Twitter">
                      <i class="bi bi-twitter"></i>
                    </a>
                    <a href="#" class="me-3 fs-4" aria-label="Instagram">
                      <i class="bi bi-instagram"></i>
                    </a>
                    <a href="#" class="me-3 fs-4" aria-label="LinkedIn">
                      <i class="bi bi-telegram"></i>
                    </a>
                    <a href="#" class="fs-4 me-3" aria-label="YouTube">
                      <i class="bi bi-youtube"></i>
                    </a>
                    <a href="#" class="fs-4 me-3" aria-label="YouTube">
                      <i class="bi bi-reddit"></i>
                    </a>
                  </div>
                </div>
                
                <!-- Поле для обратной связи -->
                <!-- <div class="col-md-12 mb-3 mb-md-0">
                  <form @submit.prevent="sendFeedback"> -->
                    <!-- <div class="input-group ">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Ваш email"
                      aria-label="Email"
                      v-model="email"
                      required
                    />
                    <button class="btn-danger1" type="submit">feedback</button>
                  </div> -->
                  <!-- </form>
                </div> -->

                <!-- Адрес -->
                <!-- <div class="col-md-12 text-center text-md-end mt-4">
                <p class="mb-0 fw-bold">fourv@gmail.com 4V company.</p>
              </div> -->
              </div>
            </div>
          </footer>
        </div>

        <!-- Сохранённые теги -->
        <div class="saved-tags">
          <span
            v-for="tag in savedTags"
            :key="tag"
            class="badge bg-success saved-tag"
            @click="handleTagClick(tag)"
          >
            {{ tag }}
            <i
              @click.stop="removeSavedTag(tag)"
              class="bi bi-x-circle pointer text-white"
            ></i>
          </span>
        </div>

        
      </div>

      <!-- Правая колонка -->
      <div class="col-12 col-md-9 p" ref="newsContainer">
        <div class="row container p">
          <NuxtPage />
        </div>
      </div>
      <div
        v-if="showModal"
        class="modal fade show"
        id="settingsModal"
        tabindex="-1"
        aria-labelledby="settingsModalLabel"
        aria-hidden="true"
        style="display: block; background:"
      >
        <div class="modal-dialog form">
          <div class="modal-content">
            <button
              type="button"
              class="btn-close position-absolute top-0 end-0 me-2 mt-2"
              aria-label="Close"
              @click="closeModal"
            ></button>

            <!-- <div
              class="modal-header"
              style=""
            >
              Manage Channels
             
            </div> -->
            <div class="modal-body">
              <!-- Ваш компонент -->
              <Setting />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Список новостей -->
    <div style="position: relative" class="news-list">
      <div
        v-if="news.length > 0"
        style="color: cornflowerblue"
        class="text-center"
      >
        Total: {{ news.length }}
      </div>
      <i
        v-if="news.length > 0"
        style="position: absolute; right: 0; top: -25px"
        @click="clearNews"
        class="bi bi-x-circle pointer"
      ></i>
      <div v-if="loadingNews" class="text-center">
        <p>
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
        </p>
      </div>

      <div v-else class="row g-4 mt-2">
        <div
          v-for="item in news"
          :key="item.id"
          class="col-12 col-md-6 col-lg-4 col-xl-3"
        >
          <div class="news-item border p-3 rounded">
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
                    <a style="font-size: 12px" :href="item.url" target="_blank">
                      {{ item.sourceName }}
                    </a>
                  </h5>
                  <p class="card-text">
                    <small class="text-muted">
                      {{ formatDateTime(item.publishedAt) }}
                    </small>
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
                  <div>
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
      </div>
    </div>
  </div>
  <!-- </TonConnectUIProvider> -->
</template>

<script>
//import Pay from '@/components/Pay.vue'
//import { useTopPopularStore } from "../stores/popular";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useTopPopularStore } from "../../stores/popular";
import { useChannelStore } from "@/stores/channelStore";
import { useThemeStore } from "~/stores/useThemeStore";
export default {
  ssr: false,
  // components:{Pay},
  data() {
    return {
      email: "",
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
    sendFeedback() {
      if (this.email) {
        alert(`Ваш email (${this.email}) принят. Спасибо за обратную связь!`);
        this.email = "";
      }
    },
  },

  setup() {
    const popularStore = useTopPopularStore();
    const themeStore = useThemeStore();
    const channelStore = useChannelStore();
    const savedTags = computed(() => themeStore.savedTags);
    const tags = computed(() => themeStore.tags);
    const news = computed(() => themeStore.news);
    const localNews = ref([]);
    const loadingNews = computed(() => themeStore.loadingNews);
    const activeChannelId = computed(() => channelStore.activeChannelId); // Получаем activeChannelId
    const clearNews = () => {
      themeStore.clearNews();
      localNews.value = [];
    };
    const sendToTelegram = (item) => {
      if (!activeChannelId.value) {
        alert("Выберите канал для отправки новостей!");
        return;
      }

      themeStore.sendToTelegram(item, activeChannelId.value);
    };

    const fetchNews = async (tagName) => {
      await themeStore.fetchNews(tagName);
      localNews.value = themeStore.news.map((item) => ({ ...item })); // Локальная копия новостей
    };
    // const removeSavedTag = (tag) => {
    //   themeStore.savedTags = themeStore.savedTags.filter((savedTag) => savedTag !== tag); // Удаляем тег
    //   localStorage.setItem("savedTags", JSON.stringify(themeStore.savedTags)); // Сохраняем изменения в localStorage
    //   console.log("Тег удалён:", tag);
    // };

    const removeSavedTag = (tag) => {
      themeStore.toggleSaveTag(tag); // Обновляем теги через метод Pinia
    };

    const activeIndex = ref(null);
    const router = useRouter();
    const showModal = ref(false);
    const accordionItems = ref([
      {
        title: "Setting",
        icon: '<i class="bi bi-sliders"></i>',
        route: "/null",
      },
      // {
      //   title: "Posting",
      //   icon: '<i class="bi bi-stickies"></i>',
      //   route: "/main",
      // },
      {
        title: "Invite friends",
        content: "Content for item #7.",
        icon: '<i class="bi bi-people-fill"></i>',
        route: "/ref",
      },
      // {
      //   title: "Payments",
      //   content: "Content for item #4.",
      //   icon: '<i class="bi bi-wallet2"></i>',
      //   route: "/pay",
      // },
      // {
      //   title: "About us",
      //   icon: '<i class="bi bi-file-earmark-text"></i>',
      //   route: "/aboutUs",
      // },
      {
        title: "Privacy policy",
        icon: '<i class="bi bi-shield-check"></i>',
        route: "/privacy",
      },
      {
        title: "Terms of servises",
        icon: '<i class="bi bi-file-earmark-text-fill"></i>',
        route: "/terms",
      },
      // {
      //   title: "Documentation",
      //   content: "Content for item #6.",
      //   icon: '<i class="bi bi-filetype-doc"></i>',
      //   route: "/doc",
      // },

      {
        title: "Disclaimer",
        content: "Content for item #9.",
        icon: '<i class="bi bi-exclamation-triangle-fill text-danger"></i>',
        route: "/disclaimer",
      },
    ]);

    const handleItemClick = (item, index) => {
      if (item.title === "Setting") {
        showModal.value = true; // Открыть модальное окно
        console.log("Модальное окно открыто");
      } else if (item.route) {
        router.push(item.route); // Перейти по маршруту
      } else {
        console.warn(`No route defined for ${item.title}`);
      }
      activeIndex.value = index;
    };
    const handleTagClick = async (tag) => {
      try {
        popularStore.clearNews();
        await themeStore.fetchNews(tag); // Загружаем новости по тегу
        console.log(`Новости для тега "${tag}" успешно загружены.`);
      } catch (error) {
        console.error(`Ошибка загрузки новостей для тега "${tag}":`, error);
      }
    };
    const closeModal = () => {
      showModal.value = false; // Закрыть модальное окно
      console.log("Модальное окно закрыто");
    };

    // Инициализация темы
    try {
      themeStore.setThemeFromStorage();
    } catch (error) {
      console.error("Ошибка загрузки темы:", error);
    }
    onMounted(() => {
      themeStore.loadSavedTags(); // Загружаем сохранённые теги
      channelStore.loadChannels();
      themeStore.startSyncingSavedTags(); 
    });
    // Данные для аккордеона

    return {
      removeSavedTag,
      savedTags,
      tags,
      sendToTelegram,
      activeChannelId,
      clearNews,
      localNews,
      // news,
      handleTagClick,
      news,
      loadingNews,
      closeModal,
      showModal,
      activeIndex,
      handleItemClick,
      accordionItems,
      themeStore,
      popularStore,
    };
  },
};
</script>

<style lang="css" scoped>
.nav-link {
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: cornflowerblue;
}

.nav-link.active {
  color: cornflowerblue; /* Цвет активной ссылки */
  font-weight: bold;
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
.modal-dialog {
  max-width: 600px;
  margin: 30px auto;
}

.modal-content {
  padding: 20px;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.col-12.col-md-9 {
  order: 2; /* На десктопах содержимое второе */
}

.col-12.col-md-3 {
  order: 1; /* На десктопах сайдбар первый */
}

@media (max-width: 767px) {
  .col-12.col-md-9 {
    order: 1; /* На мобильных содержимое первое */
  }

  .col-12.col-md-3 {
    order: 2; /* На мобильных сайдбар второй */
  }
}

.navbar {
  /* background-color: #ffffff; */
  border-bottom: 1px solid cornflowerblue;
}

/* .navbar-brand {
  font-weight: bold;
  color: cornflowerblue;
} */

/* .navbar-brand:hover {
  color: #0056b3;
} */

.nav-link:hover {
  color: cornflowerblue;
  /* text-decoration: underline; */
}
.accordion-button.active-item {
  background-color: rgba(0, 123, 255, 0.1) !important; /* Светло-синий фон */
  color: cornflowerblue !important; /* Цвет текста */
  font-weight: bold; /* Жирный текст */
  border-left: 4px solid cornflowerblue !important; /* Линия слева */
}

.accordion-button.active-item:hover {
  background-color: rgba(0, 123, 255, 0.2); /* Изменение фона при наведении */
}

input {
  border: none !important;
  box-shadow: none !important;
}

footer a {
  text-decoration: none;
}

footer a:hover {
  text-decoration: underline;
}
.p {
  padding-right: 0px !important;
}
.accordion-button.no-arrow::after {
  display: none !important;
}

.accordion-button[disabled]::after {
  display: none;
}

.fixed-sidebar {
  max-height: 100vh;
  overflow-y: auto;
  position: sticky;
  top: 0;
}

@media (max-width: 767px) {
  .fixed-sidebar {
    position: static;
  }
}

.accordion-button {
  display: flex;
  align-items: center;
}

.card-icon {
  margin-right: 10px;
}

.theme-toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  position: absolute; /* Абсолютное позиционирование */
  top: 10px; /* Отступ сверху */
  right: 0px; /* Отступ справа */
  z-index: 1000; /* Убедитесь, что кнопка поверх контента */
}

.theme-toggle-btn:hover {
  background-color: rgba(214, 247, 32, 0.1);
}

.dark-theme .theme-toggle-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Настройка для мобильных устройств */
@media (max-width: 767px) {
  .theme-toggle-btn {
    top: 65px; /* Отступ ниже кнопки тоггл-меню */
    right: 0px; /* Меньший отступ справа */
  }
}

/* .theme-icon {
transition: transform 0.3s ease;
caret-color: yellow;
} */

.theme-toggle-btn:hover .theme-icon {
  transform: rotate(30deg);
}
.accordion-button::after {
  display: none !important;
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
.nav-link {
  color: var(--bs-body-color);
}
</style>
