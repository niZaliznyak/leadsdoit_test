<script>
import { mapState, mapMutations } from 'vuex'
import { RouterLink } from 'vue-router'

import { NoteElement } from './NoteElement'
import { StyledButton } from '@/components'

import { NOTE_CATEGORIES } from '@/constants/note-categories'

export default {
  components: {
    NoteElement,
    StyledButton,
    RouterLink
  },
  setup() {
    return {
      NOTE_CATEGORIES
    }
  },
  data() {
    return {
      onlyFavorite: false,
      selectedCategory: null
    }
  },
  computed: {
    ...mapState(['notes']),

    filteredNotes() {
      let filtered = this.notes

      if (this.onlyFavorite) {
        filtered = filtered.filter(({ isFavorite }) => isFavorite)
      }

      if (this.selectedCategory) {
        filtered = filtered.filter(({ category }) => category === this.selectedCategory)
      }

      return filtered
    }
  },
  methods: {
    ...mapMutations(['toggleNoteIsFavorite'])
  }
}
</script>

<template>
  <div>
    <div class="tools">
      <input type="checkbox" id="only-favorite" v-model="onlyFavorite" />
      <label for="only-favorite">Only favorite</label>
      <select v-model="selectedCategory">
        <option :value="null">All</option>
        <option v-for="title in NOTE_CATEGORIES" :key="title" :value="title">
          {{ title }}
        </option>
      </select>
    </div>
    <div class="notes-list">
      <NoteElement v-for="note in filteredNotes" :note="note" :key="note.id" />
      <div v-if="notes.length === 0" class="empty-message">
        <h3>You don't have any notes 🗿</h3>
        <RouterLink to="/edit/new">
          <StyledButton>Let's create one😎</StyledButton>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './NoteList.styles.scss';
</style>
