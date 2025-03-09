import axios from 'axios';

const apiKey = 'AIzaSyBDH-5UqlR6m5DbC2BSEpym-ZQ9ohfGOWI'; // Tu API key

const apiClient = axios.create({
  baseURL: 'https://places.googleapis.com/v1/places',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    key: apiKey,
  },
});

export default {
  async getPlaceReviews(placeId) {
    try {
      const response = await apiClient.get(`/${placeId}`, {
        params: {
          fields: 'reviews', // Solicita el campo 'reviews'
        },
      });

      // Depuración: Verifica la estructura de la respuesta
      console.log('API Response:', response.data.reviews);

      // Verifica si response.data.reviews existe
      if (!response.data || !response.data.reviews) {
        console.error('No reviews found in the API response');
        return []; // Devuelve un arreglo vacío si no hay reseñas
      }

      // Mapea las reseñas
      return response.data.reviews.map((review) => ({
        id: review.name || 'unknown', // Usa el campo 'name' como ID
        author: review.authorAttribution?.displayName || 'Anónimo', // Nombre del autor
        rating: review.rating ? Math.min(Math.max(Number(review.rating), 0), 5) : 0, // Convierte a número y asigna 0 si no hay rating
        comment: review.text?.text || 'Sin comentario', // Texto de la reseña
        date: review.relativePublishTimeDescription || 'Fecha desconocida', // Fecha de la reseña
        source: 'Google',
        profilePhoto: review.authorAttribution?.photoUri || 'https://via.placeholder.com/50', // Foto de perfil
        placeId: placeId,
      }));
    } catch (error) {
      console.error('Error fetching place reviews:', error);
      throw error;
    }
  },
};