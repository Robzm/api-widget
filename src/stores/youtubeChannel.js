import { defineStore } from 'pinia';
import api from '@/services/api'; 

export const useYoutubeChannelStore = defineStore('youtubeChannel', {
  state: () => ({
    channelId: null,
    channelDetails: null,
    videos: [],
    playlists: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    
    async fetchChannelDetails(channelId, apiKey) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await api.getChannelDetails(channelId, apiKey);
        this.channelDetails = response;
        this.channelId = channelId;
      } catch (error) {
        this.error = error;
        console.error('Error fetching channel details:', error);
      } finally {
        this.isLoading = false;
      }
    },

    
    async fetchChannelVideos(channelId, apiKey, maxResults = 9, pageToken = null) {
        this.isLoading = true;
        this.error = null;
      
        try {
          const response = await api.getVideoList(channelId, apiKey, maxResults, pageToken);
          this.videos = pageToken ? [...this.videos, ...response.items] : response.items; // Concatenar nuevos videos si hay paginación
          this.nextPageToken = response.nextPageToken; 
        } catch (error) {
          this.error = error;
          console.error('Error fetching channel videos:', error);
        } finally {
          this.isLoading = false;
        }
      },

    
    async fetchChannelPlaylists(channelId, apiKey, maxResults = 10) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await api.getPlaylists(channelId, apiKey, maxResults);
        this.playlists = response;
      } catch (error) {
        this.error = error;
        console.error('Error fetching channel playlists:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});