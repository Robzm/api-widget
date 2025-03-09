import { defineStore } from 'pinia';
import apiPlace from '@/services/apiPlace';

export const useReviewsStore = defineStore('reviews', {
    state: () => ({
      reviews: [], 
      isLoading: false, 
      error: null, 
    }),
    actions: {
      
      async fetchReviews(placeId) {
        this.isLoading = true;
        this.error = null;
  
        try {
          
          this.reviews = await apiPlace.getPlaceReviews(placeId);
        } catch (error) {
          this.error = error.message || 'Error fetching reviews';
          console.error('Error fetching reviews:', error);
        } finally {
          this.isLoading = false;
        }
      },
    },
  });
