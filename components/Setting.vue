<!-- <template>
  <div class="form">
    
    <form @submit.prevent="handleAddChannel" class="mb-4">
      <div class="mb-3">
        <input
          type="text"
          id="chatId"
          v-model="newChatId"
          class="form-control"
          placeholder="Введите Telegram Chat ID"
          required
        />
      </div>
      <div class="mb-3">
        <input
          type="text"
          id="channelName"
          v-model="newChannelName"
          class="form-control"
          placeholder="Введите название канала"
          required
        />
      </div>
      
      <button
        v-if="newChatId.trim() !== '' && newChannelName.trim() !== ''"
        style="background-color: transparent; border: none;"
        type="submit"
        class=""
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 16 16"
        >
          <g fill="none">
            <path
              fill="url(#fluentColorCheckmarkCircle160)"
              d="M2 8a6 6 0 1 1 12 0A6 6 0 0 1 2 8"
            />
            <path
              fill="url(#fluentColorCheckmarkCircle161)"
              d="M10.12 6.164L7.25 9.042L5.854 7.646a.5.5 0 1 0-.708.708l1.75 1.75a.5.5 0 0 0 .708 0l3.224-3.234a.5.5 0 0 0-.708-.706"
            />
            <defs>
              <linearGradient
                id="fluentColorCheckmarkCircle160"
                x1="2.429"
                x2="10.71"
                y1="4.25"
                y2="12.854"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#52D17C" />
                <stop offset="1" stop-color="#22918B" />
              </linearGradient>
              <linearGradient
                id="fluentColorCheckmarkCircle161"
                x1="6.12"
                x2="7.076"
                y1="6.449"
                y2="11.21"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#fff" />
                <stop offset="1" stop-color="#E3FFD9" />
              </linearGradient>
            </defs>
          </g>
        </svg>
      </button>
    </form>

   
    <div v-if="channels.length > 0" class="card mt-4">
      <ul class="list-group list-group-flush">
        <li
          v-for="(channel, index) in channels"
          :key="index"
          class="list-group-item d-flex justify-content-between align-items-center"
          :class="{ 'active-channel': activeChannelId === channel.id }"
        >
         
          <span
            @click="handleSelectChannel(channel.id)"
            style="cursor: pointer; font-size: 12px;"
          >
          <img
            :src="channel.photo || defaultPhoto"
            alt="Фото канала"
            class="rounded-circle me-2"
            width="70"
            height="70"
          />
            <strong style="text-decoration: underline;">{{ channel.name }}</strong><br/>
            <strong style="color:cornflowerblue">  Описание: </strong>{{ channel.description || 'Нет описания' }}<br/>
            <strong style="color:cornflowerblue"> Подписчиков:</strong> {{ channel.subscribers }}<br/>
            
            <strong style="color:cornflowerblue">Администраторов:</strong> {{ channel.admins || 0 }}<br/>
           
            <strong style="color:cornflowerblue">Дата создания:</strong> {{ channel.creationDate || 'Неизвестно' }}<br/>
          </span>

          <div>
            <i style="font-size: 11px;" @click="handleRemoveChannel(index)" class="bi bi-x-circle pointer"></i>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Каналов ещё нет. Добавьте новый канал выше.</p>
    </div>
  </div>
</template>

<script>
import { onUnmounted } from "vue";
import { useChannelStore } from "@/stores/channelStore";
import { ref, onMounted, computed } from "vue";
import axios from "axios";

export default {
  setup() {
    const channelStore = useChannelStore();
    const newChatId = ref("");
    const newChannelName = ref("");
    let updateInterval = null;
    const channels = computed(() => channelStore.channels);
    const activeChannelId = computed(() => channelStore.activeChannelId);
    const defaultPhoto = ref("https://static-00.iconduck.com/assets.00/user-avatar-frankenstein-icon-511x512-dtbz515o.png");

    // Удаление канала
    const handleRemoveChannel = (index) => {
      channelStore.removeChannel(index);
    };

    // Выбор канала
    const handleSelectChannel = (channelId) => {
      channelStore.setActiveChannel(channelId);
    };

    // Добавление нового канала
    const handleAddChannel = async () => {
      if (newChatId.value.trim() !== "" && newChannelName.value.trim() !== "") {
        console.log("Добавление канала:", newChatId.value, newChannelName.value);

        const photo = await fetchChannelPhoto(newChatId.value.trim());
        const subscribers = await fetchChannelSubscribers(newChatId.value.trim());
        const info = await fetchChannelInfo(newChatId.value.trim());

        console.log("Информация о канале:", info);

        channelStore.addChannel({
          id: newChatId.value.trim(),
          name: newChannelName.value.trim(),
          photo: photo || defaultPhoto.value,
          subscribers: subscribers || 0,
          creationDate: info.creationDate || null,
          channelType: info.channelType || "unknown",
          status: info.status || "unknown",
          admins: info.admins || 0,
          messages: info.messages || 0,
          description: info.description || "Без описания",
          lastActive: info.lastActive || "Неизвестно",
          language: info.language || "Неизвестно",
          public: info.public || false,
          activityLevel: info.activityLevel || "unknown",
          growthRate: info.growthRate || "unknown",
          updateFrequency: info.updateFrequency || "неизвестно",
        });

        // Очистка полей
        newChatId.value = "";
        newChannelName.value = "";
      }
    };

    // Получение фото канала
    const fetchChannelPhoto = async (chatId) => {
      try {
        const chatResponse = await axios.get(
          `https://api.telegram.org/bot${channelStore.botToken}/getChat?chat_id=${chatId}`
        );

        console.log("Фото канала:", chatResponse.data);

        const fileId = chatResponse.data.result.photo?.small_file_id;
        if (!fileId) {
          return null;
        }

        const fileResponse = await axios.get(
          `https://api.telegram.org/bot${channelStore.botToken}/getFile?file_id=${fileId}`
        );

        const filePath = fileResponse.data.result.file_path;
        const photoUrl = `https://api.telegram.org/file/bot${channelStore.botToken}/${filePath}`;
        return photoUrl;
      } catch (error) {
        console.error("Ошибка при получении фото канала:", error);
        return null;
      }
    };

    // Получение количества подписчиков
    const fetchChannelSubscribers = async (chatId) => {
      try {
        const response = await axios.get(
          `https://api.telegram.org/bot${channelStore.botToken}/getChatMemberCount?chat_id=${chatId}`
        );
        console.log("Количество подписчиков:", response.data.result);
        return response.data.result || 0;
      } catch (error) {
        console.error("Ошибка при получении подписчиков канала:", error);
        return 0;
      }
    };

    // Получение информации о канале (тип, статус, администраторы, дата создания и количество сообщений)
//     const fetchChannelInfo = async (chatId) => {
//   try {
//     // 1. Запрос данных канала
//     const chatResponse = await axios.get(
//       `https://api.telegram.org/bot${channelStore.botToken}/getChat?chat_id=${chatId}`
//     );

//     if (!chatResponse.data || !chatResponse.data.result) {
//       console.error("Не удалось получить данные о канале (getChat).");
//       return {
//         description: 'Ошибка при получении описания',
//         creationDate: 'Неизвестно',
//         channelType: 'Неизвестно',
//         status: 'Неизвестно',
//         admins: 0,
//         language: 'Неизвестно',
//       };
//     }

//     const chatResult = chatResponse.data.result;

//     // 2. Описание канала
//     const description = chatResult.description || "Нет описания";
//     console.log("Описание канала:", description);

//     // 3. Получение администраторов
//     let admins = 0;
//     try {
//       const adminsResponse = await axios.get(
//         `https://api.telegram.org/bot${channelStore.botToken}/getChatAdministrators?chat_id=${chatId}`
//       );

//       if (adminsResponse.data && adminsResponse.data.result) {
//         admins = adminsResponse.data.result.length;
//       } else {
//         console.warn("Не удалось получить администраторов.");
//       }
//     } catch (error) {
//       console.error("Ошибка при получении администраторов:", error);
//     }

//     // 4. Дополнительные данные (например, дата создания)
//     const creationDate = chatResult.date ? new Date(chatResult.date * 1000).toLocaleDateString() : 'Неизвестно';
//     const channelType = chatResult.type || 'Неизвестно';
//     const status = chatResult.status || 'Неизвестно';
//     const language = chatResult.language || 'Неизвестно';

//     // Логирование всей собранной информации
//     console.log("Информация о канале:");
//     console.log(`Дата создания: ${creationDate}`);
//     console.log(`Тип канала: ${channelType}`);
//     console.log(`Статус: ${status}`);
//     console.log(`Количество администраторов: ${admins}`);
//     console.log(`Язык канала: ${language}`);

//     // Возвращаем все собранные данные
//     return {
//       description,
//       creationDate,
//       channelType,
//       status,
//       admins,
//       language,
//     };

//   } catch (error) {
//     console.error("Ошибка при получении информации о канале:", error);

//     // Возвращаем дефолтные значения в случае ошибки
//     return {
//       description: 'Ошибка при получении описания',
//       creationDate: 'Неизвестно',
//       channelType: 'Неизвестно',
//       status: 'Неизвестно',
//       admins: 0,
//       language: 'Неизвестно',
//     };
//   }
// };
// Получение информации о канале (тип, статус, администраторы, дата создания и количество сообщений)
const fetchChannelInfo = async (chatId) => {
  try {
    // 1. Запрос данных канала
    const chatResponse = await axios.get(
      `https://api.telegram.org/bot${channelStore.botToken}/getChat?chat_id=${chatId}`
    );

    if (!chatResponse.data || !chatResponse.data.result) {
      console.error("Не удалось получить данные о канале (getChat).");
      return {
        description: 'Ошибка при получении описания',
        creationDate: 'Неизвестно',
        channelType: 'Неизвестно',
        status: 'Неизвестно',
        admins: 0,
        language: 'Неизвестно',
      };
    }

    const chatResult = chatResponse.data.result;

    // 2. Описание канала
    const description = chatResult.description || "Нет описания";
    console.log("Описание канала:", description);

    // 3. Получение администраторов
    let admins = 0;
    try {
      const adminsResponse = await axios.get(
        `https://api.telegram.org/bot${channelStore.botToken}/getChatAdministrators?chat_id=${chatId}`
      );

      if (adminsResponse.data && adminsResponse.data.result) {
        admins = adminsResponse.data.result.length;
      } else {
        console.warn("Не удалось получить администраторов.");
      }
    } catch (error) {
      console.error("Ошибка при получении администраторов:", error);
    }

    // 4. Дополнительные данные (например, дата создания)
    const creationDate = chatResult.date ? new Date(chatResult.date * 1000).toLocaleDateString() : 'Неизвестно';
    const channelType = chatResult.type || 'Неизвестно';
    const status = chatResult.status || 'Неизвестно';
    const language = chatResult.language || 'Неизвестно';

    // Логирование всей собранной информации
    console.log("Информация о канале:");
    console.log(`Дата создания: ${creationDate}`);
    console.log(`Тип канала: ${channelType}`);
    console.log(`Статус: ${status}`);
    console.log(`Количество администраторов: ${admins}`);
    console.log(`Язык канала: ${language}`);

    // Возвращаем все собранные данные
    return {
      description,
      creationDate,
      channelType,
      status,
      admins,
      language,
    };

  } catch (error) {
    console.error("Ошибка при получении информации о канале:", error);

    // Возвращаем дефолтные значения в случае ошибки
    return {
      description: 'Ошибка при получении описания',
      creationDate: 'Неизвестно',
      channelType: 'Неизвестно',
      status: 'Неизвестно',
      admins: 0,
      language: 'Неизвестно',
    };
  }
};

const fetchChannelAdmins = async (chatId) => {
  try {
    const response = await axios.get(
      `https://api.telegram.org/bot${channelStore.botToken}/getChatAdministrators?chat_id=${chatId}`
    );
    console.log("Ответ от Telegram API (getChatAdministrators):", response.data);

    const admins = response.data.result ? response.data.result.length : 0;
    console.log("Количество администраторов:", admins);
    return admins;
  } catch (error) {
    console.error("Ошибка при получении администраторов:", error);
    return 0;
  }
};


    onMounted(() => {
      channelStore.loadChannels();
    });

    return {
      updateInterval,
      fetchChannelPhoto,
      fetchChannelSubscribers,
      fetchChannelInfo,
      fetchChannelAdmins,
      newChatId,
      newChannelName,
      channels,
      activeChannelId,
      handleAddChannel,
      handleRemoveChannel,
      handleSelectChannel,
      defaultPhoto,
    };
  },
};
</script>


<style scoped>
.container {
  max-width: 600px;
  margin: 20px auto;
}

.active-channel {
  font-weight: bold;
  color: #198754;
}
</style> -->


<template>
  <div class="form">
    
    <form @submit.prevent="handleAddChannel" class="mb-4">
      <div class="mb-3">
        <input
          type="text"
          id="chatId"
          v-model="newChatId"
          class="form-control"
          placeholder="Введите Telegram Chat ID"
          required
        />
      </div>
      <div class="mb-3">
        <input
          type="text"
          id="channelName"
          v-model="newChannelName"
          class="form-control"
          placeholder="Введите название канала"
          required
        />
      </div>
      
      <button
        v-if="newChatId.trim() !== '' && newChannelName.trim() !== ''"
        style="background-color: transparent; border: none;"
        type="submit"
        class=""
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 16 16"
        >
          <g fill="none">
            <path
              fill="url(#fluentColorCheckmarkCircle160)"
              d="M2 8a6 6 0 1 1 12 0A6 6 0 0 1 2 8"
            />
            <path
              fill="url(#fluentColorCheckmarkCircle161)"
              d="M10.12 6.164L7.25 9.042L5.854 7.646a.5.5 0 1 0-.708.708l1.75 1.75a.5.5 0 0 0 .708 0l3.224-3.234a.5.5 0 0 0-.708-.706"
            />
            <defs>
              <linearGradient
                id="fluentColorCheckmarkCircle160"
                x1="2.429"
                x2="10.71"
                y1="4.25"
                y2="12.854"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#52D17C" />
                <stop offset="1" stop-color="#22918B" />
              </linearGradient>
              <linearGradient
                id="fluentColorCheckmarkCircle161"
                x1="6.12"
                x2="7.076"
                y1="6.449"
                y2="11.21"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#fff" />
                <stop offset="1" stop-color="#E3FFD9" />
              </linearGradient>
            </defs>
          </g>
        </svg>
      </button>
    </form>

   
    <div style="border: none !important" v-if="channels.length > 0" class="card mt-4">
      <ul class="list-group list-group-flush">
        <li
          v-for="(channel, index) in channels"
          :key="index"
          class="list-group-item d-flex justify-content-between align-items-center"
          :class="{ 'active-channel': activeChannelId === channel.id }"
        >
         
          <span
            @click="handleSelectChannel(channel.id)"
            style="cursor: pointer; font-size: 14px;"
          >
         <!-- <span  :class="{ 'active-channel1': activeChannelId === channel.id }" class="active">active</span> <br/> -->
          <img
            :src="channel.photo || defaultPhoto"
            alt="Фото канала"
            class="rounded-circle me-2"
            width="70"
            height="70"
          />
            <strong style="font-size: 20px;">{{ channel.name }}</strong><br/>
            <strong style="color:cornflowerblue">  Описание: </strong>{{ channel.description || 'Нет описания' }}<br/>
            <strong style="color:cornflowerblue"> ChatId:</strong> {{ channel.id }}<br/>
            <strong style="color:cornflowerblue"> Подписчиков:</strong> {{ channel.subscribers }}<br/>
            
            <strong style="color:cornflowerblue">Администраторов:</strong> {{ channel.admins || 0 }}<br/>
           
            <!-- <strong style="color:cornflowerblue">Дата создания:</strong> {{ channel.creationDate || 'Неизвестно' }}<br/> -->
          </span>

          <div>
            <i style="font-size: 11px;" @click="handleRemoveChannel(index)" class="bi bi-x-circle pointer"></i>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Каналов ещё нет. Добавьте новый канал выше.</p>
    </div>
  </div>
</template>

<script>
import { onUnmounted } from "vue";
import { useChannelStore } from "@/stores/channelStore";
import { ref, onMounted, computed } from "vue";
import axios from "axios";

export default {
  setup() {
    const channelStore = useChannelStore();
    const newChatId = ref("");
    const newChannelName = ref("");
    let updateInterval = null;
    const channels = computed(() => channelStore.channels);
    const activeChannelId = computed(() => channelStore.activeChannelId);
    const defaultPhoto = ref("https://static-00.iconduck.com/assets.00/user-avatar-frankenstein-icon-511x512-dtbz515o.png");

    // Удаление канала
    const handleRemoveChannel = (index) => {
      channelStore.removeChannel(index);
    };

    // Выбор канала
    const handleSelectChannel = (channelId) => {
      channelStore.setActiveChannel(channelId);
    };

    // Добавление нового канала
    const handleAddChannel = async () => {
      if (newChatId.value.trim() !== "" && newChannelName.value.trim() !== "") {
        console.log("Добавление канала:", newChatId.value, newChannelName.value);

        const photo = await fetchChannelPhoto(newChatId.value.trim());
        const subscribers = await fetchChannelSubscribers(newChatId.value.trim());
        const info = await fetchChannelInfo(newChatId.value.trim());

        console.log("Информация о канале:", info);

        channelStore.addChannel({
          id: newChatId.value.trim(),
          name: newChannelName.value.trim(),
          photo: photo || defaultPhoto.value,
          subscribers: subscribers || 0,
          creationDate: info.creationDate || null,
          channelType: info.channelType || "unknown",
          status: info.status || "unknown",
          admins: info.admins || 0,
          messages: info.messages || 0,
          description: info.description || "Без описания",
          lastActive: info.lastActive || "Неизвестно",
          language: info.language || "Неизвестно",
          public: info.public || false,
          activityLevel: info.activityLevel || "unknown",
          growthRate: info.growthRate || "unknown",
          updateFrequency: info.updateFrequency || "неизвестно",
        });

        // Очистка полей
        newChatId.value = "";
        newChannelName.value = "";
      }
    };

    // Получение фото канала
    const fetchChannelPhoto = async (chatId) => {
      try {
        const chatResponse = await axios.get(
          `https://api.telegram.org/bot${channelStore.botToken}/getChat?chat_id=${chatId}`
        );

        console.log("Фото канала:", chatResponse.data);

        const fileId = chatResponse.data.result.photo?.small_file_id;
        if (!fileId) {
          return null;
        }

        const fileResponse = await axios.get(
          `https://api.telegram.org/bot${channelStore.botToken}/getFile?file_id=${fileId}`
        );

        const filePath = fileResponse.data.result.file_path;
        const photoUrl = `https://api.telegram.org/file/bot${channelStore.botToken}/${filePath}`;
        return photoUrl;
      } catch (error) {
        console.error("Ошибка при получении фото канала:", error);
        return null;
      }
    };

    // Получение количества подписчиков
    const fetchChannelSubscribers = async (chatId) => {
      try {
        const response = await axios.get(
          `https://api.telegram.org/bot${channelStore.botToken}/getChatMemberCount?chat_id=${chatId}`
        );
        console.log("Количество подписчиков:", response.data.result);
        return response.data.result || 0;
      } catch (error) {
        console.error("Ошибка при получении подписчиков канала:", error);
        return 0;
      }
    };

    
// const fetchChannelInfo = async (chatId) => {
//   try {
//     // 1. Запрос данных канала
//     const chatResponse = await axios.get(
//       `https://api.telegram.org/bot${channelStore.botToken}/getChat?chat_id=${chatId}`
//     );

//     if (!chatResponse.data || !chatResponse.data.result) {
//       console.error("Не удалось получить данные о канале (getChat).");
//       return {
//         description: 'Ошибка при получении описания',
//         creationDate: 'Неизвестно',
//         channelType: 'Неизвестно',
//         status: 'Неизвестно',
//         admins: 0,
//         language: 'Неизвестно',
//       };
//     }

//     const chatResult = chatResponse.data.result;

//     // 2. Описание канала
//     const description = chatResult.description || "Нет описания";
//     console.log("Описание канала:", description);

//     // 3. Получение администраторов
//     let admins = 0;
//     try {
//       const adminsResponse = await axios.get(
//         `https://api.telegram.org/bot${channelStore.botToken}/getChatAdministrators?chat_id=${chatId}`
//       );

//       if (adminsResponse.data && adminsResponse.data.result) {
//         admins = adminsResponse.data.result.length;
//       } else {
//         console.warn("Не удалось получить администраторов.");
//       }
//     } catch (error) {
//       console.error("Ошибка при получении администраторов:", error);
//     }

//     // 4. Дополнительные данные (например, дата создания)
//     const creationDate = chatResult.date ? new Date(chatResult.date * 1000).toLocaleDateString() : 'Неизвестно';
//     const channelType = chatResult.type || 'Неизвестно';
//     const status = chatResult.status || 'Неизвестно';
//     const language = chatResult.language || 'Неизвестно';

//     // Логирование всей собранной информации
//     console.log("Информация о канале:");
//     console.log(`Дата создания: ${creationDate}`);
//     console.log(`Тип канала: ${channelType}`);
//     console.log(`Статус: ${status}`);
//     console.log(`Количество администраторов: ${admins}`);
//     console.log(`Язык канала: ${language}`);

//     // Возвращаем все собранные данные
//     return {
//       description,
//       creationDate,
//       channelType,
//       status,
//       admins,
//       language,
//     };

//   } catch (error) {
//     console.error("Ошибка при получении информации о канале:", error);

//     // Возвращаем дефолтные значения в случае ошибки
//     return {
//       description: 'Ошибка при получении описания',
//       creationDate: 'Неизвестно',
//       channelType: 'Неизвестно',
//       status: 'Неизвестно',
//       admins: 0,
//       language: 'Неизвестно',
//     };
//   }
// };
// const fetchChannelInfo = async (chatId) => {
//   try {
//     const chatResponse = await axios.get(
//       `https://api.telegram.org/bot${channelStore.botToken}/getChat?chat_id=${chatId}`
//     );

//     if (!chatResponse.data || !chatResponse.data.result) {
//       console.error("Не удалось получить данные о канале (getChat).");
//       return {
//         description: 'Ошибка при получении описания',
//         creationDate: 'Неизвестно',
//         channelType: 'Неизвестно',
//         status: 'Неизвестно',
//         admins: 0,
//         language: 'Неизвестно',
//         telegramName: 'Неизвестно',  // добавляем поле для названия канала
//       };
//     }

//     const chatResult = chatResponse.data.result;

//     // Получаем настоящее название канала
//     const telegramName = chatResult.title || "Без названия";  // В Telegram канал имеет поле title для названия

//     const description = chatResult.description || "Нет описания";
//     let admins = 0;
//     try {
//       const adminsResponse = await axios.get(
//         `https://api.telegram.org/bot${channelStore.botToken}/getChatAdministrators?chat_id=${chatId}`
//       );

//       if (adminsResponse.data && adminsResponse.data.result) {
//         admins = adminsResponse.data.result.length;
//       } else {
//         console.warn("Не удалось получить администраторов.");
//       }
//     } catch (error) {
//       console.error("Ошибка при получении администраторов:", error);
//     }

//     const creationDate = chatResult.date ? new Date(chatResult.date * 1000).toLocaleDateString() : 'Неизвестно';
//     const channelType = chatResult.type || 'Неизвестно';
//     const status = chatResult.status || 'Неизвестно';
//     const language = chatResult.language || 'Неизвестно';

//     return {
//       description,
//       creationDate,
//       channelType,
//       status,
//       admins,
//       language,
//       telegramName, // возвращаем название канала из Telegram
//     };
//   } catch (error) {
//     console.error("Ошибка при получении информации о канале:", error);
//     return {
//       description: 'Ошибка при получении описания',
//       creationDate: 'Неизвестно',
//       channelType: 'Неизвестно',
//       status: 'Неизвестно',
//       admins: 0,
//       language: 'Неизвестно',
//       telegramName: 'Неизвестно',
//     };
//   }
// };
const fetchChannelInfo = async (chatId) => {
  try {
    const chatResponse = await axios.get(
      `https://api.telegram.org/bot${channelStore.botToken}/getChat?chat_id=${chatId}`
    );

    if (!chatResponse.data || !chatResponse.data.result) {
      console.error("Не удалось получить данные о канале (getChat).");
      return {
        description: 'Ошибка при получении описания',
        creationDate: 'Неизвестно',
        channelType: 'Неизвестно',
        status: 'Неизвестно',
        admins: 0,
        language: 'Неизвестно',
        telegramName: 'Неизвестно', // Оригинальное название из Telegram
      };
    }

    const chatResult = chatResponse.data.result;

    // Получаем оригинальное название канала из Telegram
    const telegramName = chatResult.title || "Без названия";

    const description = chatResult.description || "Нет описания";
    let admins = 0;
    try {
      const adminsResponse = await axios.get(
        `https://api.telegram.org/bot${channelStore.botToken}/getChatAdministrators?chat_id=${chatId}`
      );

      if (adminsResponse.data && adminsResponse.data.result) {
        admins = adminsResponse.data.result.length;
      } else {
        console.warn("Не удалось получить администраторов.");
      }
    } catch (error) {
      console.error("Ошибка при получении администраторов:", error);
    }

    const creationDate = chatResult.date ? new Date(chatResult.date * 1000).toLocaleDateString() : 'Неизвестно';
    const channelType = chatResult.type || 'Неизвестно';
    const status = chatResult.status || 'Неизвестно';
    const language = chatResult.language || 'Неизвестно';

    return {
      description,
      creationDate,
      channelType,
      status,
      admins,
      language,
      telegramName, // Возвращаем оригинальное название канала
    };
  } catch (error) {
    console.error("Ошибка при получении информации о канале:", error);
    return {
      description: 'Ошибка при получении описания',
      creationDate: 'Неизвестно',
      channelType: 'Неизвестно',
      status: 'Неизвестно',
      admins: 0,
      language: 'Неизвестно',
      telegramName: 'Неизвестно',
    };
  }
};
const fetchChannelAdmins = async (chatId) => {
  try {
    const response = await axios.get(
      `https://api.telegram.org/bot${channelStore.botToken}/getChatAdministrators?chat_id=${chatId}`
    );
    console.log("Ответ от Telegram API (getChatAdministrators):", response.data);

    const admins = response.data.result ? response.data.result.length : 0;
    console.log("Количество администраторов:", admins);
    return admins;
  } catch (error) {
    console.error("Ошибка при получении администраторов:", error);
    return 0;
  }
};


    onMounted(() => {
      channelStore.loadChannels();
    });

    return {
      updateInterval,
      fetchChannelPhoto,
      fetchChannelSubscribers,
      fetchChannelInfo,
      fetchChannelAdmins,
      newChatId,
      newChannelName,
      channels,
      activeChannelId,
      handleAddChannel,
      handleRemoveChannel,
      handleSelectChannel,
      defaultPhoto,
    };
  },
};
</script>


<style scoped>
.container {
  max-width: 600px;
  margin: 20px auto;
}

.active-channel {
  border: 3px solid rgb(14, 113, 166);
  /* font-weight: bold; */
  color: #198754;
  border-radius: 10px;
}

</style>
