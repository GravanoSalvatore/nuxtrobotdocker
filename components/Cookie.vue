<template>
    <div v-if="!cookiesAccepted" class="cookie-popup">
      <div class="cookie-content">
        <p>This site uses cookies to improve your experience. Do you agree?</p>
        <div class="cookie-buttons">
          <button @click="acceptCookies" class="btn-accept">Accept</button>
          <button @click="declineCookies" class="btn-decline">Reject</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const cookiesAccepted = ref(false);
  
  // Проверяем, было ли уже согласие
  onMounted(() => {
    cookiesAccepted.value = localStorage.getItem('cookiesAccepted') === 'true';
  });
  
  // Принимаем куки
  const acceptCookies = () => {
    cookiesAccepted.value = true;
    localStorage.setItem('cookiesAccepted', 'true');
  };
  
  // Отклоняем куки
  const declineCookies = () => {
    cookiesAccepted.value = true; // Просто скрываем окно
  };
  </script>
  
  <style scoped>
  .cookie-popup {
    border: 2px solid orange;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 320px;
    background: #01263f;
    color: white;
    padding: 15px;
    border-radius: 8px;
    z-index: 9999;
    text-align: center;
  }
  
  .cookie-buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  }
  
  .btn-accept {
    background: green;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-decline {
    background: red;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>



