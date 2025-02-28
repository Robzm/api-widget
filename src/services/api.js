// src/services/api.js
import axios from 'axios';


// Configuración base de Axios
const apiClient = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3', // Base URL de la API de YouTube
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  // Método para obtener un solo video de un canal
  async getFirstVideo(channelId, apiKey) {
    try {
      const response = await apiClient.get('/search', {
        params: {
          part: 'snippet',
          channelId: channelId,
          maxResults: 1,
          order: 'date',
          type: 'video',
          key: apiKey,
        },
      });
      return response.data.items[0]; // Retorna el primer video
    } catch (error) {
      console.error('Error fetching first video:', error.response ? error.response.data : error.message);
      throw error;
    }
  },
  async getChannelDetails(channelId, apiKey) {
    try {
      const response = await apiClient.get('/channels', {
        params: {
          part: 'snippet,brandingSettings,statistics,contentDetails',
          id: channelId,
          key: apiKey,
        },
      });
      return response.data.items[0];
    } catch (error) {
      console.error('Error fetching channel details:', error);
      throw error;
    }
  },
  async getVideoList(channelId, apiKey, maxResults = 9, pageToken = null) {
    try {
      const response = await apiClient.get('/search', {
        params: {
          part: 'snippet',
          channelId: channelId,
          maxResults: maxResults,
          order: 'date',
          type: 'video',
          key: apiKey,
          pageToken: pageToken, // Usa el parámetro pageToken
        },
      });
      return response.data; // Devuelve toda la respuesta (incluyendo nextPageToken)
    } catch (error) {
      console.error('Error fetching video list:', error);
      throw error;
    }
  },

  // Método para obtener detalles de un video
  async getVideoDetails(videoId, apiKey) {
    try {
      const response = await apiClient.get('/videos', {
        params: {
          part: 'snippet,statistics',
          id: videoId,
          key: apiKey,
        },
      });
      return response.data.items[0]; // Retorna los detalles del video
    } catch (error) {
      console.error('Error fetching video details:', error);
      throw error;
    }
  },

  async getPlaylists(channelId, apiKey, maxResults = 10) {
    try {
      const response = await apiClient.get('/playlists', {
        params: {
          part: 'snippet',
          channelId: channelId,
          maxResults: maxResults,
          key: apiKey,
        },
      });
      return response.data.items;
    } catch (error) {
      console.error('Error fetching playlists:', error);
      throw error;
    }
  },
};