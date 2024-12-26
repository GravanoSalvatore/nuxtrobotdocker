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

    

      <!-- Кнопка отображения Emoji Picker -->
      <client-only>
        <i
          style="color: cornflowerblue"
          @click="toggleEmojiPicker"
          class="bi pointer"
          :class="showEmojiPicker ? 'bi-x-circle' : 'bi-emoji-smile'"
        ></i>

        <!-- Emoji Picker -->
        <div  class= "position-relative"> 
        <div
          v-if="showEmojiPicker"
          class= " emoji-picker-container mt-2 d-flex justify-content-center align-items-center"
        >
        
          <emoji-picker
          style="z-index: 10000;top:0"
            class="custom-emoji-picker position-absolute "
            @emoji-click="addEmoji"
          ></emoji-picker>
        </div>
        </div>
      </client-only>
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

        <audio
          style="
            max-width: 200px;
            height: 30px;
            padding-right: 15px;
            background-color: transparent !important;
          "
          :src="recordedAudio"
          controls
        ></audio>
      </div>
      <svg
        class=""
        v-if="searchResults.length"
        @click="closeGifResults"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
        />
      </svg>
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
            class="btn-danger3 btn-sm flex-grow-1"
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
            class="btn-danger3 btn-sm dropdown-toggle flex-grow-1"
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

          <button
            @click="startRecording"
            :disabled="isRecording"
            class="btn-danger3 btn-sm flex-grow-1"
          >
            <i class="bi bi-mic"></i> Record
          </button>

          <button
            @click="pauseRecording"
            :disabled="!isRecording"
            class="btn-danger3 btn-sm flex-grow-1"
          >
            <i class="bi bi-pause"></i> Pause
          </button>

          <button
            @click="stopRecording"
            :disabled="!isRecording"
            class="btn-danger3 btn-sm flex-grow-1"
          >
            <i class="bi bi-stop"></i> Stop
          </button>

          <!-- Кнопка для отправки отложенного сообщения -->
          <button class="btn-danger3" @click="scheduleMessage">
            Cron <i class="bi bi-send"></i>
          </button>
          <!-- Кнопка отправки -->
          <button
            @click="sendMessage"
            class="btn-danger3 ms-2"
            :disabled="!message && !uploadedFiles.length"
          >
            <i class="bi bi-send ml-1"></i>
          </button>
        </div>
      </div>

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
    // const emojiSearchQuery = ref('');
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

    const canSendNow = computed(() => {
      return message.value.trim().length > 0 || uploadedFiles.value.length > 0;
    });

    // Метод запланированной отправки сообщения
    const scheduleMessage = async () => {
      if (!isScheduleValid.value) {
        alert("Добавьте текст или файл и укажите дату и время!");
        return;
      }

      const scheduledAt = `${scheduledDate.value}T${scheduledTime.value}`;
      const payload = {
        message: message.value.trim(),
        scheduledAt,
        botToken: channelStore.botToken,
        chatId: channelStore.activeChannelId || channelStore.channels[0]?.id,
        files: uploadedFiles.value.map((file) => ({
          name: file.file.name,
          type: file.type,
        })),
      };

      console.log(
        "Отправка на сервер с данными:",
        JSON.stringify(payload, null, 2)
      );

      try {
        const response = await axios.post("/api/schedule", payload);
        console.log("Ответ от сервера:", response.data);
        alert(response.data.message || "Сообщение успешно запланировано!");
        clearInputs();
      } catch (error) {
        console.error(
          "Ошибка при планировании:",
          error.response?.data || error.message
        );
        alert("Ошибка планирования. Проверьте данные и повторите.");
      }
    };

    // Метод загрузки файлов
    const handleFileUpload = (event) => {
      const files = Array.from(event.target.files);
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

    const sendMessage = async () => {
      try {
        // Проверка: является ли сообщение отложенным
        if (isScheduleValid.value) {
          const scheduledAt = `${scheduledDate.value}T${scheduledTime.value}`;
          const payload = {
            chat_id: channelStore.activeChannelId,
            message: message.value || "",
            files: uploadedFiles.value.map((file) => ({
              name: file.file.name,
              type: file.type,
            })),
            gif: selectedGif.value || null,
            audio: recordedAudio.value || null,
            scheduledAt, // Дата и время отправки
            options,
          };

          console.log("Планирование сообщения:", payload);

          // Отправка запроса для планирования сообщения
          const response = await axios.post("/api/schedule", payload);
          alert(response.data.message || "Сообщение успешно запланировано!");
          resetAllFields();
          return;
        }

        // Проверка: есть ли загруженные файлы для отправки
        if (uploadedFiles.value.length > 0) {
          console.log("Отправка медиафайлов в Telegram");
          const media = uploadedFiles.value.map((file, index) => ({
            type: file.type.startsWith("image/") ? "photo" : "video",
            media: `attach://${file.file.name}`,
            caption: index === 0 ? message.value || " " : undefined,
            has_spoiler: options.spoilerMode,
          }));

          const formData = new FormData();
          formData.append("chat_id", channelStore.activeChannelId);
          formData.append("media", JSON.stringify(media));

          uploadedFiles.value.forEach((file) => {
            formData.append(file.file.name, file.file);
          });

          const response = await axios.post(
            `https://api.telegram.org/bot${botToken}/sendMediaGroup`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );

          console.log("Медиа успешно отправлено:", response.data);
          uploadedFiles.value = [];
          message.value = "";
          alert("Медиа успешно отправлено!");
          return;
        }

        // Проверка: отправка GIF
        if (selectedGif.value) {
          const payload = {
            chat_id: channelStore.activeChannelId,
            animation: selectedGif.value,
            caption: message.value.trim() || " ",
            disable_web_page_preview: !options.sendWithPreview,
          };

          console.log("Отправка GIF с данными:", payload);

          await axios.post(
            `https://api.telegram.org/bot${botToken}/sendAnimation`,
            payload
          );

          alert("GIF успешно отправлен!");
          selectedGif.value = null;
          message.value = "";
          return;
        }

        // Проверка: отправка аудиофайлов
        if (recordedAudio.value) {
          console.log("Отправка аудио в Telegram");

          const formData = new FormData();
          formData.append("chat_id", channelStore.activeChannelId);
          const audioFile =
            uploadedFiles.value[0]?.file || new Blob([recordedAudio.value]);

          formData.append("audio", audioFile, "recorded-audio.mp3");
          formData.append("performer", "Voice Recorder");
          formData.append("title", "Запись с диктофона");
          formData.append("caption", message.value || "Аудиозапись");

          try {
            const thumbnailBlob = await fetch("../assets/img/4vrobot.png").then(
              (res) => res.blob()
            );
            formData.append("thumb", thumbnailBlob, "thumbnail.jpg");
          } catch (error) {
            console.warn("Ошибка загрузки превью:", error.message);
          }

          const response = await axios.post(
            `https://api.telegram.org/bot${botToken}/sendAudio`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );

          console.log("Аудио успешно отправлено:", response.data);
          recordedAudio.value = null;
          alert("Аудио успешно отправлено!");
          return;
        }

        // Проверка: отправка текстового сообщения
        if (message.value.trim()) {
          const payload = {
            chat_id: channelStore.activeChannelId,
            text: message.value,
            disable_web_page_preview: !options.sendWithPreview,
          };

          await axios.post(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            payload
          );

          alert("Сообщение успешно отправлено!");
          message.value = "";
          return;
        }

        console.warn("Нет данных для отправки!");
      } catch (error) {
        console.error(
          "Ошибка отправки:",
          error.response?.data || error.message
        );
        alert(
          "Произошла ошибка при отправке. Проверьте данные и повторите попытку."
        );
      }
    };

    const sendMedia = async () => {
      try {
        const media = uploadedFiles.value.map((file, index) => ({
          type: file.type.startsWith("image/") ? "photo" : "video",
          media: `attach://${file.file.name}`,
          caption: index === 0 ? message.value || " " : undefined,
          has_spoiler: options.spoilerMode,
        }));

        const formData = new FormData();
        formData.append("chat_id", channelStore.activeChannelId);
        formData.append("media", JSON.stringify(media));

        uploadedFiles.value.forEach((file) => {
          formData.append(file.file.name, file.file);
        });

        const response = await axios.post(
          `https://api.telegram.org/bot${botToken}/sendMediaGroup`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        console.log("Медиа успешно отправлено:", response.data);
        uploadedFiles.value = [];
        message.value = "";
        alert("Медиа успешно отправлено!");
      } catch (error) {
        console.error(
          "Ошибка при отправке медиа:",
          error.response?.data || error.message
        );
      }
    };

    const resetAllFields = () => {
      message.value = "";
      uploadedFiles.value = [];
      gifSearchQuery.value = "";
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
        const response = await axios.get(
          `https://api.giphy.com/v1/gifs/search`,
          {
            params: {
              api_key: "fADq5TfaTTfCcdSmI7jd3znNii8C1SqA",
              q: gifSearchQuery.value,
              limit: 49,
            },
          }
        );
        searchResults.value = response.data.data.map((gif) => ({
          ...gif,
          isSelected: false,
        }));
        console.log("Найдено GIF:", searchResults.value.length);
      } catch (error) {
        console.error(
          "Ошибка поиска GIF:",
          error.response?.data || error.message
        );
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
      console.log("GIF выбран:", gif);
      selectedGif.value = gif.images.original.url;
    };

    return {
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
      closeGifResults,
    };
  },
};
</script>

<style scoped>
/* Общие стили для Emoji Picker */

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

.btn-danger1 {
  /* background-color: #dc3545;
  color: #fff; */
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
