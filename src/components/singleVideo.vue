<template>
    <div >
        <div v-if="singleVideoStore.isLoading"> <v-progress-circular indeterminate :size="91" :width="9"></v-progress-circular></div>
       
        <iframe v-if="singleVideoStore.videoId" width="699" height="393"
            :src="`https://www.youtube.com/embed/${singleVideoStore.videoId}`" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="rounded-xl"></iframe>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'; // Importa onMounted y onUnmounted
import { useSingleVideoStore } from '../stores/singleVideo';

const props = defineProps({
  description: String,
});

const singleVideoStore = useSingleVideoStore();
const API_KEY = AIzaSyDeSFIgQC_E3f1E9YXayUxcbQppHBa77vc
//const API_KEY = import.meta.env.VITE_APP_GOOGLE_API_KEY;


const channelId = 'UCvC4D8onUfXzvjTOM-dBfEA';

onMounted(() => {
  singleVideoStore.fetchFirstVideo(channelId, API_KEY);
});

onUnmounted(() => {
  console.log('Componente desmontado');
  // Lógica para limpiar (si es necesaria)
});
</script>

<style scoped>
</style>