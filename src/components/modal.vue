<template>
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <iframe
          width="800"
          height="450"
          :src="`https://www.youtube.com/embed/${videoId}?autoplay=1`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  
  const props = defineProps({
    videoId: String,
    isModalOpen: Boolean,
  });
  
  const emit = defineEmits(['closeModal']);
  
  function closeModal() {
    emit('closeModal');
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: #000;
    border-radius: 8px;
    overflow: hidden;
  }
  </style>