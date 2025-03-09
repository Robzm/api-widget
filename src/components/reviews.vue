<template>
  <v-container >
    <!-- Esqueleto de carga -->
    <div v-if="isLoading" class="h-[400px]">
      <v-skeleton-loader type="card" :elevation="24" class="mb-4"></v-skeleton-loader>

    </div>

    <!-- Carrusel de reseñas -->
    <v-carousel  v-else cycle height="400" hide-delimiter-background show-arrows >
      <v-carousel-item v-for="review in reviews" :key="review.id">
        <v-card class="mx-auto my-12" max-width="600" elevation="10">
          <v-card-text class="text-center pa-10">
            <!-- Perfil del autor -->
            <div class="d-flex align-center justify-center mb-4">
              <v-avatar size="50" class="mr-3">
                <img :src="review.profilePhoto" :alt="review.author" />
              </v-avatar>
              <div>
                <div class="font-weight-bold">{{ review.author }}</div>
                <div class="text-caption text-grey">
                  {{ review.date }} ·
                  <a :href="getSourceUrl(review.source, review.placeId)" target="_blank" class="text-decoration-none">
                    {{ review.source }}
                  </a>
                </div>
              </div>
            </div>

            <!-- Estrellas -->
            <v-rating v-model="review.rating" readonly color="yellow-darken-3" dense size="20" class="mb-2"></v-rating>

            <!-- Comentario (limitado a 3 líneas) -->
            <p class="text-body-1 font-italic three-lines">"{{ review.comment }}"</p>

            <!-- Botón "Read More" -->
            <v-chip v-if="review.comment.length > 150" color="primary" class="text-blue-700 cursor-pointer" text small
              @click="openModal(review)">
              Read More
            </v-chip>
          </v-card-text>
        </v-card>
      </v-carousel-item>
    </v-carousel>

    <!-- Modal para mostrar la reseña completa -->
    <v-dialog v-model="isModalOpen" max-width="600">
      <v-card>
        <v-card-title class="headline">Reseña completa</v-card-title>
        <v-card-text>
          <p class="text-body-1 font-italic">{{ selectedReview?.comment }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="isModalOpen = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Mensaje de error -->
    <v-alert v-if="error" type="error" class="mt-6">{{ error }}</v-alert>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useReviewsStore } from '@/stores/reviewStore';

const reviewsStore = useReviewsStore();
const { reviews, isLoading, error } = storeToRefs(reviewsStore); // Mantén la reactividad


watch(
  () => reviews.value, 
  (newReviews) => {
    console.log('Reviews updated:', newReviews); // Depuración
  }
);


onMounted(() => {
  reviewsStore.fetchReviews('ChIJs5ydyTiuEmsR0fRSlU0C7k0');
  console.log('Reviews in component:', reviews.value); 
});

// Lógica para el modal
const isModalOpen = ref(false); 
const selectedReview = ref(null); 

const openModal = (review) => {
  selectedReview.value = review; 
  isModalOpen.value = true; 
};

const getSourceUrl = (source, placeId) => {
  switch (source) {
    case 'Google':
      return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
    case 'Facebook':
      return 'https://www.facebook.com';
    case 'Yelp':
      return 'https://www.yelp.com';
    default:
      return '#';
  }
};
</script>

<style scoped>
.v-card {
  border-radius: 15px;
  background-color: #ffffff;
}


.v-carousel {
  background-color: #f5f5f5;
  border-radius: 15px;
  padding: 20px;
}

/* Limita el texto a 3 líneas */
.three-lines {
  display: block;
  overflow: hidden;
  max-height: 4.5em;
  line-height: 1.5;
}
</style>