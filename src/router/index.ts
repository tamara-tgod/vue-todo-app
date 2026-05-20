import { createRouter, createWebHistory } from 'vue-router'

import HomePage from "../pages/HomePage.vue";
import TaskDetails from "../pages/TaskDetails.vue";
import NotFound from "../pages/NotFound.vue";

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/tasks/:id',
    component: TaskDetails
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

 

export default router
