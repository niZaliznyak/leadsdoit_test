<script>
import { mapState, mapMutations } from 'vuex'
import { RouterLink } from 'vue-router'

import { NoteElement } from './NoteElement'
import { StyledButton } from '@/components'

export default {
  components: {
    NoteElement,
    StyledButton,
    RouterLink
  },
  data() {
    return {
      onlyFavorite: false
    }
  },
  computed: {
    ...mapState(['notes']),

    filteredNotes() {
      if (this.onlyFavorite) {
        return this.notes.filter(({ isFavorite }) => isFavorite)
      }
      return this.notes
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
