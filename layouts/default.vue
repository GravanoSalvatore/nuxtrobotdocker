<template lang="">
  
  <nav class="navbar navbar-expand-lg  mb-4">
    <div class="container-fluid">
      <NuxtLink class="navbar-brand" to="/"><img style="max-width:200px" src="@/assets/img/4vrobot.png" ></NuxtLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/">Home</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/doc">Documentation</NuxtLink>
          </li>
          <!-- <li class="nav-item">
            <NuxtLink class="nav-link" to="/privacy">Privacy Policy</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/terms">Terms of Services</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/ref">Invite Friends</NuxtLink>
          </li> -->
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
                <span>{{ item.title }}</span>
              </button>
            </h2>
          </div>
        </div>
      </div>
      <footer class="py-4">
    <div class="container">
      <div class="row align-items-center">
        <!-- Социальные иконки -->
        <div class="col-md-12 text-center text-md-start mb-3 mb-md-0 mt-4">
          <div class="d-flex justify-content-center justify-content-md-start">
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
        <div class="col-md-12 mb-3 mb-md-0 mt-4">
          <form @submit.prevent="sendFeedback">
            <div class="input-group">
              <input
                type="email"
                class="form-control"
                placeholder="Ваш email"
                aria-label="Email"
                v-model="email"
                required
              />
              <button class="btn-danger1" type="submit">feedback</button>
            </div>
          </form>
        </div>

        <!-- Адрес -->
        <div class="col-md-12 text-center text-md-end mt-4">
          <p class="mb-0 fw-bold"> fourv@gmail.com  4V company.</p>
        </div>
      </div>
    </div>
  </footer>

    </div>
   
    <!-- Правая колонка -->
    <div class="col-12 col-md-9 p" ref="newsContainer">
      <div class="row container p">
        <NuxtPage />
      </div>
    </div>
    <div
class="modal fade show"
id="settingsModal"
tabindex="-1"
aria-labelledby="settingsModalLabel"
aria-hidden="true"
v-show="showModal"
style="display: block; background: rgba(0, 0, 0, 0.5);" 
>
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header" style="background-color:rgba(9, 21, 32, 1">
      <!-- <h5 class="modal-title" id="settingsModalLabel">Settings</h5> -->
      <button
      
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="closeModal"
      ></button>
    </div>
    <div class="modal-body">
      <!-- Ваш компонент -->
      <Setting />
    </div>
  </div>
</div>
</div>


  </div>
   </div>
</template>

<script>
//import set from '../components/Setting.vue'
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useThemeStore } from "~/stores/useThemeStore";
export default {
// components:{set},
data() {
  return {
    email: "",
  };
},
methods: {
  sendFeedback() {
    if (this.email) {
      alert(`Ваш email (${this.email}) принят. Спасибо за обратную связь!`);
      this.email = "";
    }
  },
},

setup() {
  const themeStore = useThemeStore();
  const activeIndex = ref(null);
  const router = useRouter();
  const showModal = ref(false);
  const accordionItems = ref([
    {
      title: "Personal account",

      icon: '<i class="bi bi-person-check-fill"></i>',
    },

    {
      title: "Setting",
      icon: '<i class="bi bi-sliders"></i>',
      route: "/null",
    },
    {
      title: "Posting",
      icon: '<i class="bi bi-tags"></i>',
      route: "/main",
    },
    {
      title: "Invite friends",
      content: "Content for item #7.",
      icon: '<i class="bi bi-people-fill"></i>',
      route: "/ref",
    },
    {
      title: "Payments",
      content: "Content for item #4.",
      icon: '<i class="bi bi-wallet2"></i>',
      route: "/pay",
    },
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
      icon: '<i class="bi bi-exclamation-triangle-fill"></i>',
      route: "/disclaimer",
    },
    
  ]);
  // const handleItemClick = (item, index) => {
  //   // Для Channels и Posting не выполнять навигацию

  //   if (item.route) {
  //     router.push(item.route);
  //   } else {
  //     console.warn(`No route defined for ${item.title}`);
  //   }
  //   activeIndex.value = index;
  // };
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

  // Данные для аккордеона

  return {
    closeModal,
    showModal,
    activeIndex,
    handleItemClick,
    accordionItems,
    themeStore,
  };
},
};
</script>
<style lang="css" scoped>
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

.navbar-brand {
font-weight: bold;
color: cornflowerblue;
}

.navbar-brand:hover {
color: #0056b3;
}

.nav-link {
/* color: #34495e; */
}

.nav-link:hover {
color: cornflowerblue;
text-decoration: underline;
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
</style>
