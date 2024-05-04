import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { projectAuth } from '@/firebase'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/terms',
      name: 'TermsPage',
      component: () => import('../views/TermsPage.vue')
    },
    {
      path: '/login',
      name: 'LoginView',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/fal',
      name: 'FalView',
      component: () => import('../views/FalView.vue'),
      beforeEnter: (to, from, next) => {
        projectAuth.onAuthStateChanged(user => {
          if (user) {
            next();
          } else {
            next({ name: 'HomeView' });
          }
        });
      }
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('../views/UserView.vue'),
      beforeEnter: (to, from, next) => {
        projectAuth.onAuthStateChanged(user => {
          if (user) {
            next();
          } else {
            next({ name: 'HomeView' });
          }
        });
      }
    },
    {
      path: '/eltest',
      name: 'eltest',
      component: () => import('../views/ElTest.vue'),
      beforeEnter: (to, from, next) => {
        projectAuth.onAuthStateChanged(user => {
          if (user) {
            next();
          } else {
            next({ name: 'HomeView' });
          }
        });
      }
    }
  ]
});

export default router;
