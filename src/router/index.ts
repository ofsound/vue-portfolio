import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import MusicView from '../views/MusicView.vue'
import GridsView from '../views/GridsView.vue'
import BordersView from '../views/BordersView.vue'
import GreensockView from '../views/GreensockView.vue'
import WordsView from '../views/WordsView.vue'

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
      path: '/music',
      name: 'music',
      component: MusicView,
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
      path: '/greensock',
      name: 'greensock',
      component: GreensockView,
    },
    {
      path: '/words',
      name: 'words',
      component: WordsView,
    },
  ],
})

export default router
