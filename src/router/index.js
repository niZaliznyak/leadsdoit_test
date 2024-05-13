import { createRouter, createWebHistory } from 'vue-router'
import { NotesList, NoteEdit } from '../views'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NotesList
    },
    {
      path: '/edit',
      children: [
        {
          path: ':id',
          component: NoteEdit
        },
        {
          path: 'new',
          component: NoteEdit
        }
      ]
    }
  ]
})

export default router
