<template>
  <div class="video-container">
    <div v-if="singleVideoStore.isLoading" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <v-progress-circular indeterminate :size="91" :width="9"></v-progress-circular>
    </div>

    <div class="relative w-[701px] h-[592px]" @mouseover="isHovered = true" @mouseleave="isHovered = false">
      <!-- Mostrar la miniatura del video -->
      <img
        v-if="singleVideoStore.videoDetails"
        :src="singleVideoStore.videoDetails.snippet.thumbnails.medium.url"
        alt="Video Thumbnail"
        class="rounded-md w-full h-auto cursor-pointer"
        @click="openModal"
      />

      
      <div
        v-if="singleVideoStore.videoDetails && isHovered"
        class="video-overlay cursor-pointer p-[100px]  "
        @click="openModal"
      >
        <div class="p-4 text-black w-[701px] h-[350px]  ">
          <h3 class="text-lg font-bold mb-2">{{ singleVideoStore.videoDetails.snippet.title }}</h3>
          <p class="text-sm mb-2">{{ formatDate(singleVideoStore.videoDetails.snippet.publishedAt) }}</p>
          <p class="text-sm mb-4 overflow-hidden whitespace-nowrap text-ellipsis">
            {{ singleVideoStore.videoDetails.snippet.description }}
          </p>
          <div class="flex gap-2 text-sm">
            <span>{{ singleVideoStore.videoDetails.statistics.viewCount }} views</span>
            <span><b>.</b>{{ singleVideoStore.videoDetails.statistics.likeCount }}  likes</span>
            <span><b>.</b>{{ singleVideoStore.videoDetails.statistics.commentCount }} Comments</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para reproducir el video -->
    <Modal
      v-if="isModalOpen"
      :videoId="singleVideoStore.videoId"
      :isModalOpen="isModalOpen"
      @closeModal="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useSingleVideoStore } from '../stores/singleVideo';

import Modal from './modal.vue';

const singleVideoStore = useSingleVideoStore();
const API_KEY = 'AIzaSyDeSFIgQC_E3f1E9YXayUxcbQppHBa77vc';
const channelId = 'UCvC4D8onUfXzvjTOM-dBfEA';
const isHovered = ref(false);
const isModalOpen = ref(false); // Controla la visibilidad del modal

onMounted(() => {
  singleVideoStore.fetchFirstVideo(channelId, API_KEY);
});

onUnmounted(() => {
  console.log('Componente desmontado');
});

function openModal() {
  isModalOpen.value = true; 
}

function closeModal() {
  isModalOpen.value = false; 
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(); 
}
</script>

<style scoped>


.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  
  background: rgba(255, 255, 255, 0.8);
  
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  flex-direction: column;
  padding: 16px;
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.relative:hover .video-overlay {
  opacity: 1;
  
}

.text-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.cursor-pointer {
  cursor: pointer;
}
</style>