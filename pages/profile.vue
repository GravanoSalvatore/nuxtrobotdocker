<!-- <template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow">
            <div class="card-body">
              <h2 class="text-center mb-4">Авторизация</h2>
              <form @submit.prevent="handleLogin">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    v-model="email"
                    class="form-control"
                    placeholder="Введите ваш email"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Пароль</label>
                  <input
                    type="password"
                    id="password"
                    v-model="password"
                    class="form-control"
                    placeholder="Введите ваш пароль"
                    required
                  />
                </div>
                <div class="d-grid">
                  <button type="submit" class="btn btn-primary">Войти</button>
                </div>
                <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
                  {{ errorMessage }}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
        errorMessage: ""
      };
    },
    methods: {
      async handleLogin() {
        try {
          if (!this.email || !this.password) {
            this.errorMessage = "Пожалуйста, заполните все поля.";
            return;
          }
  
          const loginUrl = `https://4v-news-api.azurewebsites.net/Account/Login?Email=${encodeURIComponent(
            this.email.trim()
          )}&Password=${encodeURIComponent(this.password.trim())}`;
  
          const response = await axios.post(loginUrl, {}, { withCredentials: true });
  
          if (response.data.isSuccess) {
            if (response.data.token) {
              localStorage.setItem("authToken", response.data.token);
            }
  
            alert("Вы успешно вошли!");
  
            // Используем Nuxt.js для перенаправления
            this.$router.push(response.data.redirectToPage || "/");
          } else {
            this.errorMessage = response.data.errors || "Ошибка авторизации";
          }
        } catch (error) {
          console.error("Ошибка запроса:", error.response?.data || error.message);
          this.errorMessage =
            error.response?.data?.errors?.Email?.[0] ||
            error.response?.data?.errors?.Password?.[0] ||
            "Произошла ошибка, попробуйте снова.";
        }
      }
    }
  };
  </script>
  
  <style>
  body {
    background-color: #f8f9fa;
  }
  .card {
    border-radius: 10px;
  }
  </style> -->
 
  <!-- <template>
    <div class="container d-flex justify-content-center  ">
      <div class="card p-4 shadow-sm" style="max-width: 400px; width: 100%;">
        <h4 class="text-center mb-3">Авторизация</h4>
  
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
            style="top:10px"
              type="button" 
              class="btn btn-outline-secondary position-absolute end-0  translate-middle-y" 
              @click="showPassword = !showPassword"
            >
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
  
          <button type="submit" class="btn btn-primary w-100" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm"></span>
            <span v-else>Войти</span>
          </button>
        </form>
  
        <div v-if="isAuthenticated" class="alert alert-success text-center mt-3">
          Добро пожаловать, {{ username }}!
          <button class="btn btn-danger w-100 mt-2" @click="logout">Выйти</button>
        </div>
  
        <div v-if="errorMessage" class="alert alert-danger mt-3">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const errorMessage = ref('')
  const username = ref('')
  const isAuthenticated = ref(false)
  const showPassword = ref(false)
  
  const login = async () => {
    loading.value = true
    errorMessage.value = ''
  
    try {
      const response = await fetch(`https://4v-news-api.azurewebsites.net/Account/Login?Email=${encodeURIComponent(email.value)}&Password=${encodeURIComponent(password.value)}`, {
        method: 'POST',
        credentials: 'include', // Получаем куки с токеном
        headers: { 'Content-Type': 'application/json' }
      })
  
      if (!response.ok) throw new Error('Ошибка авторизации')
  
      const data = await response.json()
      if (data.isSuccess) {
        document.cookie = `AuthToken=${data.token}; path=/; Secure; HttpOnly`
        username.value = email.value
        isAuthenticated.value = true
      } else {
        errorMessage.value = 'Неверные данные!'
      }
    } catch (error) {
      errorMessage.value = 'Ошибка сети или сервера'
    } finally {
      loading.value = false
    }
  }
  
  const logout = () => {
    document.cookie = 'AuthToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC'
    isAuthenticated.value = false
    username.value = ''
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
  </style>
   -->
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
  