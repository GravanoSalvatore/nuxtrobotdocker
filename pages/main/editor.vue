<template>
  <div class="media-editor-container">
    <div class="editor-wrapper">
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

        <div class="position-relative">
          <div
            v-if="showEmojiPicker"
            class="emoji-picker-container mt-2 d-flex justify-content-center align-items-center"
          >
            <emoji-picker
              style="z-index: 10000; top: 0; left: 0"
              class="custom-emoji-picker position-absolute"
              @emoji-click="addEmoji"
            ></emoji-picker>
          </div>
        </div>
      </client-only>

      <div class="media-controls mt-3">
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
          <button class="btn-danger1" @click="openPreviewModal">
  Top 20 Crypto <i class="bi bi-bar-chart"></i>
</button>


<div v-if="showPreviewModal" class="modal-overlay">
  <div class="modal-content"  style="position:relative;">
    <i
          style=""
          @click="closePreviewModal"
          class="bi bi-x-circle pointer close-icon"
        ></i>
    <!-- <button @click="closePreviewModal" class="btn btn-danger"> Закрыть</button> -->
    <h4 class="text-center"> TOP-30 Cryptocurrency</h4>
    <ul class="crypto-list">
  <li v-for="coin in top10Preview" :key="coin.rank">
    <img :src="coin.image" :alt="coin.name" class="crypto-icon" />
    <span class="crypto-rank">#{{ coin.rank }}</span>
    <span class="crypto-name">{{ coin.name }} ({{ coin.symbol }})</span>
    <span  
            class="crypto-price">💰 {{ coin.price }}</span>
    <span class="crypto-market-cap">🏦 {{ coin.marketCap }}</span>
    <span class="crypto-volume">📊 Объём 24ч: {{ coin.volume24h }}</span> <!-- ✅ Добавлено -->

    <span
      class="crypto-change"
      :class="{ 'positive': coin.change24h >= 0, 'negative': coin.change24h < 0 }"
    >
    📈 {{ coin.change24h }}%
    </span>
  </li>
</ul>

    <div class="modal-buttons">
      <button @click="sendTop10ToTelegram" class="btn btn-danger1">   Send to Telegram</button>

    </div>
  </div>
</div>




          <button class="btn-danger1" @click="scheduleMessage">
            Delayed sending <i class="bi bi-send"></i>
          </button>

          <button
            @click="sendMessage"
            class="btn-danger1"
            :disabled="!canSendNow"
          >
            Send to Telegram
            <i class="bi bi-send ml-1"></i>
          </button>
        </div>
      </div>

      <input
        v-model="searchQuery"
        @input="fetchMedia"
        placeholder="Search video or image..."
        class="form-control mt-2 mb-2"
      />
    


      <div v-if="loading" class="text-center">
        <p>Loading media...</p>
      </div>

      <div v-else>
        <div v-if="selectedMedia" class="selected-media-preview mt-3">
          <h3>Selected Media:</h3>
          <div class="position-relative">
            <video
              v-if="selectedMedia.type === 'video'"
              :src="selectedMedia.url"
              controls
              class="preview-video"
            ></video>
            <img v-else :src="selectedMedia.url" class="preview-image" />
            <i
              style="position: absolute; right: -20px; top: 0"
              v-if="paginatedMedia.length"
              @click="clearSelectedMedia"
              class="bi bi-x-circle pointer"
            ></i>
          </div>
        </div>

        <div style="position: relative">
          <i
            style="position: absolute; right: -20px; top: 0"
            v-if="paginatedMedia.length"
            @click="closeMediaGallery"
            class="bi bi-x-circle pointer"
          ></i>
          <div v-if="paginatedMedia.length" class="media-gallery">
            <div
              v-for="media in paginatedMedia"
              :key="media.id"
              class="media-item"
              @click="selectMedia(media)"
            >
              <video
                v-if="media.type === 'video'"
                :src="media.url"
                controls
                class="video-preview"
                @loadedmetadata="updateVideoLoadStatus(media.id)"
              ></video>
              <img
                v-else-if="media.type === 'image'"
                :src="media.url"
                class="image-preview"
                @load="updateImageLoadStatus(media.id)"
              />
            </div>
          </div>

          <div v-if="paginatedMedia.length" class="pagination-controls">
            <span
              @click="prevPage"
              :disabled="currentPage === 1"
              class="pointer"
              >&laquo;
            </span>
            <span> {{ currentPage }} / {{ totalPages }}</span>
            <span
              @click="nextPage"
              :disabled="currentPage >= totalPages"
              class="pointer"
            >
              &raquo;</span
            >
          </div>
        </div>
      </div>

      <input
        type="text"
        v-model="gifSearchQuery"
        class="form-control mt-2"
        placeholder="Search GIF..."
      />

      <div class="schedule-controls mt-2">
        <input
          id="schedule-date"
          type="date"
          class="form-control"
          v-model="scheduledDate"
        />

        <input
          id="schedule-time"
          type="time"
          class="form-control mt-2"
          v-model="scheduledTime"
        />
      </div>

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

          <video
            v-else-if="file.type.startsWith('video/')"
            controls
            class="video-preview"
          >
            <source :src="file.preview" :type="file.type" />
          </video>

          <audio
            v-else-if="file.type.startsWith('audio/')"
            controls
            class="audio-previe"
          >
            <source :src="file.preview" :type="file.type" />
          </audio>

          <button
            @click="removeFile(index)"
            class="btn btn-danger btn-sm remove-file-btn"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>

      <div v-if="selectedGif" class="gif-preview mt-3 position-relative">
        <img
          :src="selectedGif"
          alt="Selected GIF"
          class="img-thumbnail"
          style="max-width: 100%; border: 1px solid #ccc; border-radius: 8px"
        />

        <i
          style="position: absolute; right: -20px; top: 0"
          @click="clearSelectedGif"
          class="bi bi-x-circle pointer"
        ></i>
      </div>

      <div style="position: relative" class="gif-search mt-3">
        <i
          style="position: absolute; right: -20px; top: 0"
          class="bi bi-x-circle pointer"
          v-if="searchResults.length"
          @click="closeGifResults"
        ></i>

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
          <i
            style="position: absolute; right: -20px; top: 0"
            v-if="searchResults.length"
            @click="closeGifResults"
          ></i>
        </div>
      </div>
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
    const searchQuery = ref("");
    const loading = ref(false);
    const imageLoadStatus = ref({});
    const videoLoadStatus = ref({});

    const showPreviewModal = ref(false);
const top10Preview = ref([]);

// const fetchTop10Cryptos = async () => {
//   try {
//     const response = await axios.get(
//       "https://api.coingecko.com/api/v3/coins/markets",
//       {
//         params: {
//           vs_currency: "usd",
//           order: "market_cap_desc",
//           per_page: 50,
//           page: 1,
//           sparkline: false,
//         },
//       }
//     );

//     return response.data.map((coin, index) => ({
//       rank: index + 1,
//       name: coin.name,
//       symbol: coin.symbol.toUpperCase(),
//       price: `$${coin.current_price.toLocaleString()}`,
//       marketCap: `$${(coin.market_cap / 1e9).toFixed(2)}B`,
//       image: coin.image, // Добавляем иконку криптовалюты
//     }));
//   } catch (error) {
//     console.error("Ошибка получения топ-10 криптовалют:", error);
//     return [];
//   }
// };
const fetchTop10Cryptos = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 20,
          page: 1,
          sparkline: false,
          price_change_percentage: "24h",
        },
      }
    );

    return response.data.map((coin, index) => ({
      rank: index + 1,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: `$${coin.current_price.toLocaleString()}`,
      marketCap: `$${(coin.market_cap / 1e9).toFixed(2)}B`,
      volume24h: `$${(coin.total_volume / 1e9).toFixed(2)}B`, // 🆕 Добавлен объём торгов
      image: coin.image, // Логотип криптовалюты
      change24h: coin.price_change_percentage_24h
        ? coin.price_change_percentage_24h.toFixed(2)
        : "0.00", // Процент изменения цены за 24 часа
    }));
  } catch (error) {
    console.error("Ошибка получения топ-20 криптовалют:", error);
    return [];
  }
};

const openPreviewModal = async () => {
  console.log("Открытие модального окна...");
  top10Preview.value = await fetchTop10Cryptos();
  console.log("Загруженные данные:", top10Preview.value);

  if (top10Preview.value.length > 0) {
    showPreviewModal.value = true;
  } else {
    alert("Не удалось загрузить данные о криптовалютах.");
  }
};


const closePreviewModal = () => {
  showPreviewModal.value = false;
};

// const sendTop10ToTelegram = async () => {
//   try {
//     const chatId = channelStore.activeChannelId || channelStore.channels[0]?.id;
//     if (!chatId) {
//       alert("Выберите канал для отправки!");
//       return;
//     }

//     let messageText = "📊 *ТОП-50 Криптовалют по капитализации*\n\n";
//     top10Preview.value.forEach((coin) => {
//       messageText += `#*${coin.rank}* *${coin.name}* (${coin.symbol})\n💰 Цена: ${coin.price}\n🏦 Капитализация: ${coin.marketCap}\n\n`;
//     });

//     await axios.post(
//       `https://api.telegram.org/bot${channelStore.botToken}/sendMessage`,
//       {
//         chat_id: chatId,
//         text: messageText,
//         parse_mode: "Markdown",
//       }
//     );

//     alert("Топ-50 криптовалют отправлен в Telegram!");
//     closePreviewModal();
//   } catch (error) {
//     console.error("Ошибка отправки топ-10 криптовалют:", error);
//     alert("Ошибка отправки данных в Telegram!");
//   }
// };

// const sendTop10ToTelegram = async () => {
//   try {
//     const chatId = channelStore.activeChannelId || channelStore.channels[0]?.id;
//     if (!chatId) {
//       alert("Выберите канал для отправки!");
//       return;
//     }

//     let messageText = "📊 *ТОП-50 Криптовалют по капитализации*\n\n";
//     top10Preview.value.forEach((coin) => {
//       const changeColor = coin.change24h >= 0 ? "🟢" : "🔴"; // Зелёный если +, Красный если -
//       const trendIcon = coin.change24h >= 0 ? "📈" : "📉"; // График 📈 или 📉
      
//       messageText += `#*${coin.rank}* *${coin.name}* (${coin.symbol})\n`;
//       messageText += `💰 Цена: ${coin.price}\n`;
//       messageText += `🏦 Капитализация: ${coin.marketCap}\n`;
//       messageText += `📊 24ч: ${trendIcon} ${changeColor} ${coin.change24h}%\n\n`;
//     });

//     await axios.post(
//       `https://api.telegram.org/bot${channelStore.botToken}/sendMessage`,
//       {
//         chat_id: chatId,
//         text: messageText,
//         parse_mode: "Markdown",
//       }
//     );

//     alert("Топ-50 криптовалют отправлен в Telegram!");
//     closePreviewModal();
//   } catch (error) {
//     console.error("Ошибка отправки топ-50 криптовалют:", error);
//     alert("Ошибка отправки данных в Telegram!");
//   }
// };


const sendTop10ToTelegram = async () => {
  try {
    const chatId = channelStore.activeChannelId || channelStore.channels[0]?.id;
    if (!chatId) {
      alert("Выберите канал для отправки!");
      return;
    }

    let messageText = "📊 *TOP-20*\n\n";
    top10Preview.value.forEach((coin) => {
      const changeColor = coin.change24h >= 0 ? "🟢" : "🔴"; // Красный 📈 (рост), Зелёный 📉 (падение)
      // const trendIcon = coin.change24h >= 0 ? "📈" : "📉"; 

      messageText += `*${coin.rank}. ${coin.name} (${coin.symbol})*\n`;
      messageText += `💰 Price: ${coin.price}\n`;
      messageText += `📊 Volume 24h: ${coin.volume24h}\n`; // ✅ Добавлен объём торгов
      messageText += `🏦 Market Cap: ${coin.marketCap}\n`;
      
      messageText += `📈 Change 24h:  ${changeColor} ${coin.change24h}%\n\n`;
    });

    await axios.post(
      `https://api.telegram.org/bot${channelStore.botToken}/sendMessage`,
      {
        chat_id: chatId,
        text: messageText,
        parse_mode: "Markdown",
      }
    );

    alert("Топ-20 криптовалют отправлен в Telegram!");
    closePreviewModal();
  } catch (error) {
    console.error("Ошибка отправки топ-20 криптовалют:", error);
    alert("Ошибка отправки данных в Telegram!");
  }
};













    const closeMediaGallery = () => {
      mediaResults.value = [];
    };

    const isVideoRecording = ref(false);
    const recordedVideo = ref(null);
    // let videoRecorder = null;
    // let videoStream = null;
    // let videoChunks = [];

    const canSendNow = computed(() => {
      return (
        message.value.trim().length > 0 ||
        selectedGif.value ||
        selectedMedia.value ||
        uploadedFiles.value.length > 0
      );
    });

    const sendToTelegram = async () => {
      if (!selectedMedia.value) return;

      try {
        let payload = {
          chat_id: chatId.value,
          parse_mode: "HTML",
        };

        if (selectedMedia.value.type === "video") {
          payload.video = selectedMedia.value.url;
          payload.caption = `🔥🔥🔥 <b>${message.value.trim()}</b>`;
          await axios.post(
            `https://api.telegram.org/bot${channelStore.botToken}/sendVideo`,
            payload
          );
        } else {
          payload.photo = selectedMedia.value.url;
          payload.caption = message.value.trim();
          await axios.post(
            `https://api.telegram.org/bot${channelStore.botToken}/sendPhoto`,
            payload
          );
        }

        alert("Media sent to Telegram!");
        selectedMedia.value = null;
        message.value = "";
      } catch (error) {
        console.error("Ошибка отправки в Telegram:", error);
        alert("Ошибка отправки медиа!");
      }
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

    // let audioChunks = [];

    const sendMedia = async () => {
      if (uploadedFiles.value.length === 0) {
        alert("Выберите файл перед отправкой!");
        return;
      }

      try {
        const chatId =
          channelStore.activeChannelId || channelStore.channels[0]?.id;
        let formData = new FormData();

        formData.append("chat_id", chatId);

        if (uploadedFiles.value.length === 1) {
          // Если один файл — отправляем как фото, видео или аудио
          const file = uploadedFiles.value[0].file;
          formData.append(
            file.type.startsWith("image/")
              ? "photo"
              : file.type.startsWith("video/")
                ? "video"
                : "audio",
            file
          );
        } else {
          // Если несколько файлов — отправляем как `mediaGroup`
          const media = uploadedFiles.value.map((file, index) => ({
            type: file.type.startsWith("image/")
              ? "photo"
              : file.type.startsWith("video/")
                ? "video"
                : "audio",
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
        console.error(
          "Ошибка при отправке медиа:",
          error.response?.data || error.message
        );
        alert("Ошибка отправки медиа!");
      }
    };

    const selectMedia = (media) => {
      selectedMedia.value = media;
      selectedGif.value = null; // Сбрасываем GIF при выборе видео/фото
    };

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
        offset.value += 100; // Увеличиваем offset на 50
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

    const totalPages = computed(() =>
      Math.ceil(mediaResults.value.length / mediaPerPage)
    );
    const paginatedMedia = computed(() => {
      const start = (currentPage.value - 1) * mediaPerPage;
      return mediaResults.value.slice(start, start + mediaPerPage);
    });

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };
    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };

    const clearSelectedMedia = () => (selectedMedia.value = null);

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
        const videoResponse = await axios.get(
          "https://pixabay.com/api/videos/",
          {
            params: {
              key: "38493945-5c7d35b7bac4a53d9ead4ac6f",
              q: searchQuery.value,
              per_page: 50,
            },
          }
        );

        const imageResponse = await axios.get("https://pixabay.com/api/", {
          params: {
            key: "38493945-5c7d35b7bac4a53d9ead4ac6f",
            q: searchQuery.value,
            image_type: "photo",
            per_page: 50,
          },
        });

        const videos = videoResponse.data.hits.map((video) => ({
          id: video.id,
          type: "video",
          url: video.videos.medium.url,
        }));
        const images = imageResponse.data.hits.map((image) => ({
          id: image.id,
          type: "image",
          url: image.webformatURL,
        }));

        mediaResults.value = [...videos, ...images];
      } catch (error) {
        console.error("Ошибка загрузки медиа:", error);
      } finally {
        loading.value = false;
      }
    };
    const sendMessage = async () => {
      if (
        !message.value.trim() &&
        !selectedMedia.value &&
        !selectedGif.value &&
        uploadedFiles.value.length === 0
      ) {
        alert("Добавьте текст или выберите медиа!");
        return;
      }

      try {
        const chatId =
          channelStore.activeChannelId || channelStore.channels[0]?.id;
        let formData = new FormData();
        formData.append("chat_id", chatId);

        const captionText = message.value.trim() ? message.value.trim() : " "; // ✅ Добавляет пробел, если текста нет

        if (selectedGif.value) {
          // 🟠 Отправка GIF
          await axios.post(
            `https://api.telegram.org/bot${botToken}/sendAnimation`,
            {
              chat_id: chatId,
              animation: selectedGif.value,
              caption: captionText, // ✅ Теперь отправляет даже без текста
              parse_mode: "HTML",
            }
          );
          selectedGif.value = null;
        } else if (selectedMedia.value) {
          // 🟡 Отправка фото или видео
          const mediaType =
            selectedMedia.value.type === "video" ? "video" : "photo";
          await axios.post(
            `https://api.telegram.org/bot${botToken}/send${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}`,
            {
              chat_id: chatId,
              [mediaType]: selectedMedia.value.url,
              caption: captionText, // ✅ Теперь отправляет даже без текста
              parse_mode: "HTML",
              has_spoiler: options.spoilerMode,
            }
          );
          selectedMedia.value = null;
        } else if (uploadedFiles.value.length === 1) {
          // 🟢 Отправка одного файла
          const file = uploadedFiles.value[0].file;
          formData.append(
            file.type.startsWith("image/")
              ? "photo"
              : file.type.startsWith("video/")
                ? "video"
                : "audio",
            file
          );
          formData.append("caption", captionText); // ✅ Теперь отправляет даже без текста
          formData.append(
            "has_spoiler",
            options.spoilerMode ? "true" : "false"
          );

          await axios.post(
            `https://api.telegram.org/bot${botToken}/send${file.type.startsWith("image/") ? "Photo" : file.type.startsWith("video/") ? "Video" : "Audio"}`,
            formData
          );
        } else if (uploadedFiles.value.length > 1) {
          // 🔵 Отправка нескольких файлов как `mediaGroup`
          const media = uploadedFiles.value.map((file, index) => ({
            type: file.type.startsWith("image/")
              ? "photo"
              : file.type.startsWith("video/")
                ? "video"
                : "audio",
            media: `attach://${file.file.name}`,
            caption: index === 0 ? captionText : undefined, // ✅ Пробел, если текста нет
            has_spoiler: options.spoilerMode,
          }));
          formData.append("media", JSON.stringify(media));
          uploadedFiles.value.forEach((file) => {
            formData.append(file.file.name, file.file);
          });

          await axios.post(
            `https://api.telegram.org/bot${botToken}/sendMediaGroup`,
            formData
          );
        } else if (message.value.trim()) {
          // 🔴 Отправка только текста
          await axios.post(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
              chat_id: chatId,
              text: message.value.trim(),
              parse_mode: "HTML",
            }
          );
        }

        alert("Сообщение успешно отправлено!");
        resetAllFields();
      } catch (error) {
        console.error(
          "Ошибка отправки в Telegram:",
          error.response?.data || error.message
        );
        alert("Ошибка отправки медиа!");
      }
    };

    return {
     
      showPreviewModal, // Добавляем флаг отображения модального окна
  top10Preview, // Добавляем список криптовалют
  openPreviewModal, // Метод открытия модального окна
  closePreviewModal, // Метод закрытия модального окна
  sendTop10ToTelegram, // Метод отправки в Telegram
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
      // startVideoRecording,
      // stopVideoRecording,
      // clearRecordedVideo,

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

      // clearRecordedAudio,
      // isRecording,
      // recordedAudio,
      // startRecording,
      // stopRecording,
      // pauseRecording,

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
.crypto-change {
  font-weight: bold;
  margin-left: 10px;
}

.positive {
  color: green;
}

.negative {
  color: red;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  /* color: red; */
  cursor: pointer;
  transition: 0.3s;
}

.close-icon:hover {
  color: red;
}


.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--bs-body-bg);
  /* background: white; */
  padding: 10px;
  border-radius: 10px;
  max-width: 600px;
  max-height: 80vh; /* Ограничиваем высоту окна */
  overflow-y: auto; /* Добавляем прокрутку */
  /* text-align: center; */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Делаем список криптовалют более удобным */
.crypto-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.crypto-list li {
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

.crypto-icon {
  width: 30px;
  height: 30px;
}
@media screen and (max-width: 500px){
  .crypto-list li {
  font-size: 10px;
 
}
.crypto-icon {
  width: 20px;
  height: 20px;
}
}
.modal-buttons {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
}




.crypto-rank {
  font-weight: bold;
  /* color: #333; */
}

.crypto-name {
  flex-grow: 1;
}

.crypto-price {
  font-weight: bold;
  color: cornflowerblue;
}

.crypto-market-cap {
  font-size: 0.9em;
  /* color: #777; */
}

.modal-buttons {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
}





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
  border-color: rgb(14, 113, 166);
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
  border-color: rgb(14, 113, 166);
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
