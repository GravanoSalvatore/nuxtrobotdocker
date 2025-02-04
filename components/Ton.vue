<!-- <template>
    <div class="ton-widget">
    
      <div class="ton-price">
    <strong v-if="price">{{ price }} USD</strong>
        <span v-else>Loading...</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  import axios from "axios";
  
  const price = ref(null);
  let updateInterval = null;
  
  // Функция получения курса TON
  const fetchTonPrice = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd"
      );
      price.value = response.data["the-open-network"].usd;
    } catch (error) {
      console.error("Error fetching TON price:", error);
    }
  };
  
  // Первичная загрузка и обновление курса каждые 30 сек
  onMounted(() => {
    fetchTonPrice();
    updateInterval = setInterval(fetchTonPrice, 30000);
  });
  
  // Очистка интервала при выходе
  onUnmounted(() => {
    clearInterval(updateInterval);
  });
  </script>
  
  <style scoped>
  .ton-widget {
    display: flex;
    align-items: center;
    gap: 10px;
   
    padding: 10px 15px;
    border-radius: 8px;
  }
  
  .ton-logo {
    width: 40px;
    height: 40px;
  }
  
  .ton-price {
    font-size: 16px;
    font-weight: bold;
  }
  </style>
   -->
   <template>
    <div class="ton-widget" v-if="logo && price">
      <img style="border-radius: 50%;" class="ton-logo" :src="logo" alt="TON Logo" />
      <div class="ton-price">
        <span>TON :</span> <strong>{{ price }} USD</strong>
      </div>
    </div>
    <div v-else class="loading">Loading...</div>
  </template>
  
  <script setup>
 
  import { ref, onMounted, onUnmounted } from "vue";
  import axios from "axios";
  
  const price = ref(null);
  const logo = ref(null);
  let updateInterval = null;
  
  // Функция получения курса TON и логотипа
  const fetchTonData = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/the-open-network"
      );
      price.value = response.data.market_data.current_price.usd;
      logo.value = response.data.image.small; // Получаем логотип
    } catch (error) {
      console.error("Error fetching TON data:", error);
    }
  };
  
  // Первичная загрузка и обновление курса каждые 30 сек
  onMounted(() => {
    fetchTonData();
    updateInterval = setInterval(fetchTonData, 30000);
  });
  
  // Очистка интервала при выходе
  onUnmounted(() => {
    clearInterval(updateInterval);
  });
  </script>
  
  <style scoped>
  .ton-widget {
    display: flex;
    align-items: center;
    gap: 10px;
   
    padding: 10px 15px;
    border-radius: 8px;
  }
  
  .ton-logo {
    width: 30px;
    height: 30px;
  }
  
  .ton-price {
    font-size: 12px;
    font-weight: bold;
  }
  
  .loading {
    font-size: 14px;
    color: gray;
  }
  </style>
  