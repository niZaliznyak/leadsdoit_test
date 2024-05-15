<script>
import { mapMutations } from 'vuex'
import { parseISO } from 'date-fns'

import { StyledButton, FavoriteButton } from '@/components'
import { mapProp } from '@/utils/mapProp'

export default {
  props: {
    note: Object
  },
  components: {
    StyledButton,
    FavoriteButton
  },

  computed: {
    ...mapProp('note', [
      'id',
      'title',
      'description',
      'category',
      'editDate',
      'creationDate',
      'isFavorite'
    ])
  },
  methods: {
    ...mapMutations(['toggleNoteIsFavorite', 'removeNote']),

    onFavClick(id) {
      this.toggleNoteIsFavorite(id)
    },

    onDeleteClick(id) {
      this.removeNote(id)
    },

    onEditClick(id) {
      this.$router.push({ path: `/edit/${id}` })
    },

    parseDate(dateISO) {
      return parseISO(dateISO).toLocaleString()
    }
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
          <FavoriteButton :isActive="isFavorite" @click="onFavClick(id)"></FavoriteButton>
        </div>
      </div>
      <h3>{{ description }}</h3>
    </div>
    <div class="note-card-bottom">
      <span>
        {{ `created: ${parseDate(creationDate)}` }}
        <span v-if="editDate" class="edited-date"> {{ ` (edited: ${parseDate(editDate)})` }}</span>
      </span>
      <div class="note-card-actions">
        <StyledButton color="danger" @click="onDeleteClick(id)">Delete</StyledButton>
        <StyledButton @click="onEditClick(id)">Edit</StyledButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './NoteElement.styles.scss';
</style>
