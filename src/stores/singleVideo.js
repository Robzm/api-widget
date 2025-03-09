

// stores/singleVideoStore.js
import { defineStore } from 'pinia';
import api from '@/services/api'; 

export const useSingleVideoStore = defineStore('singleVideo', {
  state: () => ({
    videoId: null,
    videoDetails: null,
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchFirstVideo(channelId, apiKey) {
      this.isLoading = true;
      this.error = null;

      try {
        // Obtener el primer video del canal
        const firstVideo = await api.getFirstVideo(channelId, apiKey);
        this.videoId = firstVideo.id.videoId;

        // Obtener detalles del video
        this.videoDetails = await api.getVideoDetails(this.videoId, apiKey);
      } catch (error) {
        this.error = error;
        console.error('Error fetching video:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});