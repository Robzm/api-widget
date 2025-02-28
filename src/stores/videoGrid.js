import { defineStore } from 'pinia';
import api from '@/services/api';

export const useVideoGridStore = defineStore('videoGrid', {
  state: () => ({
    videos: [],
    isLoading: false,
    error: null,
    nextPageToken: null,
  }),
  actions: {
    async fetchVideoList(channelId, apiKey, maxResults = 9, pageToken = null) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await api.getVideoList(channelId, apiKey, maxResults, pageToken);
        console.log('Videos obtenidos:', response.items); // Verifica los videos
        this.videos = pageToken ? [...this.videos, ...response.items] : response.items;
        this.nextPageToken = response.nextPageToken;
      } catch (error) {
        this.error = error;
        console.error('Error fetching video list:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});