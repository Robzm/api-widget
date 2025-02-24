<template>
    <div>
        

        
        
        <div v-if="videoGridStore.isLoading" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> 
          <v-progress-circular indeterminate :size="91" :width="9"></v-progress-circular>
        </div>

        
        

        <!-- Grid de Videos -->
        <v-row>
            <v-col
                v-for="video in videoGridStore.videos"
                :key="video.id.videoId"
                cols="12"
                sm="6"
                md="4"
                class="pa-1"
            >
                <v-card>
                    <!-- Reproductor de Video -->
                    <iframe
                        width="100%"
                        height="117"
                        :src="`https://www.youtube.com/embed/${video.id.videoId}`"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                        class=""
                    ></iframe>

                    
                    
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useVideoGridStore } from '../stores/videoGrid';

const videoGridStore = useVideoGridStore();
const API_KEY = 'AIzaSyDeSFIgQC_E3f1E9YXayUxcbQppHBa77vc';
const CHANNEL_ID = "UCvC4D8onUfXzvjTOM-dBfEA"; 

onMounted(() => {
    videoGridStore.fetchVideoList(CHANNEL_ID, API_KEY, 9); 
});
</script>

<style scoped>

</style>