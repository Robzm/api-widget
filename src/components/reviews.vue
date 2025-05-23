<template>
  <v-container>
    <!-- Esqueleto de carga -->
    <div v-if="isLoading" class="h-[400px]">
      <v-skeleton-loader type="card" :elevation="24" class="mb-4"></v-skeleton-loader>

    </div>

    <!-- Carrusel de reseñas -->
    <v-carousel v-else cycle height="400" hide-delimiter-background show-arrows>
      <v-carousel-item v-for="review in reviews" :key="review.id">
        <v-card class="mx-auto my-12" max-width="600" elevation="10">
          <v-card-text class="text-center pa-10">
            <!-- Perfil del autor -->
            <div class="d-flex align-center justify-center mb-4">
              <v-avatar size="50" class="mr-3">
                <a :href="getSourceUrl(review.source, review.placeId)" target="_blank">
                  <img :src="review.profilePhoto" :alt="review.author" />
                </a>
              </v-avatar>
              <div>
                <div class="font-weight-bold">{{ review.author }}</div>
                <div class="text-caption text-grey">
                  {{ review.date }} ·
                  <a :href="getSourceUrl(review.source, review.placeId)" target="_blank"
                    class="text-decoration-none hover:text-blue-700">
                    {{ review.source }}
                  </a>
                </div>
              </div>
            </div>

            <!-- Estrellas -->
            <div class="flex items-center">
              <template v-for="n in 5" :key="n">
                <svg xmlns="http://www.w3.org/2000/svg"
                  :class="n <= review.rating ? 'h-5 w-5 text-yellow-500' : 'h-5 w-5 text-gray-300'" fill="currentColor"
                  viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    d="M9.049 2.927c.3-.921 1.688-.921 1.988 0l1.58 4.836a1 1 0 0 0 .95.69h5.067c.97 0 1.371 1.24.588 1.81l-4.1 2.977a1 1 0 0 0-.362 1.118l1.58 4.836c.3.921-.755 1.688-1.588 1.118l-4.1-2.977a1 1 0 0 0-1.176 0l-4.1 2.977c-.833.57-1.888-.197-1.588-1.118l1.58-4.836a1 1 0 0 0-.362-1.118l-4.1-2.977c-.783-.57-.38-1.81.588-1.81h5.067a1 1 0 0 0 .95-.69L9.049 2.927z" />
                </svg>
              </template>
            </div>

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
  reviewsStore.fetchReviews('ChIJWR-8hl3OBZERQ9-1nbFCjdk');
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