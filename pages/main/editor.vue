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
      <client-only>
        <i
          style="color: cornflowerblue"
          @click="toggleEmojiPicker"
          class="bi pointer"
          :class="showEmojiPicker ? 'bi-x-circle' : 'bi-emoji-smile'"
        ></i>

        <!-- Emoji Picker -->
        <div class="position-relative">
          <div
            v-if="showEmojiPicker"
            class="emoji-picker-container mt-2 d-flex justify-content-center align-items-center"
          >
            <emoji-picker
              style="z-index: 10000; top:0;left: 0;"
              class="custom-emoji-picker position-absolute"
              @emoji-click="addEmoji"
            ></emoji-picker>
          </div>
        </div>
      </client-only>
            <!-- Панель управления медиа -->
            <div class="media-controls mt-3">
        <!-- Кнопки загрузки медиа -->
        <div class="btn-group d-flex flex-wrap" role="group">
          <input
            type="file"
            ref="fileInput"
            @change="handleFileUpload"
            multiple
            accept="image/*,video/*,audio/*"
            style="display: none"
          />
          <button
            @click="$refs.fileInput.click()"
            class="btn-danger1 btn-sm flex-grow-1"
          >
            <i class="bi bi-upload"></i> Upload
          </button>

          <input
            type="file"
            ref="videoInput"
            @change="handleFileUpload"
            multiple
            accept="video/*"
            style="display: none"
          />
          <button
            class="btn-danger1 btn-sm dropdown-toggle flex-grow-1"
            type="button"
            data-bs-toggle="dropdown"
          >
            <i class="bi bi-gear"></i> Options
          </button>
          <ul class="dropdown-menu">
            <li>
              <label class="dropdown-item">
                <input
                  type="checkbox"
                  v-model="options.spoilerMode"
                  class="form-check-input me-2"
                />
                Режим спойлера
              </label>
            </li>
            <li>
              <label class="dropdown-item">
                <input
                  type="checkbox"
                  v-model="options.sendWithPreview"
                  class="form-check-input me-2"
                />
                Предварительный просмотр
              </label>
            </li>
          </ul>

          <!-- <button
            @click="startRecording"
            :disabled="isRecording"
            class="pointer btn-danger1 btn-sm flex-grow-1"
          >
            <i class="bi bi-mic"></i> Record
          </button>

          <button
            @click="pauseRecording"
            :disabled="!isRecording"
            class="pointer btn-danger1 btn-sm flex-grow-1"
          >
            <i class="bi bi-pause"></i> Pause
          </button>

          <button
            @click="stopRecording"
            :disabled="!isRecording"
            class="btn-danger1 btn-sm flex-grow-1"
          >
            <i class="bi bi-stop"></i> Stop
          </button> -->

          <!-- <button
            @click="startVideoRecording"
            :disabled="isVideoRecording"
            class="btn-danger1 btn-sm flex-grow-1"
          >
            <i class="bi bi-camera-video"></i> Record Video
          </button>

          <button
            @click="stopVideoRecording"
            :disabled="!isVideoRecording"
            class="btn-danger1 btn-sm flex-grow-1"
          >
            <i class="bi bi-stop"></i> Stop Recording
          </button> -->
          <!-- Кнопка для отправки отложенного сообщения -->
          <button class="btn-danger1" @click="scheduleMessage">
            Delayed sending <i class="bi bi-send"></i>
          </button>
          <!-- Кнопка отправки -->
          <button
  @click="sendMessage"
  class="btn-danger1"
  :disabled="!canSendNow"
>
  Send to Telegram
  <i class="bi bi-send ml-1"></i>
</button>

          <!-- <button
            @click="sendMessage"
            class="btn-danger1"
            :disabled="!message && !selectedMedia"
          >
            Send to telegram
            <i class="bi bi-send ml-1"></i>
          </button> -->
              <!-- Кнопка отображения Emoji Picker -->
    
        </div>
   
      </div>

      <input v-model="searchQuery" @input="fetchMedia" placeholder="Search video or image..." class="form-control mt-2 mb-2" />

<div v-if="loading" class="text-center">
  <p>Loading media...</p>
</div>

<div v-else>
  <!-- <button v-if="paginatedMedia.length" @click="closeMediaGallery" class="btn btn-danger mt-2">Close Media Gallery</button> -->
  
 
 
  <div v-if="selectedMedia" class="selected-media-preview mt-3">
  <h3>Selected Media:</h3>
  <div class="position-relative">
    <video v-if="selectedMedia.type === 'video'" :src="selectedMedia.url" controls class="preview-video"></video>
    <img v-else :src="selectedMedia.url" class="preview-image" />
    <i
       
        style="position: absolute; right: -20px; top:0"
v-if="paginatedMedia.length"  @click="clearSelectedMedia"
        class="bi bi-x-circle pointer"
      ></i>
    <!-- <button @click="clearSelectedMedia" class="btn btn-danger btn-sm position-absolute delete-media-btn">
      <i class="bi bi-x-circle"></i>
    </button> -->
  </div>
</div>

<div  style="position: relative;">
  <i
       
        style="position: absolute; right: -20px; top:0"
v-if="paginatedMedia.length" @click="closeMediaGallery"
        class="bi bi-x-circle pointer"
      ></i>
  <div v-if="paginatedMedia.length" class="media-gallery">
    <div v-for="media in paginatedMedia" :key="media.id" class="media-item" @click="selectMedia(media)">
      <video v-if="media.type === 'video'" :src="media.url" controls class="video-preview" @loadedmetadata="updateVideoLoadStatus(media.id)"></video>
      <img v-else-if="media.type === 'image'" :src="media.url" class="image-preview" @load="updateImageLoadStatus(media.id)" />
    </div>
  </div>

  <div v-if="paginatedMedia.length" class="pagination-controls">
    <span @click="prevPage" :disabled="currentPage === 1" class="pointer">&laquo; </span>
    <span> {{ currentPage }} / {{ totalPages }}</span>
    <span @click="nextPage" :disabled="currentPage >= totalPages" class="pointer"> &raquo;</span>
  </div>
</div>
</div>


     

      <!-- Новая функция: Выбор даты и времени -->
      <input
        type="text"
        v-model="gifSearchQuery"
        class="form-control mt-2"
        placeholder="Search GIF..."
      />

      <div class="schedule-controls mt-2">
        <!-- <label for="schedule-date">Schedule Date:</label> -->
        <input
          id="schedule-date"
          type="date"
          class="form-control"
          v-model="scheduledDate"
        />

        <!-- <label for="schedule-time" class="mt-2">Schedule Time:</label> -->
        <input
          id="schedule-time"
          type="time"
          class="form-control mt-2"
          v-model="scheduledTime"
        />
      </div>

      <!-- Превью загруженных медиафайлов -->
      <div
        v-if="uploadedFiles && uploadedFiles.length"
        class="media-preview mt-3"
      >
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
            <source :src="file.preview" :type="file.type" />
          </video>

          <!-- Превью аудио -->
          <audio
            v-else-if="file.type.startsWith('audio/')"
            controls
            class="audio-previe"
          >
            <source :src="file.preview" :type="file.type" />
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

      <!-- Предварительный просмотр аудиозаписи -->
      <div v-if="recordedAudio" class="audio-preview mt-3">
        <div class="audio-preview-thumbnail" style="position: relative">
          <!-- <img src="../../assets/img/4vrobot.png" alt="Audio Preview" /> -->
          <p style="font-size: 12px">Listen to the audio recording</p>
          <button
            @click="clearRecordedAudio"
            class="btn btn-close btn-sm"
            style="position: absolute; right: 0; top: 0"
          ></button>
        </div>

        <!-- <audio
          style="
            max-width: 200px;
            height: 30px;
            padding-right: 15px;
            background-color: transparent !important;
          "
          :src="recordedAudio"
          controls
        ></audio> -->
      </div>
      <!-- Предварительный просмотр выбранного GIF -->
      <!-- <div v-if="selectedGif" class="gif-preview mt-3">
  <h3>Preview GIF:</h3>
  <div class="position-relative">
    <img
      :src="selectedGif"
      alt="Selected GIF"
      class="img-thumbnail"
      style="max-width: 100%; border: 1px solid #ccc; border-radius: 8px;"
    />
   
    <button
      @click="clearSelectedGif"
      class="btn btn-danger btn-sm position-absolute"
      style="top: 0; right: 0;"
    >
      <i class="bi bi-x-circle"></i>
    </button>
  </div>
</div> -->
      <div v-if="selectedGif" class="gif-preview mt-3 position-relative">
        <img
          :src="selectedGif"
          alt="Selected GIF"
          class="img-thumbnail"
          style="max-width: 100%; border: 1px solid #ccc; border-radius: 8px"
        />
        <!-- Кнопка удаления GIF -->
        <i
       
       style="position: absolute; right: -20px; top:0"
  @click="clearSelectedGif"
       class="bi bi-x-circle pointer"
     ></i>
        <!-- <button
          @click="clearSelectedGif"
          class="btn btn-danger btn-sm position-absolute delete-gif-btn"
        >
          <i class="bi bi-x-circle"></i>
        </button> -->
      </div>

      <!-- <button v-if="searchResults.length" @click="closeGifResults" class="btn-close btn-sm float-end" aria-label="Close"></button> -->
      <div style="position: relative" class="gif-search mt-3">
        <i
       
       style="position: absolute; right: -20px; top:0"
       class="bi bi-x-circle pointer"
          v-if="searchResults.length"
          @click="closeGifResults"
       
     ></i>
        <!-- <svg
          style="position: absolute; right: 0; top: -20px"
          class="pointer"
          v-if="searchResults.length"
          @click="closeGifResults"
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
          />
        </svg> -->
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
        <div class="d-flex justify-content-center mt-3">
          <!-- <button
      v-if="!isLoading"
      @click="searchGifs(true)"
      class="btn btn-primary"
    >
      Load More
    </button> -->
    <i
      
       style="position: absolute; right: -20px; top:0"
   v-if="searchResults.length"
          @click="closeGifResults"
     ></i>
          <!-- <svg
            class="pointer"
            v-if="searchResults.length"
            @click="searchGifs(true)"
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            viewBox="0 0 24 24"
          >
            <circle cx="4" cy="12" r="1.5" fill="cornflowerblue">
              <animate
                attributeName="r"
                dur="0.75s"
                repeatCount="indefinite"
                values="1.5;3;1.5"
              />
            </circle>
            <circle cx="12" cy="12" r="3" fill="cornflowerblue">
              <animate
                attributeName="r"
                dur="0.75s"
                repeatCount="indefinite"
                values="3;1.5;3"
              />
            </circle>
            <circle cx="20" cy="12" r="1.5" fill="cornflowerblue">
              <animate
                attributeName="r"
                dur="0.75s"
                repeatCount="indefinite"
                values="1.5;3;1.5"
              />
            </circle>
          </svg> -->
          <!-- Индикатор загрузки -->
          <!-- <div v-if="isLoading" class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div> -->
        </div>
      </div>
      <!-- Новая функция: Видео с веб-камеры -->
      <!-- <div v-if="recordedVideo" class="video-preview mt-3">
        <h3>Preview Video:</h3>
        <video
          :src="recordedVideo"
          controls
          class="video-preview"
          style="
            width: 100%;
            max-width: 600px;
            border: 1px solid #ccc;
            border-radius: 8px;
          "
        ></video>
        <button @click="clearRecordedVideo" class="btn btn-danger btn-sm mt-2">
          Удалить видео
        </button>
      </div> -->


      <!-- <div class="recorder-controls mt-3">
        <div class="btn-group" role="group">
         
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch, onMounted } from "vue";
import axios from "axios";
import { useChannelStore } from "@/stores/channelStore";
//import "emoji-picker-element";
export default {
  
    setup() {
    const channelStore = useChannelStore();
    const botToken = channelStore.botToken;
    const showEmojiPicker = ref(false);
   
    const mediaPerPage = 14;
    const selectedMedia = ref(null);
const currentPage = ref(1);
const mediaResults = ref([]);
const searchQuery = ref('');
const loading = ref(false);
const imageLoadStatus = ref({});
const videoLoadStatus = ref({});

const closeMediaGallery = ()=> {
  mediaResults.value = [];
    }  


const isVideoRecording = ref(false);
    const recordedVideo = ref(null);
    let videoRecorder = null;
    let videoStream = null;
    let videoChunks = [];


    const canSendNow = computed(() => {
  return message.value.trim().length > 0 || selectedGif.value || selectedMedia.value || uploadedFiles.value.length > 0;
});



// Фильтрация по страницам


// Выбор медиа для отправки


// Отправка медиа в Telegram
const sendToTelegram = async () => {
  if (!selectedMedia.value) return;

  try {
    let payload = {
      chat_id: chatId.value,
      parse_mode: 'HTML'
    };

    if (selectedMedia.value.type === 'video') {
      payload.video = selectedMedia.value.url;
      payload.caption = message.value.trim();
      await axios.post(`https://api.telegram.org/bot${channelStore.botToken}/sendVideo`, payload);
    } else {
      payload.photo = selectedMedia.value.url;
      payload.caption = message.value.trim();
      await axios.post(`https://api.telegram.org/bot${channelStore.botToken}/sendPhoto`, payload);
    }

    alert('Media sent to Telegram!');
    selectedMedia.value = null;
    message.value = '';
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error);
    alert('Ошибка отправки медиа!');
  }
};


    // Начать запись видео
    const startVideoRecording = async () => {
      try {
        videoStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRecorder = new MediaRecorder(videoStream);
        videoChunks = [];

        videoRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            videoChunks.push(event.data);
          }
        };

        videoRecorder.onstop = () => {
          const videoBlob = new Blob(videoChunks, { type: "video/webm" });
          recordedVideo.value = URL.createObjectURL(videoBlob);
          uploadedFiles.value.push({
            file: videoBlob,
            preview: recordedVideo.value,
            type: "video/webm",
          });
        };

        videoRecorder.start();
        isVideoRecording.value = true;
      } catch (error) {
        console.error("Ошибка доступа к камере:", error);
      }
    };

    // Остановить запись видео
    const stopVideoRecording = () => {
      if (videoRecorder) {
        videoRecorder.stop();
        videoStream.getTracks().forEach((track) => track.stop());
        isVideoRecording.value = false;
      }
    };

    // Очистить записанное видео
    const clearRecordedVideo = () => {
      recordedVideo.value = null;
    };

    // Переключение видимости Emoji Picker
    const toggleEmojiPicker = () => {
      console.log("Текущий статус showEmojiPicker:", showEmojiPicker.value);
      showEmojiPicker.value = !showEmojiPicker.value;
      console.log("Новый статус showEmojiPicker:", showEmojiPicker.value);
    };
    const theme = ref("light-theme"); // Активная тема
    const applyThemeToEmojiPicker = () => {
      const emojiPicker = document.querySelector("emoji-picker");
      if (emojiPicker) {
        // Применяем тему из приложения
        emojiPicker.style.setProperty(
          "--background-color",
          getComputedStyle(document.body).getPropertyValue("--bs-body-bg")
        );
        emojiPicker.style.setProperty(
          "--text-color",
          getComputedStyle(document.body).getPropertyValue("--bs-body-color")
        );
        emojiPicker.style.setProperty(
          "--header-color",
          getComputedStyle(document.body).getPropertyValue("--bs-primary")
        );
        emojiPicker.style.setProperty(
          "--border-color",
          getComputedStyle(document.body).getPropertyValue("--bs-border-color")
        );
      }
    };
    // Слушаем изменения темы
    watch(theme, () => {
      applyThemeToEmojiPicker(); // Обновляем стиль Emoji Picker
    });

    const addEmoji = (event) => {
      console.log("Событие выбора эмодзи:", event);
      if (event?.detail?.unicode) {
        message.value += event.detail.unicode;
        console.log("Эмодзи добавлено в сообщение:", message.value);
      } else {
        console.warn("Ошибка: Unicode эмодзи не найден!");
      }
    };

    // Импорт emoji-picker-element
    if (typeof window !== "undefined") {
      import("emoji-picker-element")
        .then(() => console.log("Emoji Picker успешно загружен"))
        .catch((error) =>
          console.error("Ошибка загрузки Emoji Picker:", error)
        );
    } else {
      console.warn("Серверное окружение: emoji-picker не загружен.");
    }

    const scheduledDate = ref("");
    const scheduledTime = ref("");
    const message = ref("");
    const uploadedFiles = ref([]);

    const isLoading = ref(false);
    const offset = ref(0);
    const gifSearchQuery = ref("");
    const searchResults = ref([]);
    const selectedGif = ref(null);
    const closeGifResults = () => {
      console.log("Закрытие списка GIF");
      searchResults.value = [];
    };
    const options = reactive({
      spoilerMode: false,
      sendWithPreview: true,
    });
    // Проверяем, можно ли запланировать сообщение (оба условия)
    const isScheduleValid = computed(() => {
      return (
        (message.value.trim() || uploadedFiles.value.length > 0) &&
        scheduledDate.value &&
        scheduledTime.value
      );
    });

   
    // Метод запланированной отправки сообщения
    //     const scheduleMessage = async () => {
    //   if (!isScheduleValid.value) {
    //     alert("Добавьте текст или файл и укажите дату и время!");
    //     return;
    //   }

    //   const scheduledAt = `${scheduledDate.value}T${scheduledTime.value}`;
    //   const payload = {
    //     message: message.value.trim(),
    //     scheduledAt,
    //     botToken: channelStore.botToken,
    //     chatId: channelStore.activeChannelId || channelStore.channels[0]?.id,
    //     files: uploadedFiles.value.map((file) => ({
    //       name: file.file.name,
    //       type: file.type,
    //     })),
    //   };

    //   console.log("[CLIENT] Отправка на сервер с данными:", JSON.stringify(payload, null, 2));

    //   try {
    //     const response = await axios.post("/api/schedule", payload);
    //     console.log("[CLIENT] Ответ от сервера:", response.data);
    //     alert(response.data.message || "Сообщение успешно запланировано!");
    //     clearInputs();
    //   } catch (error) {
    //     console.error("[ERROR] Ошибка при планировании:", error.response?.data || error.message);
    //     alert("Ошибка планирования. Проверьте данные и повторите.");
    //   }
    // };
    const scheduleMessage = async () => {
      if (!isScheduleValid.value) {
        alert("Добавьте текст или файл и укажите дату и время!");
        return;
      }

      const scheduledAt = `${scheduledDate.value}T${scheduledTime.value}`;
      const filesData = await Promise.all(
        uploadedFiles.value.map(async (file) => {
          const data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(",")[1]); // Получаем Base64
            reader.onerror = reject;
            reader.readAsDataURL(file.file);
          });

          return { name: file.file.name, type: file.file.type, data };
        })
      );

      const payload = {
        message: message.value.trim(),
        scheduledAt,
        botToken: channelStore.botToken,
        chatId: channelStore.activeChannelId || channelStore.channels[0]?.id,
        files: filesData, // Отправляем файлы в формате Base64
      };

      console.log(
        "[CLIENT] Отправка на сервер с данными:",
        JSON.stringify(payload, null, 2)
      );

      try {
        const response = await axios.post("/api/schedule", payload);
        console.log("[CLIENT] Ответ от сервера:", response.data);
        alert(response.data.message || "Сообщение успешно запланировано!");
        clearInputs();
      } catch (error) {
        console.error(
          "[ERROR] Ошибка при планировании:",
          error.response?.data || error.message
        );
        alert("Ошибка планирования. Проверьте данные и повторите.");
      }
    };

    // Метод загрузки файлов
    // const handleFileUpload = (event) => {
    //   const files = Array.from(event.target.files);
    //   files.forEach((file) => {
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //       uploadedFiles.value.push({
    //         file,
    //         preview: e.target.result,
    //         type: file.type,
    //       });
    //     };
    //     reader.readAsDataURL(file);
    //   });
    // };
    const handleFileUpload = (event) => {
  const files = Array.from(event.target.files);
  if (!files.length) return;

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedFiles.value.push({
        file,
        preview: e.target.result,
        type: file.type,
      });
    };
    reader.readAsDataURL(file);
  });

  // Очистка input, чтобы повторная загрузка с тем же файлом работала
  event.target.value = "";
};




    // Метод очистки всех полей
    const clearInputs = () => {
      message.value = "";
      uploadedFiles.value = [];
      scheduledDate.value = "";
      scheduledTime.value = "";
    };

    // Метод удаления загруженного файла
    const removeFile = (index) => {
      uploadedFiles.value.splice(index, 1);
    };

    const isRecording = ref(false);
    const recordedAudio = ref(null);
    let mediaRecorder;
    let audioChunks = [];
    const clearRecordedAudio = () => {
      console.log("Закрытие предварительного просмотра аудио");
      recordedAudio.value = null;
    };
    const startRecording = () => {
      console.log("Начало записи аудио");
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.start();
          isRecording.value = true;
          audioChunks = [];

          mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
          };

          mediaRecorder.onstop = () => {
            console.log("Запись остановлена");
            const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
            recordedAudio.value = URL.createObjectURL(audioBlob);
            uploadedFiles.value.push({
              file: audioBlob,
              preview: recordedAudio.value,
              type: "audio/wav",
            });
          };
        })
        .catch((error) => {
          console.error("Ошибка доступа к микрофону:", error);
        });
    };

    const stopRecording = () => {
      if (mediaRecorder) {
        console.log("Остановка записи аудио");
        mediaRecorder.stop();
        isRecording.value = false;
      }
    };

    const pauseRecording = () => {
      if (mediaRecorder && isRecording.value) {
        console.log("Пауза записи аудио");
        mediaRecorder.pause();
        isRecording.value = false;
      }
    };

    const sendMedia = async () => {
  if (uploadedFiles.value.length === 0) {
    alert("Выберите файл перед отправкой!");
    return;
  }

  try {
    const chatId = channelStore.activeChannelId || channelStore.channels[0]?.id;
    let formData = new FormData();

    formData.append("chat_id", chatId);

    if (uploadedFiles.value.length === 1) {
      // Если один файл — отправляем как фото, видео или аудио
      const file = uploadedFiles.value[0].file;
      formData.append(file.type.startsWith("image/") ? "photo" : file.type.startsWith("video/") ? "video" : "audio", file);
    } else {
      // Если несколько файлов — отправляем как `mediaGroup`
      const media = uploadedFiles.value.map((file, index) => ({
        type: file.type.startsWith("image/") ? "photo" : file.type.startsWith("video/") ? "video" : "audio",
        media: `attach://${file.file.name}`,
        caption: index === 0 ? message.value || " " : undefined,
      }));

      formData.append("media", JSON.stringify(media));
      uploadedFiles.value.forEach((file) => {
        formData.append(file.file.name, file.file);
      });
    }

    const endpoint =
      uploadedFiles.value.length === 1
        ? `send${uploadedFiles.value[0].type.startsWith("image/") ? "Photo" : uploadedFiles.value[0].type.startsWith("video/") ? "Video" : "Audio"}`
        : "sendMediaGroup";

    const response = await axios.post(
      `https://api.telegram.org/bot${botToken}/` + endpoint,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.log("Медиа успешно отправлено:", response.data);
    uploadedFiles.value = [];
    message.value = "";
    alert("Медиа успешно отправлено!");
  } catch (error) {
    console.error("Ошибка при отправке медиа:", error.response?.data || error.message);
    alert("Ошибка отправки медиа!");
  }
};

const selectMedia = (media) => {
  selectedMedia.value = media;
  selectedGif.value = null; // Сбрасываем GIF при выборе видео/фото
};

    // const sendMedia = async () => {
    //   try {
    //     const media = uploadedFiles.value.map((file, index) => ({
    //       type: file.type.startsWith("image/") ? "photo" : "video",
    //       media: `attach://${file.file.name}`,
    //       caption: index === 0 ? message.value || " " : undefined,
    //       has_spoiler: options.spoilerMode,
    //     }));

    //     const formData = new FormData();
    //     formData.append("chat_id", channelStore.activeChannelId);
    //     formData.append("media", JSON.stringify(media));

    //     uploadedFiles.value.forEach((file) => {
    //       formData.append(file.file.name, file.file);
    //     });

    //     const response = await axios.post(
    //       `https://api.telegram.org/bot${botToken}/sendMediaGroup`,
    //       formData,
    //       { headers: { "Content-Type": "multipart/form-data" } }
    //     );

    //     console.log("Медиа успешно отправлено:", response.data);
    //     uploadedFiles.value = [];
    //     message.value = "";
    //     alert("Медиа успешно отправлено!");
    //   } catch (error) {
    //     console.error(
    //       "Ошибка при отправке медиа:",
    //       error.response?.data || error.message
    //     );
    //   }
    // };

    

    const clearSelectedGif = () => {
      console.log("Очистка выбранного GIF");
      selectedGif.value = null;
    };

    console.log("gifSearchQuery:", gifSearchQuery.value);
    console.log("offset:", offset.value);
    console.log("isLoading:", isLoading.value);
    console.log("uploadedFiles:", uploadedFiles.value);
    console.log("scheduledDate:", scheduledDate.value);
    console.log("scheduledTime:", scheduledTime.value);

    // const searchGifs = async () => {
    //   console.log("Поиск GIF начался с запросом:", gifSearchQuery.value);
    //   if (!gifSearchQuery.value.trim()) {
    //     console.warn("Пустой поисковый запрос!");
    //     searchResults.value = [];
    //     return;
    //   }

    //   try {
    //     const response = await axios.get(
    //       `https://api.giphy.com/v1/gifs/search`,
    //       {
    //         params: {
    //           api_key: "fADq5TfaTTfCcdSmI7jd3znNii8C1SqA",
    //           q: gifSearchQuery.value,
    //           limit: 49,
    //         },
    //       }
    //     );
    //     searchResults.value = response.data.data.map((gif) => ({
    //       ...gif,
    //       isSelected: false,
    //     }));
    //     console.log("Найдено GIF:", searchResults.value.length);
    //   } catch (error) {
    //     console.error(
    //       "Ошибка поиска GIF:",
    //       error.response?.data || error.message
    //     );
    //   }
    // };
    const searchGifs = async (loadMore = false) => {
      if (!gifSearchQuery.value.trim()) {
        console.warn("Пустой поисковый запрос!");
        searchResults.value = [];
        return;
      }

      if (!loadMore) {
        // Сбрасываем offset, если это новый запрос
        offset.value = 0;
        searchResults.value = [];
      }

      isLoading.value = true; // Показываем индикатор загрузки
      try {
        const response = await axios.get(
          `https://api.giphy.com/v1/gifs/search`,
          {
            params: {
              api_key: "fADq5TfaTTfCcdSmI7jd3znNii8C1SqA",
              q: gifSearchQuery.value,
              limit: 50,
              offset: offset.value, // Указываем текущий offset
            },
          }
        );

        const newResults = response.data.data.map((gif) => ({
          ...gif,
          isSelected: false,
        }));

        // Если это подгрузка, добавляем новые GIF в конец массива
        searchResults.value = [...searchResults.value, ...newResults];
        offset.value += 50; // Увеличиваем offset на 50
      } catch (error) {
        console.error(
          "Ошибка поиска GIF:",
          error.response?.data || error.message
        );
      } finally {
        isLoading.value = false; // Скрываем индикатор загрузки
      }
    };

    onMounted(() => {
      applyThemeToEmojiPicker();
    });

    watch(gifSearchQuery, () => {
      console.log("Обновление запроса GIF:", gifSearchQuery.value);
      searchGifs();
    });

    const selectGif = (gif) => {
  selectedGif.value = gif.images.original.url;
  selectedMedia.value = null; // Сбрасываем видео/фото при выборе GIF
};

    

    const updateImageLoadStatus = (id) => {
      nextTick(() => {
        imageLoadStatus.value[id] = true;
      });
    };

    const updateVideoLoadStatus = (id) => {
      nextTick(() => {
        videoLoadStatus.value[id] = true;
      });
    };

    const totalPages = computed(() => Math.ceil(mediaResults.value.length / mediaPerPage));
    const paginatedMedia = computed(() => {
      const start = (currentPage.value - 1) * mediaPerPage;
      return mediaResults.value.slice(start, start + mediaPerPage);
    });

    const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
    const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };

   
    const clearSelectedMedia = () => selectedMedia.value = null;

    
const resetAllFields = () => {
  message.value = "";
  selectedGif.value = null;
  selectedMedia.value = null;
  uploadedFiles.value = [];
};

const fetchMedia = async () => {
  if (!searchQuery.value.trim()) return;
  loading.value = true;
  try {
    const videoResponse = await axios.get("https://pixabay.com/api/videos/", {
      params: { key: "38493945-5c7d35b7bac4a53d9ead4ac6f", q: searchQuery.value, per_page: 50 },
    });

    const imageResponse = await axios.get("https://pixabay.com/api/", {
      params: { key: "38493945-5c7d35b7bac4a53d9ead4ac6f", q: searchQuery.value, image_type: "photo", per_page: 50 },
    });

    const videos = videoResponse.data.hits.map((video) => ({ id: video.id, type: "video", url: video.videos.medium.url }));
    const images = imageResponse.data.hits.map((image) => ({ id: image.id, type: "image", url: image.webformatURL }));

    mediaResults.value = [...videos, ...images];
  } catch (error) {
    console.error("Ошибка загрузки медиа:", error);
  } finally {
    loading.value = false;
  }
};
const sendMessage = async () => {
  if (!message.value.trim() && !selectedMedia.value && !selectedGif.value && uploadedFiles.value.length === 0) {
    alert("Добавьте текст или выберите медиа!");
    return;
  }

  try {
    const chatId = channelStore.activeChannelId || channelStore.channels[0]?.id;
    let formData = new FormData();
    formData.append("chat_id", chatId);

    const captionText = message.value.trim() ? message.value.trim() : " "; // ✅ Добавляет пробел, если текста нет

    if (selectedGif.value) {
      // 🟠 Отправка GIF
      await axios.post(`https://api.telegram.org/bot${botToken}/sendAnimation`, {
        chat_id: chatId,
        animation: selectedGif.value,
        caption: captionText, // ✅ Теперь отправляет даже без текста
        parse_mode: "HTML",
      });
      selectedGif.value = null;
    } else if (selectedMedia.value) {
      // 🟡 Отправка фото или видео
      const mediaType = selectedMedia.value.type === "video" ? "video" : "photo";
      await axios.post(`https://api.telegram.org/bot${botToken}/send${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}`, {
        chat_id: chatId,
        [mediaType]: selectedMedia.value.url,
        caption: captionText, // ✅ Теперь отправляет даже без текста
        parse_mode: "HTML",
        has_spoiler: options.spoilerMode, 
      });
      selectedMedia.value = null;
    } else if (uploadedFiles.value.length === 1) {
      // 🟢 Отправка одного файла
      const file = uploadedFiles.value[0].file;
      formData.append(file.type.startsWith("image/") ? "photo" : file.type.startsWith("video/") ? "video" : "audio", file);
      formData.append("caption", captionText); // ✅ Теперь отправляет даже без текста
      formData.append("has_spoiler", options.spoilerMode ? "true" : "false"); 

      await axios.post(`https://api.telegram.org/bot${botToken}/send${file.type.startsWith("image/") ? "Photo" : file.type.startsWith("video/") ? "Video" : "Audio"}`, formData);
    } else if (uploadedFiles.value.length > 1) {
      // 🔵 Отправка нескольких файлов как `mediaGroup`
      const media = uploadedFiles.value.map((file, index) => ({
        type: file.type.startsWith("image/") ? "photo" : file.type.startsWith("video/") ? "video" : "audio",
        media: `attach://${file.file.name}`,
        caption: index === 0 ? captionText : undefined, // ✅ Пробел, если текста нет
        has_spoiler: options.spoilerMode,
      }));
      formData.append("media", JSON.stringify(media));
      uploadedFiles.value.forEach((file) => {
        formData.append(file.file.name, file.file);
      });

      await axios.post(`https://api.telegram.org/bot${botToken}/sendMediaGroup`, formData);
    } else if (message.value.trim()) {
      // 🔴 Отправка только текста
      await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: message.value.trim(),
        parse_mode: "HTML",
      });
    }

    alert("Сообщение успешно отправлено!");
    resetAllFields();
  } catch (error) {
    console.error("Ошибка отправки в Telegram:", error.response?.data || error.message);
    alert("Ошибка отправки медиа!");
  }
};



    return { 
      
  //     loading, // Состояние загрузки
  // mediaResults, // Результаты поиска (все найденные медиа)
  // searchQuery,
  //     fetchMedia,
  //     paginatedMedia,
  //     loading,
  //     selectMedia,
  //     selectedMedia,
  //     clearSelectedMedia,
  //     sendMessage,
  //     message
  closeMediaGallery,
  videoLoadStatus,
  updateVideoLoadStatus,
  imageLoadStatus,
  updateImageLoadStatus,
  searchQuery,
      fetchMedia,
      paginatedMedia,
      loading,
      selectMedia,
      selectedMedia,
      clearSelectedMedia,
      sendMessage,
      message,
      currentPage,
      totalPages,
      prevPage,
      nextPage,
  mediaResults, // Результаты поиска (все найденные медиа)
  
  sendToTelegram, 
      clearSelectedGif,
      selectGif, // Добавил метод selectGif
      // searchGifs,
      selectedGif,
      gifSearchQuery,
      searchGifs, // Метод для поиска GIF
      offset, // Offset для подгрузки
      isLoading, // Состояние загрузки GIF

      isVideoRecording,
      recordedVideo,
      startVideoRecording,
      stopVideoRecording,
      clearRecordedVideo,

      theme,
      // emojiSearchQuery,
      canSendNow,
      toggleEmojiPicker,
      showEmojiPicker,
      scheduledDate,
      scheduledTime,
      // canSchedule,
      scheduleMessage,
      addEmoji,

      clearRecordedAudio,
      isRecording,
      recordedAudio,
      startRecording,
      stopRecording,
      pauseRecording,
      
      sendMedia,
      handleFileUpload,
      removeFile,
      resetAllFields,

      uploadedFiles,

      searchResults,

      options,
     
      closeGifResults,
    };
  },
};
</script>

<style scoped>
.media-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.media-item {
  /* width: 150px;
  height: 100px; */
  cursor: pointer;
  overflow: hidden;
  /* border-radius: 8px; */
  border: 2px solid transparent;
  transition: border-color 0.3s;
}

.media-item:hover {
  border-color: red;
}

.video-preview,
.image-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Стили для предпросмотра видео */
.selected-media-preview {
  text-align: center;
}

.preview-video,
.preview-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 10px;
}

.delete-media-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(220, 53, 69, 0.8);
  border: none;
  color: #fff;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-media-btn:hover {
  background-color: rgba(200, 35, 51, 0.9);
}
.pagination-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}






.gif-preview {
  position: relative; /* Устанавливаем позиционирование для наложения кнопки */
  display: inline-block;
}

.gif-preview img {
  display: block; /* Убираем лишние отступы вокруг картинки */
}

.delete-gif-btn {
  position: absolute; /* Абсолютное позиционирование внутри контейнера */
  top: 5px; /* Отступ сверху */
  right: 5px; /* Отступ справа */
  z-index: 10; /* Располагаем над GIF */
  background-color: rgba(220, 53, 69, 0.8); /* Полупрозрачный красный фон */
  border: none; /* Без границ */
  color: #fff; /* Белый цвет текста */
  padding: 5px; /* Отступы внутри кнопки */
  border-radius: 50%; /* Круглая форма кнопки */
  cursor: pointer; /* Курсор-указатель */
  transition: background-color 0.3s ease; /* Плавный эффект при наведении */
}

.delete-gif-btn:hover {
  background-color: rgba(200, 35, 51, 0.9); /* Более яркий цвет при наведении */
}

/* Общие стили для Emoji Picker */
.video-preview {
  width: 100%;
  max-width: 600px;
  border: 2px solid #ccc;
  border-radius: 8px;
}
.btn-primary {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 0.5em 1em;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.emoji-picker-container {
  background-color: transparent !important;
  /* max-width: 300px; */
  max-height: 400px;
  overflow-y: auto;
  /* border: 1px solid #ccc; */
  /* border-radius: 8px; */
  /* background-color: #fff; */
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  z-index: 1000;
}
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
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: var("@/assets/img/4vrobot.png");
  /* background-color: #276fb7; */
  box-shadow: 0 2px 9px rgba(86, 86, 86, 0.1);
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
  /* background-color: rgba(255, 0, 0, 0.8);
  color: #fff; */
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

.gif-item {
  border: 2px solid transparent;
  cursor: pointer;
}

.gif-item.selected {
  border-color: red;
}

/* Внутри <style> блока */
emoji-picker {
  --border-radius: 10px;
  --background: var(--bs-body-bg);
  --input-font-color: var(--bs-body-color);
}
@media screen and (max-width: 420px) {
  emoji-picker {
    --num-columns: 7;
    --category-emoji-size: 1.125 rem;
  }
}
@media screen and (max-width: 335px) {
  emoji-picker {
    --num-columns: 6;
    --category-emoji-size: 1.2 rem;
    /* --emoji-size:3 rem; */
  }
}
</style>
