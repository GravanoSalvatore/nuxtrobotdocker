<template>
  <div class="media-editor-container">
    <div class="editor-wrapper">
      <!-- Основное текстовое поле -->
      <textarea 
        v-model="message" 
        class="form-control message-textarea mt-2" 
        placeholder="Write a message for the Telegram channel..."
        rows="6"
      ></textarea>
      <input
        type="text"
        v-model="gifSearchQuery"
        class="form-control mt-2"
        placeholder="Поиск GIF..."
      />

          
<!-- Панель управления медиа -->
<div class="media-controls mt-3">
        <!-- Кнопки загрузки медиа -->
        <div class="btn-group" role="group">
          <input 
            type="file" 
            ref="fileInput" 
            @change="handleFileUpload" 
            multiple 
            accept="image/*,video/*,audio/*"
            style="display: none"
          >
          <button 
            @click="$refs.fileInput.click()" 
            class="btn-danger1"
            
          >
            <i class="bi bi-upload"></i>
          </button>
          <!--<button 
@click="$refs.videoInput.click()" 
class="btn-danger1 ms-2"
>
<i class="bi bi-upload"></i> Загрузить видео
</button>-->
<input 
type="file" 
ref="videoInput" 
@change="handleFileUpload" 
multiple 
accept="video/*"
style="display: none"
/>

          <!-- Дополнительные опции -->
          <button 
            class="btn-danger1 dropdown-toggle" 
            type="button" 
            data-bs-toggle="dropdown"
          >
            <i class="bi bi-gear"></i>
          </button>
          <ul class="dropdown-menu">
            <li>
              <label class="dropdown-item">
                <input 
                  type="checkbox" 
                  v-model="options.spoilerMode"
                  class="form-check-input me-2"
                > 
                Режим спойлера
              </label>
            </li>
            <li>
              <label class="dropdown-item">
                <input 
                  type="checkbox" 
                  v-model="options.sendWithPreview"
                  class="form-check-input me-2"
                > 
                Предварительный просмотр
              </label>
            </li>
          </ul>
        </div>





      
        <!-- Кнопка отправки -->
        <button 
          @click="sendMessage" 
          class="btn-danger1 ms-2"
          :disabled="!message && !uploadedFiles.length"
        >
          <i class="bi bi-send"></i> 
        </button>
      </div>



      <div class="recorder-controls mt-3">
        <div class="btn-group" role="group">
          <button @click="startRecording" :disabled="isRecording" class="btn-danger1">
            <i class="bi bi-mic"></i> Record
          </button>
          <button @click="pauseRecording" :disabled="!isRecording" class="btn-danger1 ms-2">
            <i class="bi bi-pause"></i> Pause
          </button>
          <button @click="stopRecording" :disabled="!isRecording" class="btn-danger1 ms-2">
            <i class="bi bi-stop"></i> Stop
          </button>
        </div>
      </div>

      <!-- Предварительный просмотр аудиозаписи -->
      <div v-if="recordedAudio" class="audio-preview mt-3">
        <div class="audio-preview-thumbnail" style="position:relative;">
          <!-- <img src="../../assets/img/4vrobot.png" alt="Audio Preview" /> -->
          <p>Listen to the audio recording</p>
          <button 
        @click="clearRecordedAudio" 
        class="btn btn-close btn-sm"
      style="position:absolute;right: 0;top:0;"
        >
      </button>
        </div>
        
        <audio style="max-width:200px;height: 30px;padding-right: 15px;" :src="recordedAudio" controls></audio>
       
      </div>

      <!-- Превью загруженных медиафайлов -->
      <div v-if="uploadedFiles && uploadedFiles.length" class="media-preview mt-3">
        <div 
          v-for="(file, index) in uploadedFiles" 
          :key="index" 
          class="media-item"
        >
          <!-- Превью изображений -->
          <img 
            v-if="file.type.startsWith('image/')" 
            :src="file.preview" 
            class="img-thumbnail"
          />
          
          <!-- Превью видео -->
          <video 
            v-else-if="file.type.startsWith('video/')" 
            controls 
            class="video-preview"
          >
            <source :src="file.preview" :type="file.type">
          </video>
          
          <!-- Превью аудио -->
          <audio 
            v-else-if="file.type.startsWith('audio/')" 
            controls 
            class="audio-previe"
          >
            <source :src="file.preview" :type="file.type">
          </audio>

          <!-- Кнопка удаления файла -->
          <button 
            @click="removeFile(index)" 
            class="btn btn-danger btn-sm remove-file-btn"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
     
     
      <svg class="" v-if="searchResults.length" @click="closeGifResults" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"/></svg>
      <!-- <button v-if="searchResults.length" @click="closeGifResults" class="btn-close btn-sm float-end" aria-label="Close"></button> -->
      <div class="gif-search mt-3">
        
      <div v-if="searchResults.length" class="gif-results mt-3">
       
        <div 
          v-for="gif in searchResults" 
          :key="gif.id" 
          class="gif-item"
          @click="selectGif(gif)"
        >
          <img :src="gif.images.fixed_height_small.url" alt="GIF" />
        </div>
      </div>
    </div>
    
    </div>
  </div>
</template>

<!-- <script>
import { ref, reactive, watch } from 'vue';
import axios from 'axios';
import { useChannelStore } from '@/stores/channelStore';

export default {
  setup() {
    const channelStore = useChannelStore();
    const botToken = "6903896787:AAG-rPGukp422cw17k4y17UsJUiDMl5tdbc";
    const message = ref('');
    const uploadedFiles = ref([]);
    const gifSearchQuery = ref('');
    const searchResults = ref([]);
    const selectedGif = ref(null);
    const options = reactive({
      spoilerMode: false,
      sendWithPreview: true
    });

    const isRecording = ref(false);
    const recordedAudio = ref(null);
    let mediaRecorder;
    let audioChunks = [];

    const startRecording = () => {
      console.log('Начало записи аудио');
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        isRecording.value = true;
        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          console.log('Запись остановлена');
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          recordedAudio.value = URL.createObjectURL(audioBlob);
          uploadedFiles.value.push({
            file: audioBlob,
            preview: recordedAudio.value,
            type: 'audio/wav'
          });
        };
      }).catch((error) => {
        console.error('Ошибка доступа к микрофону:', error);
      });
    };

    const stopRecording = () => {
      if (mediaRecorder) {
        console.log('Остановка записи аудио');
        mediaRecorder.stop();
        isRecording.value = false;
      }
    };

    const pauseRecording = () => {
      if (mediaRecorder && isRecording.value) {
        console.log('Пауза записи аудио');
        mediaRecorder.pause();
        isRecording.value = false;
      }
    };




    const handleFileUpload = (event) => {
      const files = Array.from(event.target.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          uploadedFiles.value.push({
            file,
            preview: e.target.result,
            type: file.type
          });
        };
        reader.readAsDataURL(file);
      });
    };

    const searchGifs = async () => {
      console.log("Поиск GIF начался с запросом:", gifSearchQuery.value);
      if (!gifSearchQuery.value.trim()) {
        console.warn("Пустой поисковый запрос!");
        searchResults.value = [];
        return;
      }

      try {
        const response = await axios.get(
          `https://api.giphy.com/v1/gifs/search`,
          {
            params: {
              api_key: 'fADq5TfaTTfCcdSmI7jd3znNii8C1SqA',
              q: gifSearchQuery.value,
              limit: 50
            }
          }
        );
        searchResults.value = response.data.data.map((gif) => ({
          ...gif,
          isSelected: false
        }));
        console.log("Найдено GIF:", searchResults.value.length);
      } catch (error) {
        console.error('Ошибка поиска GIF:', error);
      }
    };

    const selectGif = (gif) => {
      console.log("GIF выбран:", gif.images.original.url);
      selectedGif.value = gif.images.original.url;
      searchResults.value = searchResults.value.map((g) => ({
        ...g,
        isSelected: g.images.original.url === gif.images.original.url
      }));
    };

    watch(gifSearchQuery, searchGifs);

    const sendMedia = async () => {
      try {
        const media = uploadedFiles.value.map((file, index) => ({
          type: file.type.startsWith('image/') ? 'photo' : 'video',
          media: `attach://${file.file.name}`,
          caption: index === 0 ? message.value || ' ' : undefined,
          has_spoiler: options.spoilerMode
        }));

        const formData = new FormData();
        formData.append('chat_id', channelStore.activeChannelId);
        formData.append('media', JSON.stringify(media));

        uploadedFiles.value.forEach((file) => {
          formData.append(file.file.name, file.file);
        });

        const response = await axios.post(
          `https://api.telegram.org/bot${botToken}/sendMediaGroup`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        console.log('Ответ Telegram API (sendMediaGroup):', response.data);

        uploadedFiles.value = [];
        message.value = '';
        alert('Медиа успешно отправлено!');
      } catch (error) {
        console.error('Ошибка при отправке медиа:', error.response?.data || error.message);
      }
    };

    const sendMessage = async () => {
      if (uploadedFiles.value.length > 0) {
        await sendMedia();
      } else if (selectedGif.value) {
        try {
          const caption = message.value.trim() || ' '; // Пробел если текста нет
          console.log("Подставленный caption:", caption);
          const payload = {
            chat_id: channelStore.activeChannelId,
            animation: selectedGif.value,
            caption,
            disable_web_page_preview: !options.sendWithPreview
          };
          console.log("Отправка GIF с данными:", payload);
          await axios.post(
            `https://api.telegram.org/bot${botToken}/sendAnimation`,
            payload
          );
          alert('GIF успешно отправлен!');
          selectedGif.value = null;
          message.value = '';
        } catch (error) {
          console.error('Ошибка отправки GIF:', error.response?.data || error.message);
        }
      } else if (recordedAudio.value) {
        try {
          console.log('Отправка аудио в Telegram');
          const formData = new FormData();
          formData.append('chat_id', channelStore.activeChannelId);
          formData.append('audio', uploadedFiles.value[0].file);

          const response = await axios.post(
            `https://api.telegram.org/bot${botToken}/sendAudio`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
          );
          console.log('Аудио успешно отправлено:', response.data);
          recordedAudio.value = null;
        } catch (error) {
          console.error('Ошибка отправки аудио:', error.response?.data || error.message);
        }
      } else if (message.value.trim()) {
        try {
          const payload = {
            chat_id: channelStore.activeChannelId,
            text: message.value,
            disable_web_page_preview: !options.sendWithPreview
          };
          console.log('Отправка текста в Telegram', payload);
          await axios.post(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            payload
          );
          alert('Сообщение успешно отправлено!');
          message.value = '';
        } catch (error) {
          console.error('Ошибка отправки сообщения:', error.response?.data || error.message);
        }
      } else {
        console.warn("Нечего отправлять!");
      }
    };

    const removeFile = (index) => {
      uploadedFiles.value.splice(index, 1);
    };

    const resetAllFields = () => {
      message.value = '';
      uploadedFiles.value = [];
      gifSearchQuery.value = '';
      searchResults.value = [];
      selectedGif.value = null;
    };

    const closeGifResults = () => {
      console.log("Закрытие списка GIF");
      searchResults.value = [];
    };

    return {
      isRecording,
      recordedAudio,
      startRecording,
      stopRecording,
      pauseRecording,
      message,
      uploadedFiles,
      gifSearchQuery,
      searchResults,
      selectedGif,
      options,
      handleFileUpload,
      searchGifs,
      selectGif,
      sendMessage,
      removeFile,
      resetAllFields,
      closeGifResults
    };
  }
};
</script> -->

<script>
import { ref, reactive, watch } from 'vue';
import axios from 'axios';
import { useChannelStore } from '@/stores/channelStore';

export default {
  setup() {
    const channelStore = useChannelStore();
    const botToken = "6903896787:AAG-rPGukp422cw17k4y17UsJUiDMl5tdbc";
    const message = ref('');
    const uploadedFiles = ref([]);
    const gifSearchQuery = ref('');
    const searchResults = ref([]);
    const selectedGif = ref(null);
    const closeGifResults = () => {
      console.log("Закрытие списка GIF");
      searchResults.value = [];
    };
    const options = reactive({
      spoilerMode: false,
      sendWithPreview: true
    });

    const isRecording = ref(false);
    const recordedAudio = ref(null);
    let mediaRecorder;
    let audioChunks = [];
    const clearRecordedAudio = () => {
      console.log('Закрытие предварительного просмотра аудио');
      recordedAudio.value = null;
    };
    const startRecording = () => {
      console.log('Начало записи аудио');
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        isRecording.value = true;
        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          console.log('Запись остановлена');
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          recordedAudio.value = URL.createObjectURL(audioBlob);
          uploadedFiles.value.push({
            file: audioBlob,
            preview: recordedAudio.value,
            type: 'audio/wav'
          });
        };
      }).catch((error) => {
        console.error('Ошибка доступа к микрофону:', error);
      });
    };

    const stopRecording = () => {
      if (mediaRecorder) {
        console.log('Остановка записи аудио');
        mediaRecorder.stop();
        isRecording.value = false;
      }
    };

    const pauseRecording = () => {
      if (mediaRecorder && isRecording.value) {
        console.log('Пауза записи аудио');
        mediaRecorder.pause();
        isRecording.value = false;
      }
    };

    const sendMessage = async () => {
      if (uploadedFiles.value.length > 0) {
        await sendMedia();
      } else if (selectedGif.value) {
        try {
          const caption = message.value.trim() || ' ';
          const payload = {
            chat_id: channelStore.activeChannelId,
            animation: selectedGif.value,
            caption,
            disable_web_page_preview: !options.sendWithPreview
          };
          console.log("Отправка GIF с данными:", payload);
          await axios.post(
            `https://api.telegram.org/bot${botToken}/sendAnimation`,
            payload
          );
          alert('GIF успешно отправлен!');
          selectedGif.value = null;
          message.value = '';
        } catch (error) {
          console.error('Ошибка отправки GIF:', error.response?.data || error.message);
        }
      } else if (recordedAudio.value) {
        try {
          const formData = new FormData();
          formData.append('chat_id', channelStore.activeChannelId);
          formData.append('audio', uploadedFiles.value[0].file);

          const response = await axios.post(
            `https://api.telegram.org/bot${botToken}/sendAudio`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
          );
          console.log('Аудио успешно отправлено:', response.data);
          recordedAudio.value = null;
        } catch (error) {
          console.error('Ошибка отправки аудио:', error.response?.data || error.message);
        }
      } else if (message.value.trim()) {
        try {
          const payload = {
            chat_id: channelStore.activeChannelId,
            text: message.value,
            disable_web_page_preview: !options.sendWithPreview
          };
          await axios.post(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            payload
          );
          alert('Сообщение успешно отправлено!');
          message.value = '';
        } catch (error) {
          console.error('Ошибка отправки сообщения:', error.response?.data || error.message);
        }
      } else {
        console.warn("Нечего отправлять!");
      }
    };

    const sendMedia = async () => {
      try {
        const media = uploadedFiles.value.map((file, index) => ({
          type: file.type.startsWith('image/') ? 'photo' : 'video',
          media: `attach://${file.file.name}`,
          caption: index === 0 ? message.value || ' ' : undefined,
          has_spoiler: options.spoilerMode
        }));

        const formData = new FormData();
        formData.append('chat_id', channelStore.activeChannelId);
        formData.append('media', JSON.stringify(media));

        uploadedFiles.value.forEach((file) => {
          formData.append(file.file.name, file.file);
        });

        const response = await axios.post(
          `https://api.telegram.org/bot${botToken}/sendMediaGroup`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        console.log('Медиа успешно отправлено:', response.data);
        uploadedFiles.value = [];
        message.value = '';
        alert('Медиа успешно отправлено!');
      } catch (error) {
        console.error('Ошибка при отправке медиа:', error.response?.data || error.message);
      }
    };

    const handleFileUpload = (event) => {
      const files = Array.from(event.target.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          uploadedFiles.value.push({
            file,
            preview: e.target.result,
            type: file.type
          });
        };
        reader.readAsDataURL(file);
      });
    };

    const removeFile = (index) => {
      uploadedFiles.value.splice(index, 1);
    };

    const resetAllFields = () => {
      message.value = '';
      uploadedFiles.value = [];
      gifSearchQuery.value = '';
      searchResults.value = [];
      selectedGif.value = null;
    };

    const searchGifs = async () => {
      console.log("Поиск GIF начался с запросом:", gifSearchQuery.value);
      if (!gifSearchQuery.value.trim()) {
        console.warn("Пустой поисковый запрос!");
        searchResults.value = [];
        return;
      }

      try {
        const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
          params: {
            api_key: 'fADq5TfaTTfCcdSmI7jd3znNii8C1SqA',
            q: gifSearchQuery.value,
            limit: 50
          }
        });
        searchResults.value = response.data.data.map((gif) => ({
          ...gif,
          isSelected: false
        }));
        console.log("Найдено GIF:", searchResults.value.length);
      } catch (error) {
        console.error('Ошибка поиска GIF:', error.response?.data || error.message);
      }
    };

    
watch(gifSearchQuery, () => {
  console.log("Обновление запроса GIF:", gifSearchQuery.value);
  searchGifs();
});

const selectGif = (gif) => {
      console.log('GIF выбран:', gif);
      selectedGif.value = gif.images.original.url;
    };
    return {
      selectGif, // Добавил метод selectGif
      clearRecordedAudio,
      isRecording,
      recordedAudio,
      startRecording,
      stopRecording,
      pauseRecording,
      sendMessage,
      sendMedia,
      handleFileUpload,
      removeFile,
      resetAllFields,
      searchGifs,
      uploadedFiles,
      gifSearchQuery,
      searchResults,
      selectedGif,
      options,
      message,
      closeGifResults
    };
  }
};
</script>

  <style scoped>
.audio-preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.audio-thumbnail {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
}

.audio-thumbnail img {
  max-width: 50px;
  margin-bottom: 10px;
}
.media-editor-container {
  padding: 20px;
}



  .gif-results {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.gif-item {
  cursor: pointer;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 8px;
  border: 2px solid transparent;
  transition: border-color 0.3s;
}
.gif-item:hover {
  border-color: #dc3545;
}
.gif-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.media-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.media-item {
  
  position: relative;
  width: 120px;
  height: 120px;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #276fb7;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.media-item img,
.media-item video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media-item .remove-file-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(255, 0, 0, 0.8);
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
  z-index: 10;
}

.media-item .remove-file-btn:hover {
  background-color: red;
}







  .media-editor-container {
  max-width: 800px;
  margin: 0 auto;
}

.message-textarea {
  resize: vertical;
  min-height: 150px;
}

/* Контейнер для всех превью файлов */


.media-item .remove-file-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(255, 0, 0, 0.8);
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
  z-index: 10;
}

.media-item .remove-file-btn:hover {
  background-color: red;
}

.media-item audio {
  width: 100%;
  height: auto;
}

.remove-file-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 10;
  background-color: #dc3545;
  border: none;
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.remove-file-btn:hover {
  background-color: #c82333;
}

.media-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.btn-danger1 {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.btn-danger1:hover {
  background-color: #c82333;
}
.gif-item {
  border: 2px solid transparent;
  cursor: pointer;
}

.gif-item.selected {
  border-color: red;
}

</style>