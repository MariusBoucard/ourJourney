import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import axios from 'axios'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/song/:id',
    name: 'song',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/songView.vue')
    }
  },
  {
    path: '/album/:id',
    name: 'album',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/albumView.vue')
    }
  },
  {
    path: '/song/linktree/:id',
    name: 'linktree',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/SocialNetworkView.vue')
    }
  },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import(/* webpackChunkName: "about" */ '../views/loginView.vue')
      }
    },
    {
      path: '/admin',
      name: 'admin',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import(/* webpackChunkName: "about" */ '../components/admin/mainView.vue')
      },
      meta: { requiresAuth: true,       hideNavigationLinks: true }
    },
    {
      path: '/admin/addSong',
      name: 'addsong',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import(/* webpackChunkName: "about" */ '../components/admin/addSong.vue')
      },
      meta: { requiresAuth: true,       hideNavigationLinks: true }
    }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
import { useStore } from 'vuex'; // Import useStore from Vuex
// Global navigation guard
router.beforeEach((to, from, next) => {
  const store = useStore(); // Access the Vuex store
  console.log(store)
  // Set showNavigationLinks based on the hideNavigationLinks meta field
  console.log(to.meta.hideNavigationLinks)
  store.commit('app/toggleNavigationLinks', !to.meta.hideNavigationLinks);
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Retrieve the token from localStorage or sessionStorage
    const token = sessionStorage.getItem('token');

    // Check if the token exists
    if (!token) {
      // Redirect to the login page or handle unauthorized access as needed
      next('/login');
    } else {
      // Include the token in the request headers using Axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      next();
    }
  } else {
    // If the route does not require authentication, proceed to the route
    next();
  }
});


export default router
