
   <template>
    <div class="container d-flex justify-content-center">
      <div class="card p-4 shadow-sm" style="max-width: 400px; width: 100%;">
        <h4 v-if="!isAuthenticated" class="text-center mb-3">Авторизация</h4>
  
        <form v-if="!isAuthenticated" @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input v-model="email" type="email" id="email" class="form-control" required />
          </div>
  
          <div class="mb-3 position-relative">
            <label for="password" class="form-label">Пароль</label>
            <input 
              v-model="password" 
              :type="showPassword ? 'text' : 'password'" 
              id="password" 
              class="form-control" 
              required 
            />
            <button 
              type="button" 
              class="btn btn-outline-secondary toggle-password-btn" 
              @click="togglePassword"
            >
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
  
          <button type="submit" class="btn btn-primary w-100" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm"></span>
            <span v-else>Войти</span>
          </button>
        </form>
  
        <div v-if="isAuthenticated" class="alert text-center mt-3 ">
          Welcome {{ username }}!<br/>
          <button class="btn-danger  mt-2" @click="logout">Выйти</button>
        </div>
  
        <div v-if="errorMessage" class="alert alert-danger mt-3">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const errorMessage = ref('')
  const username = ref('')
  const isAuthenticated = ref(false)
  const showPassword = ref(false)
  
  // Проверяем localStorage только в браузере
  onMounted(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      username.value = localStorage.getItem('username') || ''
      isAuthenticated.value = !!localStorage.getItem('AuthToken')
    }
  })
  
  const login = async () => {
    loading.value = true
    errorMessage.value = ''
    
    console.log('[LOGIN] Начало авторизации', { email: email.value, password: password.value })
  
    try {
      const response = await fetch(`https://4v-news-api.azurewebsites.net/Account/Login?Email=${encodeURIComponent(email.value)}&Password=${encodeURIComponent(password.value)}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      })
  
      if (!response.ok) {
        throw new Error(await response.text())
      }
  
      const data = await response.json()
      
      if (data.isSuccess) {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('AuthToken', data.token)
          localStorage.setItem('username', email.value)
        }
        username.value = email.value
        isAuthenticated.value = true
      } else {
        errorMessage.value = 'Неверные данные!'
      }
    } catch (error) {
      errorMessage.value = 'Ошибка сети или сервера'
      console.error('[LOGIN] Ошибка:', error)
    } finally {
      loading.value = false
    }
  }
  
  const logout = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('AuthToken')
      localStorage.removeItem('username')
    }
    isAuthenticated.value = false
    username.value = ''
  }
  
  const togglePassword = () => {
    showPassword.value = !showPassword.value
  }
  </script>
  
  <style scoped>
  .card {
    border-radius: 8px;
  }
  
  .btn-outline-secondary {
    border: none;
    background: transparent;
  }
  
  .btn-outline-secondary:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  
  .toggle-password-btn {
    position: absolute;
    right: 0;
    top: 0;
  }
  </style>
   
  
  
  
   <!-- <template>
    <div class="container d-flex justify-content-center">
      <div class="card p-4 shadow-sm" style="max-width: 400px; width: 100%;">
        <h4 v-if="!isAuthenticated" class="text-center mb-3">Авторизация</h4>
  
        <form v-if="!isAuthenticated" @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input v-model="email" type="email" id="email" class="form-control" required />
          </div>
  
          <div class="mb-3 position-relative">
            <label for="password" class="form-label">Пароль</label>
            <input 
              v-model="password" 
              :type="showPassword ? 'text' : 'password'" 
              id="password" 
              class="form-control" 
              required 
            />
            <button 
              type="button" 
              class="btn btn-outline-secondary toggle-password-btn" 
              @click="togglePassword"
            >
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
  
          <button type="submit" class="btn btn-primary w-100" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm"></span>
            <span v-else>Войти</span>
          </button>
        </form>
  
        <div v-if="isAuthenticated" class="text-center mt-3">
          <div class="alert">
            Добро пожаловать, {{ username }}!<br />
          </div>
  
         
          <button class="btn btn-success w-100" :disabled="loadingAutoPost" @click="autoPost">
            <span v-if="loadingAutoPost" class="spinner-border spinner-border-sm"></span>
            <span v-else>Автопилот</span>
          </button>
  
          <button class="btn btn-danger w-100 mt-2" @click="logout">Выйти</button>
        </div>
  
        <div v-if="errorMessage" class="alert alert-danger mt-3">
          {{ errorMessage }}
        </div>
  
        <div v-if="autoPostMessage" class="alert alert-info mt-3">
          {{ autoPostMessage }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios';



  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const loadingAutoPost = ref(false)
  const errorMessage = ref('')
  const autoPostMessage = ref('')
  const username = ref('')
  const isAuthenticated = ref(false)
  const showPassword = ref(false)
  
  // Проверяем localStorage и куки
  onMounted(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      username.value = localStorage.getItem('username') || ''
      isAuthenticated.value = !!localStorage.getItem('AuthToken')
    }
  })
  
  // Авторизация
  const login = async () => {
    loading.value = true
    errorMessage.value = ''
    
    console.log('[LOGIN] Начало авторизации', { email: email.value, password: password.value })
  
    try {
      const response = await fetch(`https://4v-news-api.azurewebsites.net/Account/Login?Email=${encodeURIComponent(email.value)}&Password=${encodeURIComponent(password.value)}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      })
  
      if (!response.ok) {
        throw new Error(await response.text())
      }
  
      const data = await response.json()
      
      if (data.isSuccess) {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('AuthToken', data.token)
          localStorage.setItem('username', email.value)
        }
        username.value = email.value
        isAuthenticated.value = true
      } else {
        errorMessage.value = 'Неверные данные!'
      }
    } catch (error) {
      errorMessage.value = 'Ошибка сети или сервера'
      console.error('[LOGIN] Ошибка:', error)
    } finally {
      loading.value = false
    }
  }
  
  // Автопилот (POST-запрос)
  const autoPost = async () => {
  loadingAutoPost.value = true;
  autoPostMessage.value = '';
  errorMessage.value = '';

  try {
    console.log('[AUTOPOST] Отправка запроса...');

    // Получаем токен из localStorage (или куки, если доступно)
    const token = localStorage.getItem('AuthToken');

    if (!token) {
      throw new Error('Токен не найден! Пожалуйста, авторизуйтесь.');
    }

    const response = await axios.post(
      'https://4v-news-api.azurewebsites.net/AutoPosting',
      {
        TelegramChatId: -1002414188397,
        TagIds: [7] // Передаём ID как массив
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // 🔥 Передаём токен
        },
        withCredentials: true // 🔥 Передаём куки вместе с запросом
      }
    );

    autoPostMessage.value = response.data.message || 'Успешно отправлено!';
  } catch (error) {
    errorMessage.value = 'Ошибка автопостинга: ' + (error.response?.data || error.message);
    console.error('[AUTOPOST] Ошибка:', error);
  } finally {
    loadingAutoPost.value = false;
  }
};



  
  // Выход
  const logout = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('AuthToken')
      localStorage.removeItem('username')
    }
    isAuthenticated.value = false
    username.value = ''
  }
  
  // Переключение пароля
  const togglePassword = () => {
    showPassword.value = !showPassword.value
  }
  </script>
  
  <style scoped>
  .card {
    border-radius: 8px;
  }
  
  .btn-outline-secondary {
    border: none;
    background: transparent;
  }
  
  .btn-outline-secondary:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  
  .toggle-password-btn {
    position: absolute;
    right: 0;
    top: 0;
  }
  </style>
   -->