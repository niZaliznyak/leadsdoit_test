<script>
import { mapState, mapMutations } from 'vuex'
import { RouterLink } from 'vue-router'
import { compareAsc, compareDesc, parseISO } from 'date-fns'

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
      order: 'asc',
      orderBy: 'title'
    }
  },
  computed: {
    ...mapState(['notes']),

    isNoNotes() {
      return this.notes.length === 0
    },

    sortedNotes() {
      let ordered = this.notes.slice()
      if (this.orderBy === 'title') {
        ordered.sort((a, b) => a.title.localeCompare(b.title))
        return this.order === 'asc' ? ordered : ordered.reverse()
      }

      const sortFunc = this.order === 'asc' ? compareDesc : compareAsc

      ordered.sort((a, b) => {
        const dateA = a.editDate ? a.editDate : a.creationDate
        const dateB = b.editDate ? b.editDate : b.creationDate

        return sortFunc(parseISO(dateA), parseISO(dateB))
      })

      return ordered
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
    },

    orderByModel: {
      get() {
        return this.orderBy
      },
      set(value) {
        this.order = 'asc'
        this.orderBy = value
      }
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
    <div v-if="!isNoNotes" class="tools">
      <div>
        <span>Order by:</span>
        <input
          type="radio"
          id="radio-title"
          :class="{ rotate: order === 'desc' && orderBy === 'title' }"
          value="title"
          v-model="orderByModel"
          @click="changeOrder"
        />
        <label for="radio-title">note title</label>
        <input
          type="radio"
          id="radio-date"
          :class="{ rotate: order === 'desc' && orderBy === 'date' }"
          value="date"
          v-model="orderByModel"
          @click="changeOrder"
        />
        <label for="radio-date">creation date</label>
      </div>

      <div>
        <select v-model="selectedCategory">
          <option :value="null">All</option>
          <option v-for="title in NOTE_CATEGORIES" :key="title" :value="title">
            {{ title }}
          </option>
        </select>
        <input type="checkbox" id="only-favorite" v-model="onlyFavorite" />
        <label for="only-favorite">Only favorite</label>
      </div>
    </div>

    <div class="notes-list" :class="{ ['hide-scroll']: isNoNotes }">
      <NoteElement v-for="note in filteredNotes" :note="note" :key="note.id" />
      <div v-if="isNoNotes" class="empty-message">
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
