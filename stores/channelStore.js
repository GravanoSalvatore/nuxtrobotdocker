 //import { defineStore } from 'pinia';

// export const useChannelStore = defineStore('channelStore', {
  
//   state: () => ({
//     botToken: "6903896787:AAG-rPGukp422cw17k4y17UsJUiDMl5tdbc",
//     channels: [], // Массив каналов
//     activeChannelId: null, // ID активного канала
//   }),
//   actions: {
//     loadChannels() {
//       if (process.client) {
//         const savedChannels = localStorage.getItem('telegramChannels');
//         const savedActiveChannelId = localStorage.getItem('activeChannelId');

//         if (savedChannels) {
//           this.channels = JSON.parse(savedChannels);
//         }
//         if (savedActiveChannelId) {
//           this.activeChannelId = savedActiveChannelId;
//         }
//       }
//     },
//     addChannel(newChannel) {
//       this.channels.push(newChannel);
//       this.saveToLocalStorage();
//     },
//     removeChannel(index) {
//       if (this.channels[index]?.id === this.activeChannelId) {
//         this.activeChannelId = null; // Сброс активного канала
//       }
//       this.channels.splice(index, 1);
//       this.saveToLocalStorage();
//     },
//     setActiveChannel(channelId) {
//       this.activeChannelId = channelId;
//       localStorage.setItem('activeChannelId', channelId); // Сохранение активного канала
//     },
//     saveToLocalStorage() {
//       localStorage.setItem('telegramChannels', JSON.stringify(this.channels));
//     },
//   },
// });
// stores/channelStore.js
export const useChannelStore = defineStore('channelStore', {
  state: () => ({
    botToken: "6903896787:AAG-rPGukp422cw17k4y17UsJUiDMl5tdbc",
    channels: [
      {
        id: '-1002414188397', // Chat ID по умолчанию
        name: 'ROBOTON',     // Имя канала по умолчанию
      },
    ],
   
    activeChannelId: null, // Начально активный канал не выбран
  }),
  getters: {
    activeChannelName(state) {
      const activeChannel = state.channels.find(channel => channel.id === state.activeChannelId);
      return activeChannel ? activeChannel.name : 'Unknown Channel';
    },
  },
  actions: {
    loadChannels() {
      if (process.client) {
        // Загрузка сохранённых данных
        const savedChannels = localStorage.getItem('telegramChannels');
        const savedActiveChannelId = localStorage.getItem('activeChannelId');

        // Если каналы сохранены, загрузить их, иначе оставить значение по умолчанию
        this.channels = savedChannels ? JSON.parse(savedChannels) : this.channels;

        // Установить активный канал, если он сохранён
        this.activeChannelId = savedActiveChannelId || null;

        // Если ничего не сохранено, выбираем первый канал из списка
        if (!this.activeChannelId && this.channels.length > 0) {
          this.activeChannelId = this.channels[0].id;
        }
      }
    },
    addChannel(newChannel) {
      this.channels.push(newChannel);
      this.saveToLocalStorage();

      // Если активный канал ещё не выбран, сделаем новый канал активным
      if (!this.activeChannelId) {
        this.setActiveChannel(newChannel.id);
      }
    },
    removeChannel(index) {
      // Удаляем канал
      const removedChannel = this.channels[index];
      this.channels.splice(index, 1);

      // Если удалённый канал был активным, сбросить активный канал
      if (removedChannel?.id === this.activeChannelId) {
        this.activeChannelId = this.channels.length > 0 ? this.channels[0].id : null;
      }

      this.saveToLocalStorage();
    },
    setActiveChannel(channelId) {
      console.log('Setting active channel:', channelId);
      this.activeChannelId = channelId;
      localStorage.setItem('activeChannelId', channelId); // Сохранение активного канала
    },
    saveToLocalStorage() {
      localStorage.setItem('telegramChannels', JSON.stringify(this.channels));
      localStorage.setItem('activeChannelId', this.activeChannelId);
    },
  },
});
