<template>
  <div class="container">
    <!-- Заголовок -->
    <h4 class="text-center fw-bold">
      <span style="color:cornflowerblue;font-size:32px">TON</span> news and more
    </h4>

    <!-- Индикатор загрузки -->
    <div v-if="loading" class="text-center my-5">
      <svg 
      
      xmlns="http://www.w3.org/2000/svg" 
      width="52" 
      height="52" 
      viewBox="0 0 24 24">
      <path 
      fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)"><animateTransform id="svgSpinnersPulseRingsMultiple0" attributeName="transform" begin="0;svgSpinnersPulseRingsMultiple2.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/><animateTransform additive="sum" attributeName="transform" begin="0;svgSpinnersPulseRingsMultiple2.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/><animate attributeName="opacity" begin="0;svgSpinnersPulseRingsMultiple2.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></path><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)"><animateTransform id="svgSpinnersPulseRingsMultiple1" attributeName="transform" begin="svgSpinnersPulseRingsMultiple0.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/><animateTransform additive="sum" attributeName="transform" begin="svgSpinnersPulseRingsMultiple0.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/><animate attributeName="opacity" begin="svgSpinnersPulseRingsMultiple0.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></path><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)"><animateTransform id="svgSpinnersPulseRingsMultiple2" attributeName="transform" begin="svgSpinnersPulseRingsMultiple0.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/><animateTransform additive="sum" attributeName="transform" begin="svgSpinnersPulseRingsMultiple0.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/><animate attributeName="opacity" begin="svgSpinnersPulseRingsMultiple0.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></path></svg>
    </div>

    <!-- Ошибка загрузки -->
    <div v-if="error" class="alert alert-danger text-center">
      Failed to load news. Please try again later.
    </div>

    <!-- Сетка новостей -->
    <div v-else class="row">
      <div v-for="article in paginatedNews" :key="article.ID" class="col-lg-12 col-md-12 mb-4">
        <div class="card h-100 shadow-sm">
          <div class="card-header d-flex align-items-center">
            <img :src="article.IMAGE_URL || 'https://via.placeholder.com/100x100'"
              class="news-image me-3"
              alt="news image"
            />
            <h5 class="card-title m-0 fw-bold">
              <a style="color:cornflowerblue" :href="article.URL" target="_blank" class="text-decoration-none">
                {{ article.TITLE || "No Title Available" }}
              </a>
            </h5>
          </div>
          <div class="card-body">
            <p class="card-text">
              {{ article.BODY ? article.BODY : "No content available" }}
            </p>
            <p class="text-muted small">
              <img :src="article.SOURCE_DATA?.IMAGE_URL || 'https://via.placeholder.com/35x35'"
                class="source-logo"
              />
              {{ article.SOURCE_DATA?.NAME || "Unknown Source" }}
            </p>
            <p class="text-muted small">
              {{ formatDate(article.PUBLISHED_ON) }}
            </p>
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
      visibleCount: 9,
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
      this.visibleCount += 9;
    },
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000);
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
.card-header {
  display: flex;
  align-items: center;
  padding: 10px;
  /* background-color: #f8f9fa; */
}
.news-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
}
.source-logo {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
@media screen  and (max-width: 500px) {
  a{
font-size: 12px;
}
}

</style>
