<template>
    <div class="container">
    
  </div>
  </template>
  
  <script>
  export default {
    computed: {
      cardGroups() {
        const cardGroups = [];
        for (let i = 0; i < this.cards.length; i += 3) {
          cardGroups.push(this.cards.slice(i, i + 3));
        }
        return cardGroups;
      },
    },
    setup() {},
    data() {
      return {
        counter: 888,
        intervalId: null,
        // isMobile: window.innerWidth < 992,
        scrollPosition: 0,
        customIconList: ["blocks-wave","3-dots-move","blocks-shuffle-3","blocks-scale", "wind-toy", "pulse", "rotate-cube","pulse-3","tadpole","clock"], // Добавьте сюда новые идентификаторы
        // cards: [
        //   {
        //     title: "EDITOR",
        //     description: "4V.COIN",
        //     icon: 'blocks-shuffle-3',
        //     route: "/editor",
        //   },
        //   // {
        //   //   title: "Categories",
        //   //   description: "4V.WEB 3.0",
        //   //   icon: '<i class="bi bi-tags"></i>',
        //   //   route: "/category",
        //   // },
        //   {
        //     title: "Categories",
        //     description: "4V.WEB 3.0",
        //     icon: "blocks-scale", // Уникальный идентификатор для иконки <Icon>
        //     route: "/category",
        //   },
        //   {
        //     title: "Popular",
        //     description: "4V.DEX",
        //     icon: "wind-toy",
        //     route: "/popular",
        //   },
        //   {
        //     title: "Search tags",
        //     description: "4V.ROBOT",
        //     icon: 'pulse-3',
        //     route: "/tags",
        //   },
        //   // {
        //   //   title: "Editor",
        //   //   description: "4V.CRYPTO",
        //   //   icon: '<i class="bi bi-pencil"></i>',
        //   //   route: "/editor",
        //   // },
  
        //   // {
        //   //   title: "Created & selected",
        //   //   description: "DISTRIBUTOR (Automatic Content Distributor)",
        //   //   icon: '<i class="bi bi-tags-fill"></i>',
        //   //   route: "/selected",
        //   // },
        //   {
        //     title: "Setting",
        //     description: "CONTENTWISE (Content Wise Engine)",
        //     icon: '3-dots-move',
        //     route: "/setting",
        //   },
        //   {
        //     title: "Create tag",
        //     description: "4V.COIN",
        //     icon: 'blocks-wave',
        //     route: "/create",
        //   },
        //   // {
        //   //   title: "Payment",
        //   //   description: "Payment",
        //   //   icon: '<i class="bi bi-wallet2"></i>',
        //   //   route: "/pay",
        //   // },
        //   // {
        //   //   title: "Documentation",
        //   //   description: "CONTENTWISE (Content Wise Engine)",
        //   //   icon: '<i class="bi bi-filetype-doc"></i>',
        //   //   route: "/doc",
        //   // },
        //   // {
        //   //   title: "Invite friends",
        //   //   description: "4V.COIN",
        //   //   icon: '<i class="bi bi-people-fill"></i>',
        //   //   route: "/ref",
        //   // },
        //   // {
        //   //   title: "Feedback",
        //   //   description: "Payment",
        //   //   icon: '<i class="bi bi-chat-text-fill"></i>',
        //   //   route: "/feedback",
        //   // },
        //   // { title: 'SMARTSHARE (Intelligent Sharing Protocol)', description: 'SMARTSHARE (Intelligent Sharing Protocol)' },
        //   // { title: '4V.DEFI', description: '4V.DEFI' },
        //   // { title: 'GLIDE(Global Localized Intelligent Dynamic Engine)', description: 'GLIDE(Global Localized Intelligent Dynamic Engine)' },
        //   // { title: '4V.NEWS', description: '4V.NEWS' },
        // ],
        cards: [
        { title: "EDITOR", description: "4V.COIN", icon: "blocks-shuffle-3", route: "/main/editor" },
        { title: "CATEGORIES", description: "4V.WEB 3.0", icon: "blocks-scale", route: "/main/category" },
        { title: "POPULAR", description: "4V.DEX", icon: "wind-toy", route: "/main/popular" },
        { title: "SEARCH TAG", description: "4V.ROBOT", icon: "pulse-3", route: "/main/tags" },

        { title: "CREATE TAG", description: "4V.COIN", icon: "tadpole", route: "/main/editor" },
        { title: "HISTORY", description: "4V.WEB 3.0", icon: "clock", route: "/main/category" },
        
        
        // { title: "Popular", description: "4V.DEX", icon: "wind-toy", route: "/main/popular" },
        // { title: "Search tags", description: "4V.ROBOT", icon: "pulse-3", route: "/main/tags" },
        // { title: "Setting", description: "CONTENTWISE", icon: "3-dots-move", route: "/main/setting" },
        // { title: "Create tag", description: "4V.COIN", icon: "blocks-wave", route: "/main/create" },
      ],
        colors: [
          "aqua",
          "red",
          "green",
          "blue",
          "purple",
          "orange",
          "yellow",
          "pink",
          "brown",
          "rgb(31, 153, 234)",
          "magenta",
          "lime",
        ],
      };
    },
    mounted() {},
    methods: {
      navigateToRoute(route) {
        this.$router.push(route);
      },
      // startCounter() {
      //   this.intervalId = setInterval(() => {
      //     this.counter += 1;
      //   }, 100);
      // },
      getColor(index) {
        return this.colors[index % this.colors.length];
      },
      // checkWindowSize() {
      //   this.isMobile = typeof window !== "undefined" && window.innerWidth < 992;
      // },
      handleScroll() {
        this.scrollPosition = window.scrollY;
      },
      shouldShowShadow(index) {
        const cardPosition = index * 200;
        return this.scrollPosition > cardPosition;
      },
      hasScrolledPastLine(index) {
        const linePosition = (index + 1) * 150; // Позиция для появления линии
        return this.scrollPosition > linePosition;
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    /* border: 2px solid rgb(15, 43, 58); */
    border-radius: 15px;
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Плавный переход для изменения размеров и тени */
    /* box-shadow: inset 15px 15px 30px -10px rgb(1, 114, 180); */
  }
  
  .card:hover {
    transform: scale(1.05); /* Легкое увеличение карточки */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .hover-content {
    transition: color 0.3s ease-in-out, transform 0.3s ease-in-out; /* Анимация текста */
  }
  
  .card:hover .hover-content {
    transform: translateY(-5px); /* Легкое поднятие текста */
  }
  
  .card-icon {
    font-size: 24px; /* Размер иконки */
    color: cornflowerblue; /* Цвет иконки */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* .card {
      border-radius: 15px;
    box-shadow: 
                inset -5px -5px 15px rgba(255, 255, 255, 0.5);
    transition: box-shadow 0.3s ease-in-out;
    } */
  
  /* .scroll-shadow {
      box-shadow: inset 15px 15px 30px -10px var(--shadow-color);
    } */
  
  /* .hover-content:hover .card-title,
    .hover-content:hover .card-text {
      color: white;
    } */
  
  .dark-theme {
    --card-bg: #2c2c2c; /* Темный фон для карточек */
    --card-bg-hover: #3c3c3c; /* Темный фон при наведении */
  }
  
  .light-theme {
    --card-bg: #e0e0e0; /* Светлый фон для карточек */
    --card-bg-hover: #d6d6d6; /* Светлый фон при наведении */
  }
  
  .card-text,
  .card-title {
    /* font-family: Verdana, Geneva, Tahoma, sans-serif; */
    transition: color 0.3s ease;
    /* color: rgba(255, 255, 255, 0.8); */
  }
  
  /* Линия разряда между строками */
  .lightning-line {
    height: 2px;
    width: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.8),
      transparent
    );
    opacity: 0;
    transform: scaleX(0);
    transition: opacity 0.6s ease, transform 0.6s ease;
    margin: 10px 0;
  }
  
  .visible-line {
    opacity: 1;
    transform: scaleX(1);
  }
  
  /* Динамическое создание стилей для каждой карточки */
  .hover-card-0:hover {
    --shadow-color: aqua;
  }
  .hover-card-1:hover {
    --shadow-color: red;
  }
  .hover-card-2:hover {
    --shadow-color: green;
  }
  .hover-card-3:hover {
    --shadow-color: blue;
  }
  .hover-card-4:hover {
    --shadow-color: purple;
  }
  .hover-card-5:hover {
    --shadow-color: orange;
  }
  .hover-card-6:hover {
    --shadow-color: yellow;
  }
  .hover-card-7:hover {
    --shadow-color: pink;
  }
  .hover-card-8:hover {
    --shadow-color: brown;
  }
  .hover-card-9:hover {
    --shadow-color: rgb(31, 153, 234);
  }
  .hover-card-10:hover {
    --shadow-color: magenta;
  }
  .hover-card-11:hover {
    --shadow-color: lime;
  }
  
  @media screen and (max-width: 1000px) {
    .scroll-shadow.hover-card-0 {
      --shadow-color: aqua;
    }
    .scroll-shadow.hover-card-1 {
      --shadow-color: red;
    }
    .scroll-shadow.hover-card-2 {
      --shadow-color: green;
    }
    .scroll-shadow.hover-card-3 {
      --shadow-color: blue;
    }
    .scroll-shadow.hover-card-4 {
      --shadow-color: purple;
    }
    .scroll-shadow.hover-card-5 {
      --shadow-color: orange;
    }
    .scroll-shadow.hover-card-6 {
      --shadow-color: yellow;
    }
    .scroll-shadow.hover-card-7 {
      --shadow-color: pink;
    }
    .scroll-shadow.hover-card-8 {
      --shadow-color: brown;
    }
    .scroll-shadow.hover-card-9 {
      --shadow-color: rgb(31, 153, 234);
    }
    .scroll-shadow.hover-card-10 {
      --shadow-color: magenta;
    }
    .scroll-shadow.hover-card-11 {
      --shadow-color: lime;
    }
    /* .card-text, .card-title { color: rgba(255, 255, 255, 0.8); } */
  }
  </style>
  