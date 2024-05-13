<script>
import { mapMutations } from 'vuex'

import { StyledButton } from '@/components'

export default {
  props: {
    id: String,
    title: String,
    description: String,
    category: String,
    editDate: Date,
    creationDate: Date,
    isFavorite: Boolean
  },
  components: {
    StyledButton
  },
  methods: {
    ...mapMutations([''])
  }
}
</script>

<template>
  <div class="note-card">
    <div>
      <div class="note-card-title">
        <h2>{{ title }}</h2>
        <div>
          <span class="note-card-category">{{ `category: ${category}` }}</span>
          <button class="text-button favicon" :class="{ active: isFavorite }">⭐</button>
        </div>
      </div>
      <h3>{{ description }}</h3>
    </div>
    <div class="note-card-bottom">
      <span>
        {{ `created: ${creationDate.toLocaleString()}` }}
        <span v-if="editDate" class="edited-date">
          {{ ` (edited: ${editDate.toLocaleString()})` }}</span
        >
      </span>
      <div class="note-card-actions">
        <StyledButton color="danger">Delete</StyledButton>
        <StyledButton>Edit</StyledButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './NoteElement.styles.scss';
</style>
