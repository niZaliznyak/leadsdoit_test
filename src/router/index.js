import { createRouter, createWebHistory } from 'vue-router'
import { NotesList } from '../views'

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
      name: 'edit-note',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditNote.vue')
    }
  ]
})

export default router
