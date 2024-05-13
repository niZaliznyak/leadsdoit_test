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
    <NoteElement
      v-for="{ id, title, description, creationDate, editDate, category } in notes"
      :key="id"
      :id="id"
      :title="title"
      :category="category"
      :description="description"
      :creation-date="creationDate"
      :edit-date="editDate"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './NoteList.styles.scss';
</style>
