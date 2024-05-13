<script>
import { mapMutations } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { StyledButton } from '@/components'

import { NOTE_CATEGORIES } from '@/constants/note-categories'

export default {
  components: { StyledButton },
  setup() {
    return {
      NOTE_CATEGORIES
    }
  },
  data() {
    return {
      title: '',
      description: '',
      category: NOTE_CATEGORIES[0],
      isFavorite: false
    }
  },

  methods: {
    ...mapMutations(['ADD_NOTE', 'UPDATE_NOTE']),

    saveNote() {
      this.ADD_NOTE({
        id: uuidv4(),
        title: this.title,
        description: this.description,
        category: this.category,
        creationDate: new Date(),
        isFavorite: false
      })
      this.clearForm()
      this.$router.push({ name: 'home' })
    },

    clearForm() {
      this.title = ''
      this.description = ''
      this.category = 'default'
      this.isFavorite = false
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
          <option v-for="title in NOTE_CATEGORIES" :key="title" :value="title">
            {{ title }}
          </option>
        </select>
      </div>

      <StyledButton @click="saveNote" color="success">Save</StyledButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './NoteEdit.styles.scss';
</style>
