<template>
    <v-app style="background: linear-gradient(0deg, rgba(0, 0, 0, .08) 0%, rgba(0, 0, 0, .08) 100%), linear-gradient(90deg, #a83fbe -20.16%, #fd3459 49.45%, #ffc73f 112.16%);">
        <v-container class="d-flex justify-center align-center fill-height">
            
            <!-- <v-card-title class="text-h4 font-weight-bold mb-4">
                Select a Template
            </v-card-title>

           
            <v-chip-group v-model="selectedCategory" mandatory>
                <v-chip v-for="category in categories" :key="category" :value="category"
                    @click="filterTemplates(category)">
                    {{ category }}
                </v-chip>
            </v-chip-group> -->

            <!-- Contenedor Principal  -->
            <v-row class="mt-2 bg-[#252628] pa-10 rounded-xl " style="height: 593px; width: 1200px; overflow: hidden; ">
                <!-- Columna Izquierda: Tarjetas de Plantillas -->
                <v-col class="custom-scrollbar" cols="12" md="4"
                    style="background-color: #202020; overflow: scroll; height: 500px; overflow-y: auto; ">
                    <v-row>
                        <v-col v-for="template in filteredTemplates" :key="template.id" cols="12" sm="6" class="text-sm" >
                            <v-card @click="selectTemplate(template)" class="cursor-pointer bg-[#252628]">
                                <v-img :src="template.image" :alt="template.title" height="100" class=""></v-img>

                            </v-card>
                            <v-card-text class="text-white text-center  ">{{ template.title }}</v-card-text>

                        </v-col>



                    </v-row>
                </v-col>

                <!-- Columna Derecha: Contenido Adicional -->
                <v-col cols="12" md="8" class="bg-white">
                    
                        <v-card v-if="selectedTemplate" class="sticky-card ">
                            
                            <v-card-text class="bg-[#fff]">

                                <single-video v-if="selectedTemplate.title === 'Single Video'" />
                                <grid-video v-else-if="selectedTemplate.title === 'Video Grid'"/>

                                <!-- <v-btn color="primary" @click="applyTemplate">
                    Apply this Template
                  </v-btn> -->
                            </v-card-text>
                        </v-card>
                    
                </v-col>
                <v-btn :style="{ backgroundColor: '#2BBF63', color: 'white' }" @click="applyTemplate">
                 <v-card-text class="text-center">Continue with this template</v-card-text>
                </v-btn>
            </v-row>
             
        </v-container>
    </v-app>
    <div class="bg-red-200">
        hoñla
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import singleVideo from "./singleVideo.vue";
import gridVideo from "./gridVideo.vue";





// Datos de las plantillas
const templates = [
    {
        id: 1,
        title: "Youtube Chanel",
        detailedDescription: "This template is perfect for ....",
        image: "https://via.placeholder.com/400x200",
        category: "Social Media",
    },
    {
        id: 2,
        title: "Video Grid",
        detailedDescription: "This template is perfect for ....",
        image: "https://elfsight.com/cdn-cgi/image/dpr=1,width=170,height=170/https://elfsight.com/assets/templates/youtube-gallery/video-grid.jpg?v=1",
        category: "Social Media",
    },
    {
        id: 3,
        title: "Single Video",

        detailedDescription: "This template is perfect for ....",
        image: "https://elfsight.com/cdn-cgi/image/dpr=1,width=170,height=170/https://elfsight.com/assets/templates/youtube-gallery/single-video.jpg?v=2",
        category: "Social Media",
    },
    {
        id: 4,
        title: "YouTube Subscribe",

        detailedDescription: "This template is perfect for ....",
        image: "https://via.placeholder.com/400x200",
        category: "Social Media",
    },

    {
        id: 5,
        title: "Video Gallery",

        detailedDescription: "This template is perfect for ....",
        image: "https://via.placeholder.com/400x200",
        category: "Social Media",
    },
    {
        id: 6,
        title: "Playlist",

        detailedDescription: "This template is perfect for ....",
        image: "https://via.placeholder.com/400x200",
        category: "Social Media",
    },
    {
        id: 7,
        title: "Video List",

        detailedDescription: "This template is perfect for ....",
        image: "https://via.placeholder.com/400x200",
        category: "Social Media",
    },
];

// Estado para la categoría seleccionada
const selectedCategory = ref("Social Media");

// Estado para la plantilla seleccionada
const selectedTemplate = ref(null);

// Categorías disponibles
const categories = ["Social Media", "Forms", "Media"];

// Filtrar plantillas por categoría
const filteredTemplates = computed(() => {
    return templates.filter((template) => template.category === selectedCategory.value);
});

// Método para seleccionar una plantilla
function selectTemplate(template) {
    selectedTemplate.value = template;
}

// Método para aplicar la plantilla seleccionada
function applyTemplate() {
    if (selectedTemplate.value) {
        alert(`Applying template: ${selectedTemplate.value.title}`);
        
    }
}





</script>

<style scoped>

.custom-scrollbar::-webkit-scrollbar {
  width: 8px; 
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #202020; 
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #555; 
  border-radius: 4px; 
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #888; 
}

.v-card {
    cursor: pointer;
    transition: transform 0.2s;
}




.sticky-card {
    position: sticky;
    top: 20px;
    
}
</style>