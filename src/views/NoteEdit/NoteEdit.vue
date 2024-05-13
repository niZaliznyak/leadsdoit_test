<script>
import { StyledButton } from '@/components'

export default {
  components: { StyledButton },
  data() {
    return {
      title: '',
      description: '',
      category: 'default',
      isFavorite: false
    }
  },

  methods: {
    saveNote() {
      console.log('note is saved')
    }
  }
}
</script>

<template>
  <div class="edit-card">
    <label for="note-title">Title</label>
    <input id="note-title" type="text" placeholder="Please enter title" v-model="title" />

    <label for="note-description">Description</label>
    <textarea
      id="note-description"
      rows="6"
      placeholder="Please enter description"
      v-model="description"
    ></textarea>

    <div class="edit-card-bottom">
      <div>
        <label for="category-select">Category:</label>
        <select id="category-select" v-model="category">
          <option value="default">🏠 Default</option>
          <option value="work">💼 Work</option>
          <option value="appointment">🗓️ Appointment</option>
        </select>
      </div>

      <StyledButton @click="saveNote" color="success">Save</StyledButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './NoteEdit.styles.scss';
</style>
