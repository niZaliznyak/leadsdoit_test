import { createStore } from 'vuex'

const initialState = localStorage.getItem('vue-notes')
  ? JSON.parse(localStorage.getItem('vue-notes'))
  : { notes: [] }

const store = createStore({
  state() {
    return initialState
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

const localStorageSaver = (state) => {
  localStorage.setItem('vue-notes', JSON.stringify(state))
}

store.subscribe((mutation, state) => {
  localStorageSaver(state)
})

export { store }
