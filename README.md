
# Consumo de API de Youtube y google 

Este proyecto consiste en una aplicación web desarrollada en Vue.js que consume una API de Youtube y Google. Utiliza Vuetify para los componentes de la interfaz de usuario, CSS personalizado y Tailwind para estilos adicionales. El objetivo es lograr una interfaz visualmente atractiva y funcional.

## Screenshots
![youtube](screenshot.png)
![review](screenshot2.png)

## Tecnologías Usadas

- **Vue.js**: Framework de JavaScript para construir la interfaz de usuario.
- **Vuetify**: Biblioteca de componentes de UI para Vue.
- **Tailwind CSS**: Framework de CSS utilitario para estilos personalizados.
- **Axios**: Librería para realizar peticiones HTTP a la API.
- **Pinia**: Gestión del estado de la aplicación.
- **Places API**: API utilizada para obtener reseñas de lugares.
- **YouTube Data API v3**: API utilizada para obtener videos, vistas, likes, etc de un canal de youtube.

## Estructura Basica del Proyecto

```plaintext
src/
├── assets/                 # Archivos estáticos (imágenes, fuentes, etc.)
├── components/             # Componentes de la interfaz de usuario (UI)
├── stores/                 # Manejo del estado con Pinia                 
└── services/               # Servicios para interactuar con las APIs
```
## Configuración de API Keys

### API de Google Places

Para consumir la **API de Google Places**, necesitas obtener una API key. Sigue estos pasos:

1. Accede a [Google Cloud Console](https://console.cloud.google.com/).
2. Crea un nuevo proyecto o selecciona uno existente.
3. Habilita las siguientes APIs:
   - **Google Places API**
   - **Google Maps JavaScript API** (si es necesario).
4. Dirígete a la sección de **Credenciales**.
5. Crea una nueva **API Key**.
6. Guarda tu **API Key**. La necesitarás para realizar las peticiones a la API de Google Places.

Recuerda que puedes configurar restricciones para la API Key, como limitar su uso a ciertos dominios o direcciones IP.

---

### API de YouTube

Para consumir la **API de YouTube**, sigue estos pasos para obtener tu API Key:

1. Accede a [Google Developers Console](https://console.developers.google.com/).
2. Crea un nuevo proyecto o selecciona uno existente.
3. Habilita la **YouTube Data API v3**:
   - Ve a la sección de **Biblioteca**.
   - Busca y habilita la **YouTube Data API v3**.
4. Dirígete a la sección de **Credenciales**.
5. Crea una nueva **API Key**.
6. Guarda tu **API Key**. La necesitarás para realizar las peticiones a la API de YouTube.

Recuerda que también puedes configurar restricciones para la API Key, como limitar su uso a ciertos dominios o direcciones IP.

---

Con estas claves podrás hacer las peticiones a las APIs de Google Places y YouTube en tu aplicación.

## Uso de AXIOS Y PINIA
**Axios** es una librería de JavaScript para realizar peticiones HTTP. Es ampliamente utilizada para interactuar con APIs y obtener o enviar datos desde y hacia el servidor. 
### Uso en el Proyecto:
En este proyecto, Axios se utiliza para hacer peticiones HTTP a las APIs de **Google Places** y **YouTube**, obteniendo reseñas de lugares y datos de videos, respectivamente.

**Pinia** es una librería de gestión de estado para aplicaciones Vue.js. Es una alternativa moderna a Vuex y ofrece una forma sencilla y eficiente de gestionar el estado global de la aplicación.
### Uso en el Proyecto:
Pinia se utiliza en este proyecto para manejar el estado de las reseñas obtenidas desde la API de **Google Places** y la información de videos de **YouTube**, asegurando que la información esté disponible en todos los componentes relevantes de la aplicación.
