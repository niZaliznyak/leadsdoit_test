<script>
import { NoteElement } from './NoteElement'

export default {
  components: {
    NoteElement
  }
}
</script>

<template>
  <div class="notes-list">
    <NoteElement
      v-for="num in 20"
      :key="num"
      :title="'I\'m note'"
      :description="'description'"
      :creation-date="new Date()"
      :edit-date="new Date()"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './NoteList.styles.scss';
</style>
