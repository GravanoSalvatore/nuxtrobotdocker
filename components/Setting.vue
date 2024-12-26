<!-- <template>
    <div class="">
     
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
    <button v-if="newChatId.value && newChannelName.value > 0" style="background-color: transparent;border: none;" type="submit" class=""><svg type="submit" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><g fill="none"><path fill="url(#fluentColorCheckmarkCircle160)" d="M2 8a6 6 0 1 1 12 0A6 6 0 0 1 2 8"/><path fill="url(#fluentColorCheckmarkCircle161)" d="M10.12 6.164L7.25 9.042L5.854 7.646a.5.5 0 1 0-.708.708l1.75 1.75a.5.5 0 0 0 .708 0l3.224-3.234a.5.5 0 0 0-.708-.706"/><defs><linearGradient id="fluentColorCheckmarkCircle160" x1="2.429" x2="10.71" y1="4.25" y2="12.854" gradientUnits="userSpaceOnUse"><stop stop-color="#52D17C"/><stop offset="1" stop-color="#22918B"/></linearGradient><linearGradient id="fluentColorCheckmarkCircle161" x1="6.12" x2="7.076" y1="6.449" y2="11.21" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#E3FFD9"/></linearGradient></defs></g></svg></button>
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
              style="cursor: pointer;font-size: 12px;"
            >
              {{ channel.name }}
            </span>
            <div>

            
              <svg                
              class=" btn-sm"  @click="handleRemoveChannel(index)" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><g fill="none"><path fill="url(#fluentColorDismissCircle160)" d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2"/><path fill="url(#fluentColorDismissCircle161)" d="M5.896 5.896a.5.5 0 0 1 .638-.057l.07.057L8 7.293l1.396-1.397a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 .057.638l-.057.07L8.707 8l1.397 1.396a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.638.057l-.07-.057L8 8.707l-1.396 1.397a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1-.057-.638l.057-.07L7.293 8L5.896 6.604a.5.5 0 0 1-.057-.638z"/><defs><linearGradient id="fluentColorDismissCircle160" x1="3.875" x2="13" y1="2.75" y2="16" gradientUnits="userSpaceOnUse"><stop stop-color="#F83F54"/><stop offset="1" stop-color="#CA2134"/></linearGradient><linearGradient id="fluentColorDismissCircle161" x1="6.011" x2="8.354" y1="8.199" y2="10.635" gradientUnits="userSpaceOnUse"><stop stop-color="#FDFDFD"/><stop offset="1" stop-color="#FECBE6"/></linearGradient></defs></g></svg>
             
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
  import { useChannelStore } from '@/stores/channelStore';
  import { ref, onMounted, computed } from 'vue';
  
  export default {
    setup() {
      const channelStore = useChannelStore(); // Pinia-хранилище
      const newChatId = ref(''); // Поле для нового chatId
      const newChannelName = ref(''); // Поле для нового имени канала
  
      // Реактивные состояния
      const channels = computed(() => channelStore.channels);
      const activeChannelId = computed(() => channelStore.activeChannelId);
  
      // Загрузка сохраненных каналов при монтировании
      onMounted(() => {
        channelStore.loadChannels();
      });
  
      // Добавление нового канала
      const handleAddChannel = () => {
        if (newChatId.value && newChannelName.value) {
          channelStore.addChannel({
            id: newChatId.value,
            name: newChannelName.value,
          });
          newChatId.value = ''; // Очистка поля
          newChannelName.value = ''; // Очистка поля
        }
      };
  
      // Удаление канала
      const handleRemoveChannel = (index) => {
        channelStore.removeChannel(index);
      };
  
      // Выбор активного канала
      const handleSelectChannel = (channelId) => {
        channelStore.setActiveChannel(channelId);
      };
  
      return {
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
  .container {
    max-width: 600px;
    margin: 20px auto;
  }
  .active-channel {
    /* font-size: 20px; */
    font-weight: bold;
    color:cornflowerblue;
  }
  </style>
   -->

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
            <span
              @click="handleSelectChannel(channel.id)"
              style="cursor: pointer; font-size: 12px;"
            >
              {{ channel.name }}
            </span>
          
            <div>
              <i  @click="handleRemoveChannel(index)" class="bi bi-x-circle"></i>
        

              <!-- <svg
              style="display: block !important;"
              v-if="channel.name"
                class=""
                @click="handleRemoveChannel(index)"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 16 16"
              >
                <g fill="none">
                  <path
                    fill="url(#fluentColorDismissCircle160)"
                    d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2"
                  />
                  <path
                    fill="url(#fluentColorDismissCircle161)"
                    d="M5.896 5.896a.5.5 0 0 1 .638-.057l.07.057L8 7.293l1.396-1.397a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 .057.638l-.057.07L8.707 8l1.397 1.396a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.638.057l-.07-.057L8 8.707l-1.396 1.397a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1-.057-.638l.057-.07L7.293 8L5.896 6.604a.5.5 0 0 1-.057-.638z"
                  />
                  <defs>
                    <linearGradient
                      id="fluentColorDismissCircle160"
                      x1="3.875"
                      x2="13"
                      y1="2.75"
                      y2="16"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#F83F54" />
                      <stop offset="1" stop-color="#CA2134" />
                    </linearGradient>
                    <linearGradient
                      id="fluentColorDismissCircle161"
                      x1="6.011"
                      x2="8.354"
                      y1="8.199"
                      y2="10.635"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FDFDFD" />
                      <stop offset="1" stop-color="#FECBE6" />
                    </linearGradient>
                  </defs>
                </g>
              </svg> -->
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
  import { useChannelStore } from "@/stores/channelStore";
  import { ref, onMounted, computed } from "vue";
  
  export default {
    setup() {
      const channelStore = useChannelStore();
      const newChatId = ref("");
      const newChannelName = ref("");
  
      const channels = computed(() => channelStore.channels);
      const activeChannelId = computed(() => channelStore.activeChannelId);
  
      onMounted(() => {
        channelStore.loadChannels();
      });
  
      const handleAddChannel = () => {
        if (newChatId.value.trim() !== "" && newChannelName.value.trim() !== "") {
          channelStore.addChannel({
            id: newChatId.value.trim(),
            name: newChannelName.value.trim(),
          });
          newChatId.value = "";
          newChannelName.value = "";
        }
      };
  
      const handleRemoveChannel = (index) => {
        channelStore.removeChannel(index);
      };
  
      const handleSelectChannel = (channelId) => {
        channelStore.setActiveChannel(channelId);
      };
  
      return {
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
.container {
  max-width: 600px;
  margin: 20px auto;
}

.active-channel {
  font-weight: bold;
  color: cornflowerblue;
}

</style>
