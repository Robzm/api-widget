// stores/videoGridStore.js
import { defineStore } from 'pinia';
import api from '@/services/api'; 

export const useVideoGridStore = defineStore('videoGrid', {
  state: () => ({
    videos: [], // Lista de videos
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchVideoList(channelId, apiKey, maxResults = 9) {
      this.isLoading = true;
      this.error = null;

      try {
        // Obtener la lista de videos
        this.videos = await api.getVideoList(channelId, apiKey, maxResults);
      } catch (error) {
        this.error = error;
        console.error('Error fetching video list:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});