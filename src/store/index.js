import { createStore } from 'vuex'

export const store = createStore({
  state() {
    return {
      notes: []
    }
  },
  mutations: {
    addNote(state, note) {
      state.notes.unshift(note)
    },
    removeNote(state, noteId) {
      state.notes = state.notes.filter(({ id }) => id !== noteId)
    },
    updateNote(state, payload) {
      const editedIndex = state.notes.findIndex(({ id }) => id === payload.id)
      if (editedIndex !== -1) {
        state.notes[editedIndex] = payload
      } else {
        state.notes.unshift(payload)
      }
    },
    toggleNoteIsFavorite(state, noteId) {
      const edited = state.notes.find(({ id }) => id === noteId)
      if (edited) {
        edited.isFavorite = !edited.isFavorite
      }
    }
  },
  getters: {
    getNoteById: (state) => (id) => {
      return state.notes.find((todo) => todo.id === id)
    }
  }
})
