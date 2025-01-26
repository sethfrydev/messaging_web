import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from './layouts/MainLayout.vue';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import Dashboard from './views/Dashboard.vue';
import { authState } from './store/auth'; // Import authState for guarding routes

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
      {
        path: 'login',
        name: 'Login',
        component: Login,
        beforeEnter: (to, from, next) => {
          // Redirect to dashboard if logged in
          if (authState.isLoggedIn) next('/dashboard');
          else next();
        },
      },
      {
        path: 'signup',
        name: 'Signup',
        component: Signup,
        beforeEnter: (to, from, next) => {
          // Redirect to dashboard if logged in
          if (authState.isLoggedIn) next('/dashboard');
          else next();
        },
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        beforeEnter: (to, from, next) => {
          // Redirect to login if not logged in
          if (!authState.isLoggedIn) next('/login');
          else next();
        },
      },
    ],
  },
  {
    path: '/:catchAll(.*)', // Catch-all for undefined routes
    redirect: '/', // Redirect to Home or an error page
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
