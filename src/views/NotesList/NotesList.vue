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
      selectedCategory: null,
      order: 'asc'
    }
  },
  computed: {
    ...mapState(['notes']),

    sortedNotes() {
      let ordered = this.notes.slice().sort((a, b) => a.title.localeCompare(b.title))
      if (this.order === 'asc') {
        return ordered
      }
      return ordered.reverse()
    },

    filteredNotes() {
      let filtered = this.sortedNotes

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
    ...mapMutations(['toggleNoteIsFavorite']),

    changeOrder() {
      this.order = this.order === 'desc' ? 'asc' : 'desc'
    }
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
      <button
        title="order"
        class="text-button"
        :class="{ rotated: this.order === 'desc' }"
        @click="changeOrder"
      >
        🔺
      </button>
    </div>
    <div class="notes-list">
      <NoteElement v-for="note in filteredNotes" :note="note" :key="note.id" />
      <div v-if="notes.length === 0" class="empty-message">
        <h3>You don't have any notes 🗿</h3>
        <RouterLink to="/new">
          <StyledButton>Let's create one😎</StyledButton>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './NoteList.styles.scss';
</style>
