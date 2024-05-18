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
      path: '/blog',
      name: 'Blog',
      component: () => import('../views/CoffeeBlog.vue')
    },
    {
      path: '/fal/tarot',
      name: 'Tarot',
      component: () => import('../views/TarotView.vue'),
      beforeEnter: (to, from, next) => {
        projectAuth.onAuthStateChanged(user => {
          if (user) {
            next();
          } else {
            next({ name: 'LoginView' });
          }
        });
      }
    },
    {
      path: '/blog2',
      name: 'Blog2',
      component: () => import('../views/CoffeeBlog2.vue')
    },
    {
      path: '/help',
      name: 'HelpPage',
      component: () => import('../views/HelpView.vue')
    },
    {
      path: '/login',
      name: 'LoginView',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/fal/kahve',
      name: 'CoffeFortune',
      component: () => import('../views/CoffeeFortune.vue'),
      beforeEnter: (to, from, next) => {
        projectAuth.onAuthStateChanged(user => {
          if (user) {
            next();
          } else {
            next({ name: 'LoginView' });
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
            next({ name: 'LoginView' });
          }
        });
      }
    },
    {
      path: '/fal/el',
      name: 'PalmFortune',
      component: () => import('../views/PalmFortune.vue'),
      beforeEnter: (to, from, next) => {
        projectAuth.onAuthStateChanged(user => {
          if (user) {
            next();
          } else {
            next({ name: 'LoginView' });
          }
        });
      }
    }
  ]
});

export default router;
