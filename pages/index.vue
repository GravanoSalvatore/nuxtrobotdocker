<template>
   <div> 
    
   
    <div v-if="isDesktop" class="video-container">
        
      <div class="video-wrapper">
        <video controls class="video-player" @play="isVideoPlaying = true" @pause="isVideoPlaying = false">
          <source src="../public/video.mp4" type="video/mp4" />
          Ваш браузер не поддерживает тег видео.
        </video>
        <div v-if="!isVideoPlaying" class="overlay-text text-center">Video guide for using </div>
      </div>
    </div>
    <div class="container ">
    <h4 style="color: cornflowerblue"  v-if="isDesktop" class="fw-bold">4V.ROBOT<span style="font-size: 16px;"> is an indispensable assistant for channel administration. Create channels on popular social media platforms and automate the process with our bot.
        4V.ROBOT integrates elements of artificial intelligence to optimize bot performance and provides integration with various social networks such as Telegram, Twitter*, and Facebook*. These bots allow users to receive instant news updates and automate social media content management.
    </span>
    <p style="color: cornflowerblue;font-size: 18px;">* Under development</p></h4>
   
    </div>
</div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  export default {
    name: 'ResponsiveVideo',
    setup() {
      const isDesktop = ref(true);
      const isVideoPlaying = ref(false);
  
      const checkScreenSize = () => {
        isDesktop.value = window.innerWidth >= 768;
      };
  
      onMounted(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
      });
  
      onUnmounted(() => {
        window.removeEventListener('resize', checkScreenSize);
      });
  
      return {
        isDesktop,
        isVideoPlaying,
      };
    },
  };
  </script>
  
  <style scoped>
  
  .video-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
  }
  
  .video-wrapper {
    position: relative;
    width: 100%;
    max-width: 720px;
  }
  
  .video-player {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .overlay-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 24px;
    font-weight: bold;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
    pointer-events: none;
  }
  </style>
  