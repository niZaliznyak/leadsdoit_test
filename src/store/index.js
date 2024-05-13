import { createStore } from 'vuex'

export const store = createStore({
  state() {
    return {
      notes: []
    }
  },
  mutations: {
    ADD_NOTE(state, note) {
      state.notes.unshift(note)
    },
    REMOVE_NOTE(state, noteId) {
      state.notes = state.notes.filter(({ id }) => id !== noteId)
    },
    UPDATE_NOTE(state, payload) {
      const editedIndex = state.notes.findIndex(({ id }) => id === payload.id)
      if (editedIndex !== -1) {
        state.notes[editedIndex] = payload
      } else {
        state.notes.unshift(payload)
      }
    },
    TOGGLE_NOTE_IS_FAVORITE(state, noteId) {
      const edited = state.notes.find(({ id }) => id === noteId)
      if (edited) {
        edited.isFavorite = !edited.isFavorite
      }
    }
  }
})
