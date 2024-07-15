<template>
  <div>
    <h1>Photo Gallery</h1>
    <ul>
      <li v-for="photo in photos" :key="photo.id">
        <router-link :to="'/photos/' + photo.id">
          <img v-if="photo.imageUrl" :src="photo.imageUrl" alt="Photo Image" style="width: 100px; height: auto;" />
          {{ photo.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      photos: []
    }
  },
  async created() {
    try {
      const response = await api.get('/photos')
      this.photos = response.data
    } catch (error) {
      console.error('Error fetching photos:', error)
    }
  }
}
</script>
