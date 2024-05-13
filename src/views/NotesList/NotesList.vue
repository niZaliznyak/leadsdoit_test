<script>
import { mapState, mapMutations } from 'vuex'
import { NoteElement } from './NoteElement'

export default {
  components: {
    NoteElement
  },
  computed: {
    ...mapState(['notes'])
  },
  methods: {
    ...mapMutations(['TOGGLE_NOTE_IS_FAVORITE'])
  }
}
</script>

<template>
  <div class="notes-list">
    <NoteElement v-for="note in notes" :note="note" :key="note.id" />
  </div>
</template>

<style lang="scss" scoped>
@import './NoteList.styles.scss';
</style>
