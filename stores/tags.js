import { defineStore } from "pinia";
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
    botToken: "6903896787:AAG-rPGukp422cw17k4y17UsJUiDMl5tdbc", // Замените на ваш токен бота
    savedTags: [],
    currentTag: "",
  }),
  getters: {
    isTagSaved: (state) => (tagName) => state.savedTags.includes(tagName),
    sortedTags: (state) => {
      return [...state.tags].sort((a, b) => b.popularity - a.popularity);
    },
  },
  actions: {
    // loadSavedTags() {
    //   const saved = localStorage.getItem("savedTags");
    //   if (saved) {
    //     this.savedTags = JSON.parse(saved); // Загружаем теги в хранилище
    //   }
    // },
    // toggleSaveTag(tagName) {
    //   if (this.savedTags.includes(tagName)) {
    //     // Если тег уже сохранён, удаляем его
    //     this.savedTags = this.savedTags.filter((tag) => tag !== tagName);
    //     console.log(`Тег удалён: ${tagName}`);
    //   } else {
    //     // Если тега нет, добавляем его
    //     this.savedTags.push(tagName);
    //     console.log(`Тег сохранён: ${tagName}`);
    //   }

    //   // Сохраняем обновлённый список в localStorage
    //   localStorage.setItem("savedTags", JSON.stringify(this.savedTags));
    // },

    async searchTags() {
      if (this.query.trim() === "") {
        this.tags = [];
        this.news = [];
        return;
      }

      this.loading = true;
      this.tags = [];
      this.progress = 0;

      try {
        let page = 1;
        let totalFetched = 0;
        const pageSize = 100; // Размер страницы
        const maxTags = 1000; // Максимальное количество тегов, которое нужно получить

        while (totalFetched < maxTags) {
          const response = await axios.get(
            `https://4v-news-api.azurewebsites.net/Tags/Search`, // Исправлен URL
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
          this.tags.push(...fetchedTags); // Добавляем полученные теги в массив
          totalFetched += fetchedTags.length; // Обновляем общее количество полученных тегов

          if (fetchedTags.length < pageSize) {
            // Если меньше, чем размер страницы, значит, больше тегов нет
            break;
          }

          page++; // Переходим к следующей странице
        }

        this.totalTags = totalFetched; // Обновляем общее количество тегов
        this.progress = 100; // Устанавливаем прогресс на 100%
      } catch (error) {
        console.error("Ошибка при поиске тегов:", error); // Исправлено логирование
        this.tags = [];
      } finally {
        this.loading = false;
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


