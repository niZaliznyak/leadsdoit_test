<script>
import { mapMutations, mapGetters } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { StyledButton, FavoriteButton } from '@/components'

import { NOTE_CATEGORIES } from '@/constants/note-categories'
const defaultForm = {
  title: '',
  description: '',
  category: NOTE_CATEGORIES[0],
  isFavorite: false
}

export default {
  components: { StyledButton, FavoriteButton },
  setup() {
    return {
      NOTE_CATEGORIES
    }
  },
  data() {
    return {
      form: { ...defaultForm }
    }
  },

  computed: {
    isNew() {
      return this.$route.path === '/new'
    },

    editedNote() {
      return this.getNoteById()(this.$route.params.id)
    }
  },

  methods: {
    ...mapMutations(['addNote', 'updateNote']),
    ...mapGetters(['getNoteById']),

    onAddClick() {
      const { title, description, category, isFavorite } = this.form
      const currrentDate = new Date()
      this.addNote({
        id: uuidv4(),
        title,
        description,
        category,
        creationDate: currrentDate.toISOString(),
        isFavorite
      })
      this.$router.push({ name: 'home' })
    },

    onSaveClick() {
      const currrentDate = new Date()
      this.updateNote({ ...this.form, editDate: currrentDate.toISOString() })
      this.$router.push({ name: 'home' })
    },

    onFavClick() {
      this.form.isFavorite = !this.form.isFavorite
    }
  },

  created() {
    if (!this.isNew) {
      this.form = this.editedNote ? { ...this.editedNote } : { ...defaultForm }
    }
  }
}
</script>

<template>
  <div class="edit-card">
    <label for="note-title">Title</label>
    <input id="note-title" type="text" placeholder="Please enter title" v-model="form.title" />

    <label for="note-description">Description</label>
    <textarea
      id="note-description"
      rows="6"
      placeholder="Please enter description"
      v-model="form.description"
    ></textarea>

    <div class="edit-card-bottom">
      <div>
        <label for="category-select">Category:</label>
        <select id="category-select" v-model="form.category">
          <option v-for="title in NOTE_CATEGORIES" :key="title" :value="title">
            {{ title }}
          </option>
        </select>
        <FavoriteButton :isActive="form.isFavorite" @click="onFavClick"></FavoriteButton>
      </div>

      <StyledButton v-if="isNew" @click="onAddClick" color="success">Add</StyledButton>
      <StyledButton v-else @click="onSaveClick" color="success">Save Changes</StyledButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './NoteEdit.styles.scss';
</style>
