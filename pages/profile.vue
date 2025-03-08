
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
   
  
  
  
    -->
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
    
          <div v-if="isAuthenticated" class="alert text-center mt-3">
            Welcome {{ username }}!<br/>
            <button class="btn btn-danger mt-2" @click="logout">Выйти</button>
            <button class="btn btn-success mt-2" @click="sendAutoPost" :disabled="posting">
              <span v-if="posting" class="spinner-border spinner-border-sm"></span>
              <span v-else>Автопостинг</span>
            </button>
          </div>
    
          <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
        </div>
      </div>
    </template>
    
    <script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    
    const email = ref('');
    const password = ref('');
    const loading = ref(false);
    const posting = ref(false);
    const errorMessage = ref('');
    const username = ref('');
    const isAuthenticated = ref(false);
    const showPassword = ref(false);
    
    onMounted(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
        username.value = localStorage.getItem('username') || '';
        isAuthenticated.value = !!localStorage.getItem('AuthToken');
      }
    });
    
    const login = async () => {
      loading.value = true;
      errorMessage.value = '';
    
      try {
        const response = await axios.post(
          `https://4v-news-api.azurewebsites.net/Account/Login?Email=${encodeURIComponent(email.value)}&Password=${encodeURIComponent(password.value)}`,
          {},
          { withCredentials: true }
        );
    
        console.log('[LOGIN] Ответ сервера:', response.data);
    
        if (response.data.isSuccess) {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('AuthToken', 'true');
            localStorage.setItem('username', email.value);
          }
          username.value = email.value;
          isAuthenticated.value = true;
        } else {
          errorMessage.value = 'Неверные данные!';
        }
      } catch (error) {
        console.error('[LOGIN] Ошибка:', error);
        errorMessage.value = 'Ошибка сети или сервера';
      } finally {
        loading.value = false;
      }
    };
    
    const logout = () => {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('AuthToken');
        localStorage.removeItem('username');
      }
      isAuthenticated.value = false;
      username.value = '';
    };
    
    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };
    
    const sendAutoPost = async () => {
      posting.value = true;
      try {
        const response = await axios.post(
          `https://4v-news-api.azurewebsites.net/AutoPosting?TelegramChatId=-1002487092184&TagIds=7`,
          {},
          { withCredentials: true }
        );
    
        console.log('[AUTOPOST] Ответ сервера:', response);
    
        if (response.status === 200) {
          alert('Пост успешно отправлен!');
        } else {
          alert(`Ошибка при отправке поста: ${response.status}`);
        }
      } catch (error) {
        console.error('[AUTOPOST] Ошибка:', error);
        alert(`Ошибка сети или сервера: ${error.message}`);
      } finally {
        posting.value = false;
      }
    };
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
              <div class="input-group">
                <input 
                  v-model="password" 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  class="form-control" 
                  required 
                />
                <button 
                  type="button" 
                  class="btn btn-outline-secondary" 
                  @click="togglePassword"
                >
                  <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </button>
              </div>
            </div>
    
            <button type="submit" class="btn btn-primary w-100" :disabled="loading">
              <span v-if="loading" class="spinner-border spinner-border-sm"></span>
              <span v-else>Войти</span>
            </button>
          </form>
    
          <div v-if="isAuthenticated" class="alert text-center mt-3">
            Welcome {{ username }}!<br/>
            <button class="btn btn-danger mt-2" @click="logout">Выйти</button>
            <button class="btn btn-success mt-2" @click="sendAutoPost" :disabled="posting">
              <span v-if="posting" class="spinner-border spinner-border-sm"></span>
              <span v-else>Автопостинг</span>
            </button>
          </div>
    
          <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
        </div>
      </div>
    </template>
    
    <script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    
    const email = ref('');
    const password = ref('');
    const loading = ref(false);
    const posting = ref(false);
    const errorMessage = ref('');
    const username = ref('');
    const isAuthenticated = ref(false);
    const showPassword = ref(false);
    
    axios.defaults.withCredentials = true;
    
    onMounted(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
        username.value = localStorage.getItem('username') || '';
        isAuthenticated.value = !!localStorage.getItem('AuthToken');
      }
    });
    
    const login = async () => {
      loading.value = true;
      errorMessage.value = '';
    
      try {
        const response = await axios.post(
          `https://4v-news-api.azurewebsites.net/Account/Login?Email=${encodeURIComponent(email.value)}&Password=${encodeURIComponent(password.value)}`,
          {},
          { withCredentials: true }
        );
    
        console.log('[LOGIN] Ответ сервера:', response.data);
    
        if (response.data.isSuccess) {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('AuthToken', response.data.token || 'true');
            localStorage.setItem('username', email.value);
          }
          username.value = email.value;
          isAuthenticated.value = true;
        } else {
          errorMessage.value = 'Неверные данные!';
        }
      } catch (error) {
        console.error('[LOGIN] Ошибка:', error);
        errorMessage.value = 'Ошибка сети или сервера';
      } finally {
        loading.value = false;
      }
    };
    
    const logout = () => {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('AuthToken');
        localStorage.removeItem('username');
      }
      isAuthenticated.value = false;
      username.value = '';
    };
    
    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };
    
    const sendAutoPost = async () => {
      posting.value = true;
      try {
        const response = await axios.post(
          `https://4v-news-api.azurewebsites.net/AutoPosting?TelegramChatId=-1002487092184&TagIds=7`,
          {},
          { withCredentials: true }
        );
    
        console.log('[AUTOPOST] Ответ сервера:', response);
    
        if (response.status === 200) {
          alert('Пост успешно отправлен!');
        } else {
          alert(`Ошибка при отправке поста: ${response.status}`);
        }
      } catch (error) {
        console.error('[AUTOPOST] Ошибка:', error);
        alert(`Ошибка сети или сервера: ${error.message}`);
      } finally {
        posting.value = false;
      }
    };
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
    