<template>
  <div v-if="photo">
    <h1>Title: {{ photo.title }}</h1>
    <img v-if="photo.imageUrl" :src="photo.imageUrl" alt="Photo Image" style="width: 300px; height: auto;" />
    <p>ID: {{ photo.id }}</p>
    <p>User ID: {{ photo.userId }}</p>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      photo: null
    }
  },
  async created() {
    const id = this.$route.params.id
    try {
      const response = await api.get(`/photos/${id}`)
      this.photo = response.data
    } catch (error) {
      console.error('Error fetching photo:', error)
    }
  }
}
</script>
