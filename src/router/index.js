import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { projectAuth } from '@/firebase'


const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },{
    path: '/fal',
    name: 'FalView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/FalView.vue'),
    beforeEnter: (to, from, next) => {
      const user =projectAuth.currentUser
      if(!user){
        next({name:'HomeView'})
      }
      else{
        next()
      }
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
