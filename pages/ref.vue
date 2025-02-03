<template>
    <div class="container mt-5">
      <!-- Заголовок -->
      <h1 class="text-center fw-bold">TON news and more</h1>
      <p class="text-center lead">Latest updates about The Open Network (TON).</p>
  
      <!-- Индикатор загрузки -->
      <div v-if="loading" class="text-center my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
  
      <!-- Ошибка загрузки -->
      <div v-if="error" class="alert alert-danger text-center">
        Failed to load news. Please try again later.
      </div>
  
      <!-- Сетка новостей -->
      <div v-else class="row">
        <div v-for="article in paginatedNews" :key="article.ID" class="col-lg-4 col-md-6 mb-4">
          <div class="card h-100 shadow-sm">
            <img :src="article.IMAGE_URL || 'https://via.placeholder.com/300x200'"
              class="card-img-top"
              alt="news image"
              style="height: 200px; object-fit: cover;"
            />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">
                <a :href="article.URL" target="_blank" class="text-decoration-none">
                  {{ article.TITLE || "No Title Available" }}
                </a>
              </h5>
              <p class="card-text">
                {{ article.BODY ? article.BODY.slice(0, 100) + "..." : "No content available" }}
              </p>
              <p class="text-muted small">
                <img :src="article.SOURCE_DATA?.IMAGE_URL || 'https://via.placeholder.com/35x35'"
                  style="width: 20px; height: 20px; border-radius: 50%;"
                /> {{ article.SOURCE_DATA?.NAME || "Unknown Source" }}
              </p>
              <p class="text-muted small">
                {{ formatDate(article.PUBLISHED_ON) }}
              </p>
              <a :href="article.URL" target="_blank" class="btn btn-primary mt-auto">Read More</a>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Пагинация -->
      <div class="text-center my-4" v-if="news.length > 0">
        <button class="btn btn-outline-primary" @click="loadMore">Load More</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        news: [],
        loading: false,
        error: false,
        visibleCount: 9, // Количество отображаемых новостей
      };
    },
    computed: {
      paginatedNews() {
        return this.news.slice(0, this.visibleCount);
      },
    },
    methods: {
      async fetchNews() {
        this.loading = true;
        this.error = false;
        try {
          const response = await axios.get(
            "https://data-api.ccdata.io/news/v1/article/list?lang=EN&limit=100&categories=TON"
          );
          if (response.data && response.data.Data) {
            this.news = response.data.Data.map((item) => ({
              ID: item.ID,
              TITLE: item.TITLE,
              BODY: item.BODY,
              URL: item.URL,
              IMAGE_URL: item.IMAGE_URL,
              PUBLISHED_ON: item.PUBLISHED_ON,
              SOURCE_DATA: item.SOURCE_DATA || {},
            }));
          } else {
            this.error = true;
          }
        } catch (error) {
          console.error("Ошибка загрузки новостей:", error);
          this.error = true;
        } finally {
          this.loading = false;
        }
      },
      loadMore() {
        this.visibleCount += 9; // Загружаем еще 9 новостей
      },
      formatDate(timestamp) {
        const date = new Date(timestamp * 1000); // Преобразуем Unix timestamp
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
    },
    mounted() {
      this.fetchNews();
    },
  };
  </script>
  
  <style scoped>
  h1 {
    color: #007bff;
  }
  
  /* .card-title a {
    color: #212529;
    transition: color 0.3s ease;
  }
   */
  .card-title a:hover {
    color: #007bff;
  }
  
  .card {
    transition: transform 0.2s ease-in-out;
  }
  
  .card:hover {
    transform: translateY(-5px);
  }
  </style>
  