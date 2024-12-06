<template lang="">
  <div class="">
    <div class="containe">
      <NuxtLink style="text-decoration: none; margin-left:" to="/">
        <h5
          style="color: cornflowerblue; padding-left: 20px"
          class="fw-bold pointer my-4"
        >
          <!-- <img
            src="https://cdn.pixabay.com/photo/2016/12/13/21/20/alien-1905155_640.png"
            style="width: 50px"
          /> -->
          4VROBOT<i class="bi bi-telegram"></i>N
        </h5>
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
      <svg
        v-if="!themeStore.isDark"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="yellow"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="theme-icon"
      >
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="theme-icon"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </button>

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
                  @click="handleItemClick(item, index)"
                  class="accordion-button pointer"
                  :class="{
                    collapsed:
                      item.title === 'Channels' || item.title === 'Posting',
                    'no-arrow': !(
                      item.title === 'Channels' || item.title === 'Posting'
                    ),
                  }"
                  type="button"
                  :data-bs-toggle="
                    item.title === 'Channels' || item.title === 'Posting'
                      ? 'collapse'
                      : ''
                  "
                  :data-bs-target="
                    item.title === 'Channels' || item.title === 'Posting'
                      ? '#flush-collapse' + index
                      : ''
                  "
                  :aria-controls="
                    item.title === 'Channels' || item.title === 'Posting'
                      ? 'flush-collapse' + index
                      : ''
                  "
                >
                  <div class="card-icon me-2" v-html="item.icon"></div>
                  <span>{{ item.title }}</span>
                </button>
              </h2>
              <!-- Контент только для "Channels" и "Posting" -->
              <div
                v-if="item.title === 'Channels' || item.title === 'Posting'"
                :id="'flush-collapse' + index"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  {{ item.content}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Правая колонка -->
      <div class="col-12 col-md-9 p" ref="newsContainer">
        <div class="row container p">
          <NuxtPage />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useThemeStore } from "~/stores/useThemeStore";
export default {
  setup() {
    const router = useRouter();
    const accordionItems = ref([
      {
        title: "Personal account",
       
        icon: '<i class="bi bi-person-check-fill"></i>',
      },
     
      {
        title: "Setting",
        icon: '<i class="bi bi-sliders"></i>',
        route: "/setting",
      },
      {
        title: "Category",
        icon: '<i class="bi bi-tags"></i>',
        route: "/category",
      },
      {
        title: "Popular",
        icon: '<i class="bi bi-star"></i>',
        route: "/popular",
      },
      {
        title: "Search",
        icon: '<i class="bi bi-search"></i>',
        route: "/tags",
      },
      {
        title: "Editor",
        icon: '<i class="bi bi-pencil"></i>',
        route: "/editor",
      },
      // {
      //   title: "Channels",
      //   content: "Content for item #4.",
      //   icon: '<i class="bi bi-chat-square-text"></i>',
      // },
      // {
      //   title: "Posting",
      //   icon: '<i class="bi bi-stickies"></i>',
        
      
      // },
      {
        title: "Payments",
        content: "Content for item #4.",
        icon: '<i class="bi bi-wallet2"></i>',
        route: "/pay",
      },
      {
        title: "About us",
        icon: '<i class="bi bi-file-earmark-text"></i>',
        route: "/aboutUs",
      },
      {
        title: "Privacy policy",
        icon: '<i class="bi bi-shield-check"></i>',
        route: "/privacy",
      },
      {
        title: "Documentation",
        content: "Content for item #6.",
        icon: '<i class="bi bi-filetype-doc"></i>',
        route: "/doc",
      },
      {
        title: "Invite friends",
        content: "Content for item #7.",
        icon: '<i class="bi bi-people-fill"></i>',
        route: "/ref",
      },
      {
        title: "Disclaimer",
        content: "Content for item #9.",
        icon: '<i class="bi bi-exclamation-triangle-fill"></i>',
        route: "/disclaimer",
      },
      {
        title: "Feedback",
        content: "Content for item #10.",
        icon: '<i class="bi bi-chat-text-fill"></i>',
        route: "/feedback",
      },
    ]);
    const handleItemClick = (item, index) => {
      // Для Channels и Posting не выполнять навигацию
      if (item.title !== "Channels" && item.title !== "Posting") {
        if (item.route) {
          router.push(item.route);
        } else {
          console.warn(`No route defined for ${item.title}`);
        }
      }
    };
    const themeStore = useThemeStore();

    // Инициализация темы
    try {
      themeStore.setThemeFromStorage();
    } catch (error) {
      console.error("Ошибка загрузки темы:", error);
    }

    // Данные для аккордеона

    return {
      handleItemClick,
      accordionItems,
      themeStore,
    };
  },
};
</script>
<style lang="css" scoped>
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
  top: 2px; /* Отступ сверху */
  right: 10px; /* Отступ справа */
  z-index: 1000; /* Убедитесь, что кнопка поверх контента */
}

.theme-toggle-btn:hover {
  background-color: rgba(214, 247, 32, 0.1);
}

.dark-theme .theme-toggle-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.theme-icon {
  transition: transform 0.3s ease;
  caret-color: yellow;
}

.theme-toggle-btn:hover .theme-icon {
  transform: rotate(30deg);
}
</style>
