import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MoodSelect from '../views/MoodSelect.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ForumView from '../views/ForumView.vue'
import ResultsView from '../views/ResultsView.vue' 
import LovedView from '../views/LovedView.vue'     

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/', 
      name: 'home', 
      component: HomeView 
    },
    { 
      path: '/mood-select', 
      name: 'mood-select', 
      component: MoodSelect 
    },
    { 
      path: '/login', 
      name: 'login', 
      component: LoginView 
    },
    { 
      path: '/register', 
      name: 'register', 
      component: RegisterView 
    },
    { 
      path: '/forum', 
      name: 'forum', 
      component: ForumView 
    },
    { 
      path: '/results/:mood?', 
      name: 'results', 
      component: ResultsView,
      props: true 
    },
    { 
      path: '/loved', 
      name: 'loved', 
      component: LovedView 
    }
  ]
})

export default router
