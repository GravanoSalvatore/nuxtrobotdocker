//import { defineStore } from "pinia";
import axios from "axios";

export const useTagStore = defineStore("tagStore", {
  state: () => ({
    query: "",
    tags: [],
    news: [],
    totalTags: 0,
    loading: false,
    sortOption: "popularity",
    progress: 0,
    image: "", // Замените на URL изображения-заглушки
    botToken: useRuntimeConfig().public.botToken,
    
    savedTags: [],
    currentTag: "",
    categories:[],
    selectedCategoryId: null, // ID выбранной категории
    languages: [],
    selectedLanguageId: null, // Новый параметр выбора языка
  
  }),
  
  getters: {
    isTagSaved: (state) => (tagName) => state.savedTags.includes(tagName),
    sortedTags: (state) => {
      return [...state.tags].sort((a, b) => b.popularity - a.popularity);
    },
  },
  actions: {
    async fetchLanguages() {
      try {
        const response = await axios.get("https://4v-news-api.azurewebsites.net/Enums/Languages");
        this.languages = response.data.items; // Загружаем языки
      } catch (error) {
        console.error("Ошибка загрузки языков:", error);
      }
    },
  
    async fetchCategories() {
      console.log("Запрос категорий...");
      try {
        const response = await axios.get("https://4v-news-api.azurewebsites.net/Categories?SiteId=1");
        this.categories = response.data.items;
        console.log("Категории загружены:", this.categories);
      } catch (error) {
        console.error("Ошибка загрузки категорий:", error);
      }
    },
    async searchTags() {
      if (this.query.trim() === "") {
        this.tags = [];
        this.filteredTags = [];
        return;
      }

      try {
        const response = await axios.get("https://4v-news-api.azurewebsites.net/Tags/Search", {
          params: {
            SiteId: 1,
            Page: 1,
            PageSize: 100,
            Query: this.query,
            CategoryId: this.selectedCategoryId || undefined,
            LanguageId: this.selectedLanguageId || undefined, // Фильтрация по языку
          },
        });

        this.tags = response.data.items;
        this.filterTagsByLanguage(); // Фильтруем после загрузки
      } catch (error) {
        console.error("Ошибка при поиске тегов:", error);
      }
    },

    // Фильтрация тегов по выбранному языку
    filterTagsByLanguage() {
      if (!this.selectedLanguageId) {
        this.filteredTags = this.tags; // Показываем все теги, если язык не выбран
      } else {
        this.filteredTags = this.tags.filter(tag => tag.languageId === this.selectedLanguageId);
      }
    },
  
    
    async fetchNews(tagName) {
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

        const newItems = response.data.items;

        // Проверяем новые новости
        const newNews = newItems.filter(
          (item) => !this.news.some((existing) => existing.id === item.id)
        );

        this.news = newItems;

        // Если автопилот включён и есть новые новости
        if (this.isAutopilotEnabled && newNews.length > 0) {
          newNews.forEach((newsItem) => {
            this.sendToTelegram(newsItem, this.activeChannelId);
          });
        }
      } catch (error) {
        console.error("Ошибка при получении новостей:", error); // Исправлено логирование
      }
    },

    sendToTelegram(item, chatId) {
      const data = {
        chat_id: chatId,
        text: `<b>${item.title}</b>\n${
          item.description ? item.description : ""
        }\n\n${item.content ? item.content : ""}\n<a href="${
          item.url
        }">Читать полностью</a>`,
        parse_mode: "HTML", // Исправлено форматирование
      };

      axios
        .post(`https://api.telegram.org/bot${this.botToken}/sendMessage`, data) // Исправлен запрос
        .then((response) => {
          console.log(
            "Сообщение успешно отправлено в телеграм:",
            response.data
          );
          alert("Сообщение успешно отправлено в телеграм");
        })
        .catch((error) => {
          console.error(
            "Ошибка при отправке сообщения в телеграм:",
            error.response.data
          );
          alert(
            "Ошибка при отправке сообщения в телеграм: " +
              error.response.data.description
          );
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


