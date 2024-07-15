<template>
  <form @submit.prevent="handleSubmit">
    <label>
      Photo Title:
      <input v-model="title" type="text" />
    </label>
    <br>
    <label>
      Photo Image:
      <input @change="handleFileUpload" type="file" />
    </label>
    <br>
    <button type="submit">Add Photo</button>
  </form>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      title: '',
      image: null,
    }
  },
  methods: {
    handleFileUpload(event) {
      this.image = event.target.files[0]
    },
    async handleSubmit() {
      const formData = new FormData()
      formData.append('title', this.title)
      formData.append('image', this.image)

      try {
        await api.post('/photos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.title = ''
        this.image = null
        alert('Photo added successfully!')
      } catch (error) {
        console.error('Error adding photo:', error)
        alert('Failed to add photo')
      }
    }
  }
}
</script>
