<template>
    <div class="youtube-channel">
      <!-- Banner del canal -->
      <div v-if="youtubeChannelStore.channelDetails" class="channel-banner">
        <img :src="youtubeChannelStore.channelDetails.brandingSettings.image.bannerExternalUrl" alt="Channel Banner" />
      </div>
  
      <!-- Videos del canal -->
      <div class="videos-section">
        <h2>Videos</h2>
        <div v-if="youtubeChannelStore.isLoading" class="loading">
          <v-progress-circular indeterminate :size="91" :width="9"></v-progress-circular>
        </div>
        <div v-else class="video-grid">
          <div
            v-for="video in youtubeChannelStore.videos"
            :key="video.id.videoId"
            class="video-card"
            @click="playVideo(video.id.videoId)"
          >
            <img :src="video.snippet.thumbnails.medium.url" :alt="video.snippet.title" />
            <h3>{{ video.snippet.title }}</h3>
          </div>
        </div>
      </div>
  
      <!-- Reproductor de YouTube -->
      <div v-if="isPlayerVisible" class="video-player">
        <div id="youtube-player"></div>
        <button @click="closePlayer">Cerrar reproductor</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useYoutubeChannelStore } from '../stores/youtubeChannel';
  
  const youtubeChannelStore = useYoutubeChannelStore();
  const API_KEY = 'AIzaSyD-l7qZNaZ6j_xMwvOMFLsfm0k2b8ZXukM'; 
  const CHANNEL_ID = 'UCvC4D8onUfXzvjTOM-dBfEA'; 
  
  const isPlayerVisible = ref(false);
  let player = null;
  
  onMounted(() => {
    youtubeChannelStore.fetchChannelDetails(CHANNEL_ID, API_KEY);
    youtubeChannelStore.fetchChannelVideos(CHANNEL_ID, API_KEY);
    youtubeChannelStore.fetchChannelPlaylists(CHANNEL_ID, API_KEY);
  
    
    window.onYouTubeIframeAPIReady = () => {
      player = new YT.Player('youtube-player', {
        height: '360',
        width: '640',
        events: {
          onReady: onPlayerReady,
        },
      });
    };
  });
  
  function playVideo(videoId) {
    if (player) {
      player.loadVideoById(videoId);
      isPlayerVisible.value = true;
    }
  }
  
  function closePlayer() {
    if (player) {
      player.stopVideo();
      isPlayerVisible.value = false;
    }
  }
  
  function onPlayerReady(event) {
    console.log('Reproductor listo');
  }
  </script>
  
  <style scoped>
  .youtube-channel {
    padding: 20px;
  }
  
  .channel-banner img {
    width: 100%;
    height: 100px;
    max-height: 300px;
    object-fit: cover;
  }
  
  .videos-section,
  .playlists-section {
    margin-top: 20px;
  }
  
  .video-grid,
  .playlist-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
  
  .video-card,
  .playlist-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
  }
  
  .video-card img,
  .playlist-card img {
    width: 100%;
    height: auto;
  }
  
  .video-card h3,
  .playlist-card h3 {
    padding: 8px;
    font-size: 14px;
    text-align: center;
  }
  
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
  }
  
  .video-player {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    padding: 20px;
    border-radius: 8px;
    z-index: 1000;
  }
  
  .video-player button {
    margin-top: 10px;
    padding: 8px 16px;
    background: #ff0000;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>