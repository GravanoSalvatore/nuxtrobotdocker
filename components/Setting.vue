<template>
  <div class="form">
    <!-- Форма для добавления канала -->
    <form @submit.prevent="handleAddChannel" class="mb-4">
      <div class="mb-3">
        <input
          type="text"
          id="chatId"
          v-model="newChatId"
          class="form-control"
          placeholder="Enter Telegram Chat ID"
          required
        />
      </div>
      <div class="mb-3">
        <input
          type="text"
          id="channelName"
          v-model="newChannelName"
          class="form-control"
          placeholder="Enter Channel Name"
          required
        />
      </div>
      <!-- Кнопка подтверждения -->
      <button
        v-if="newChatId.trim() !== '' && newChannelName.trim() !== ''"
        style="background-color: transparent; border: none;"
        type="submit"
        class=""
      >
        <svg
          type="submit"
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

    <!-- Список каналов -->
    <div v-if="channels.length > 0" class="card mt-4">
      
      <ul class="list-group list-group-flush">
        <li
          v-for="(channel, index) in channels"
          :key="index"
          class="list-group-item d-flex justify-content-between align-items-center"
          :class="{ 'active-channel': activeChannelId === channel.id }"
        >
        <img
              :src="channel.photo || defaultPhoto"
              alt="Channel Photo"
              class="rounded-circle me-2"
              width="30"
              height="30"
            />
          <span
            @click="handleSelectChannel(channel.id)"
            style="cursor: pointer; font-size: 12px;"
          >
          <strong style="text-decoration: underline;">  {{ channel.name }} </strong><br/> Подписчиков {{ channel.subscribers }}
          </span>
        
          <div>
            <i style="font-size: 11px;"  @click="handleRemoveChannel(index)" class="bi bi-x-circle pointer"></i>
      

          
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No channels saved yet. Add a new channel above.</p>
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
    // onMounted(() => {
    //   channelStore.loadChannels();
    // });

  

    const handleRemoveChannel = (index) => {
      channelStore.removeChannel(index);
    };

    const handleSelectChannel = (channelId) => {
      channelStore.setActiveChannel(channelId);
    };


    // const handleAddChannel = async () => {
    //   if (newChatId.value.trim() !== "" && newChannelName.value.trim() !== "") {
    //     console.log("Adding channel with ID:", newChatId.value);
    //     const photo = await fetchChannelPhoto(newChatId.value.trim());
    //     console.log("Photo fetched:", photo);
    //     channelStore.addChannel({
    //       id: newChatId.value.trim(),
    //       name: newChannelName.value.trim(),
    //       photo: photo || defaultPhoto.value,
    //     });
    //     newChatId.value = "";
    //     newChannelName.value = "";
    //   }
    // };

    const handleAddChannel = async () => {
    if (newChatId.value.trim() !== "" && newChannelName.value.trim() !== "") {
      const photo = await fetchChannelPhoto(newChatId.value.trim());
      const subscribers = await fetchChannelSubscribers(newChatId.value.trim());

      channelStore.addChannel({
        id: newChatId.value.trim(),
        name: newChannelName.value.trim(),
        photo: photo || defaultPhoto.value,
        subscribers: subscribers || 0,
      });

      newChatId.value = "";
      newChannelName.value = "";
    }
  };

    const fetchChannelPhoto = async (chatId) => {
      try {
        console.log("Fetching photo for chat ID:", chatId);
        const chatResponse = await axios.get(
          `https://api.telegram.org/bot${channelStore.botToken}/getChat?chat_id=${chatId}`
        );
        console.log("Response from Telegram API (getChat):", chatResponse.data);

        const fileId = chatResponse.data.result.photo?.small_file_id;
        if (!fileId) {
          console.log("No photo available for chat ID:", chatId);
          return null;
        }

        const fileResponse = await axios.get(
          `https://api.telegram.org/bot${channelStore.botToken}/getFile?file_id=${fileId}`
        );
        console.log("Response from Telegram API (getFile):", fileResponse.data);

        const filePath = fileResponse.data.result.file_path;
        const photoUrl = `https://api.telegram.org/file/bot${channelStore.botToken}/${filePath}`;
        console.log("Generated photo URL:", photoUrl);

        return photoUrl;
      } catch (error) {
        console.error("Failed to fetch channel photo:", error);
        return null;
      }
    };

    // onMounted(() => {
    //   channelStore.loadChannels();
    //   console.log("Application loaded. Channels:", channels.value);
    //   channels.value.forEach(async (channel) => {
    //     console.log(`Channel: ${channel.name}, ID: ${channel.id}`);
    //     if (!channel.photo) {
    //       const photo = await fetchChannelPhoto(channel.id);
    //       if (photo) {
    //         channel.photo = photo;
    //         console.log(`Fetched photo URL for channel ${channel.name}: ${photo}`);
    //       } else {
    //         console.log(`No photo available for channel ${channel.name}.`);
    //       }
    //     }
    //   });
    // });
    onMounted(() => {
channelStore.loadChannels();
console.log("Application loaded. Channels:", channels.value);
updateSubscribers(); // Первоначальное обновление
updateInterval = setInterval(updateSubscribers, 30000);
channels.value.forEach(async (channel) => {
  if (!channel.photo) {
    console.log(`Fetching photo for channel: ${channel.name}`);
    const photo = await fetchChannelPhoto(channel.id);
    if (photo) {
      channel.photo = photo;
      console.log(`Fetched photo URL for channel ${channel.name}: ${photo}`);
    } else {
      console.log(`No photo available for channel ${channel.name}.`);
    }
  }
  if (!channel.subscribers) {
        channel.subscribers = await fetchChannelSubscribers(channel.id) || 0;
      }
});
});
// const fetchChannelSubscribers = async (chatId) => {
//       try {
//         const response = await axios.get(
//           `https://api.telegram.org/bot${channelStore.botToken}/getChatMembersCount?chat_id=${chatId}`
//         );
//         return response.data.result || 0;
//       } catch (error) {
//         console.error("Failed to fetch channel subscribers:", error);
//         return 0;
//       }
//     };
 
const fetchChannelSubscribers = async (chatId) => {
try {
  const response = await axios.get(
    `https://api.telegram.org/bot${channelStore.botToken}/getChatMemberCount?chat_id=${chatId}`
  );
  return response.data.result || 0;
} catch (error) {
  console.error("Failed to fetch channel subscribers:", error);
  return 0;
}
};

onUnmounted(() => {
clearInterval(updateInterval); // Очищаем интервал при выходе
});
// Функция для обновления подписчиков
const updateSubscribers = async () => {
console.log("Updating subscriber count...");
for (const channel of channels.value) {
  const subscribers = await fetchChannelSubscribers(channel.id);
  if (subscribers !== channel.subscribers) {
    channelStore.updateSubscribers(channel.id, subscribers);
  }
}
};

    return {
      updateSubscribers,
      fetchChannelSubscribers,
      fetchChannelPhoto,
      defaultPhoto,
      newChatId,
      newChannelName,
      channels,
      activeChannelId,
      handleAddChannel,
      handleRemoveChannel,
      handleSelectChannel,
    };
  },
};
</script>

<style scoped>
.container  {
max-width: 600px;
margin: 20px auto;
}

.active-channel {
font-weight: bold;
color:#198754;
}

</style>
