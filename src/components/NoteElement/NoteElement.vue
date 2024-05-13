<script>
import { StyledButton } from '@/components/StyledButton'
export default {
  props: {
    title: String,
    description: String,
    category: String,
    editDate: String,
    creationDate: String,
    isFavorite: Boolean
  },
  components: {
    StyledButton
  }
}
</script>

<template>
  <div class="note-card">
    <div>
      <div class="note-card-title">
        <h2>{{ title }}</h2>
        <button class="text-button favicon" :class="{ active: isFavorite }">⭐</button>
      </div>
      <h3>{{ description }}</h3>
    </div>
    <div class="note-card-bottom">
      <span>{{ `created: ${creationDate.toLocaleString()}` }}</span>
      <span v-if="editDate" class="edited-date">
        {{ ` (edited: ${editDate.toLocaleString()})` }}</span
      >
      <StyledButton color="danger">Delete</StyledButton>
      <StyledButton>Edit</StyledButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './NoteElement.styles.scss';
</style>
