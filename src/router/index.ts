import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import GridsView from '../views/GridsView.vue'
import BordersView from '../views/BordersView.vue'
import TimelinesView from '../views/TimelinesView.vue'
import WordsView from '../views/WordsView.vue'
import PhysicsView from '../views/PhysicsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/grids',
      name: 'grids',
      component: GridsView,
    },
    {
      path: '/borders',
      name: 'borders',
      component: BordersView,
    },
    {
      path: '/timelines',
      name: 'timelines',
      component: TimelinesView,
    },
    {
      path: '/words',
      name: 'words',
      component: WordsView,
    },
    {
      path: '/physics',
      name: 'physics',
      component: PhysicsView,
    },
  ],
})

export default router
