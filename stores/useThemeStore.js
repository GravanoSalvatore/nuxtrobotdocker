// export const useThemeStore = defineStore('theme', {
//   state: () => ({
//     isDark: false,
//   }),
//   actions: {
//     toggleTheme() {
//       this.isDark = !this.isDark;
//       document.body.classList.toggle('dark-theme', this.isDark);
//       document.body.classList.toggle('light-theme', !this.isDark);
//       // Добавляем установку темы для Bootstrap
//       document.documentElement.setAttribute('data-bs-theme', this.isDark ? 'dark' : 'light');
      
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
//       }
//     },
//     setThemeFromStorage() {
//       if (typeof window !== 'undefined') {
//         const storedTheme = localStorage.getItem('theme');
//         if (storedTheme === 'dark') {
//           this.isDark = true;
//           document.body.classList.add('dark-theme');
//           document.body.classList.remove('light-theme');
//           document.documentElement.setAttribute('data-bs-theme', 'dark');
//         } else {
//           this.isDark = false;
//           document.body.classList.add('light-theme');
//           document.body.classList.remove('dark-theme');
//           document.documentElement.setAttribute('data-bs-theme', 'light');
//         }
//       }
//     }
//   }
// });
//import { defineStore } from "pinia";
import axios from "axios";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    isDark: false,
    tags: [],
    news: [],
    loadingTags: false,
    loadingNews: false,
    loading: false,
    sortOption: "popularity",
    progress: 0,
    image: "", // Замените на URL изображения-заглушки
    botToken: "6903896787:AAG-rPGukp422cw17k4y17UsJUiDMl5tdbc", // Замените на ваш токен бота
    savedTags: [],
    currentTag: "",
  }),

  getters: {
    isTagSaved(state) {
      return state.savedTags.includes(state.currentTag);
    },
    sortedTags(state) {
      if (!state.tags || state.tags.length === 0) {
        console.error("Нет данных для сортировки тегов.");
        return [];
      }
      if (state.sortOption === "popularity") {
        return [...state.tags].sort((a, b) => b.popularity - a.popularity);
      } else {
        return [...state.tags].sort((a, b) => a.name.localeCompare(b.name));
      }
    },
  },

  actions: {
    toggleTheme() {
      this.isDark = !this.isDark;
      document.body.classList.toggle("dark-theme", this.isDark);
      document.body.classList.toggle("light-theme", !this.isDark);
      document.documentElement.setAttribute("data-bs-theme", this.isDark ? "dark" : "light");

      if (typeof window !== "undefined") {
        localStorage.setItem("theme", this.isDark ? "dark" : "light");
      }
    },

    setThemeFromStorage() {
      if (typeof window !== "undefined") {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
          this.isDark = true;
          document.body.classList.add("dark-theme");
          document.body.classList.remove("light-theme");
          document.documentElement.setAttribute("data-bs-theme", "dark");
        } else {
          this.isDark = false;
          document.body.classList.add("light-theme");
          document.body.classList.remove("dark-theme");
          document.documentElement.setAttribute("data-bs-theme", "light");
        }
      }
    },

    // loadSavedTags() {
    //   const saved = localStorage.getItem("savedTags");
    //   if (saved) {
    //     this.savedTags = JSON.parse(saved);
    //   }
    // },

    // toggleSaveTag(tag) {
    //   if (this.isTagSaved) {
    //     this.savedTags = this.savedTags.filter((savedTag) => savedTag !== tag);
    //     localStorage.setItem("savedTags", JSON.stringify(this.savedTags));
    //     console.log("Тег удалён:", tag);
    //   } else {
    //     this.savedTags.push(tag);
    //     localStorage.setItem("savedTags", JSON.stringify(this.savedTags));
    //     console.log("Тег сохранён:", tag);
    //   }
    // },
    loadSavedTags() {
      const saved = localStorage.getItem('savedTags');
      this.savedTags = saved ? JSON.parse(saved) : [];
    },

    saveTagsToLocalStorage() {
      localStorage.setItem('savedTags', JSON.stringify(this.savedTags));
    },

    toggleSaveTag(tag) {
      if (this.savedTags.includes(tag)) {
        this.savedTags = this.savedTags.filter((savedTag) => savedTag !== tag);
      } else {
        this.savedTags.push(tag);
      }
      this.saveTagsToLocalStorage();
    },

    startSyncingSavedTags() {
      // Периодически обновляем данные из localStorage
      setInterval(() => {
        const saved = localStorage.getItem('savedTags');
        const parsed = saved ? JSON.parse(saved) : [];
        if (JSON.stringify(parsed) !== JSON.stringify(this.savedTags)) {
          this.savedTags = parsed; // Обновляем теги из localStorage
          console.log('Теги синхронизированы из localStorage:', this.savedTags);
        }
      }, 5000); // Интервал в 5 секунд
    },
    
    async fetchTags() {
      this.loading = true;
      this.tags = [];
      this.progress = 0;

      try {
        let page = 1;
        let totalFetched = 0;
        const pageSize = 100;
        const maxTags = 1000;

        while (totalFetched < maxTags) {
          const response = await axios.get(
            `https://4v-news-api.azurewebsites.net/Tags/Search`,
            {
              params: {
                SiteId: 1,
                Page: page,
                PageSize: pageSize,
                Query: this.query,
              },
            }
          );

          const fetchedTags = response.data.items;
          this.tags.push(...fetchedTags);
          totalFetched += fetchedTags.length;

          if (fetchedTags.length < pageSize) {
            break;
          }

          page++;
        }

        this.progress = 100;
      } catch (error) {
        console.error("Ошибка при поиске тегов:", error);
        this.tags = [];
      } finally {
        this.loading = false;
      }
    },

    async fetchNews(tagName) {
      this.loadingNews = true;
      this.currentTag = tagName;
      try {
        const response = await axios.get(
          "https://4v-news-api.azurewebsites.net/News",
          {
            params: {
              SiteId: 1,
              Tags: tagName,
              Page: 1,
              PageSize: 100,
            },
          }
        );
        this.news = response.data.items || [];
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
        this.news = [];
      } finally {
        this.loadingNews = false;
      }
    },

    sendToTelegram(item, chatId) {
      if (!chatId) {
        console.error("chatId отсутствует!");
        return;
      }

      const data = {
        chat_id: chatId,
        text: `*${item.title}*\n\n${item.content}\n\n[Читать далее](${item.url})`,
        parse_mode: "Markdown",
      };

      axios
        .post(`https://api.telegram.org/bot${this.botToken}/sendMessage`, data)
        .then((response) => {
          alert("Новость успешно отправлена в Telegram!");
          console.log("Сообщение успешно отправлено в телеграм:", response.data);
        })
        .catch((error) => {
          console.error("Ошибка при отправке сообщения в телеграм:", error);
        });
    },

    clearNews() {
      this.news = [];
    },

    formatDateTime(dateTime) {
      const date = new Date(dateTime);
      return date.toLocaleString();
    },

    updateSortOption(option) {
      this.sortOption = option;
    },

    smoothProgress(targetValue) {
      const step = () => {
        if (this.progress < targetValue) {
          this.progress += 1;
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    },

    scrollToTop(tagsList) {
      if (tagsList) {
        tagsList.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },
  },
});
