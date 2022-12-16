import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ErrorPage from '@/components/ErrorPage.vue';
import BackendSessionExpired from '@/components/BackendSessionExpired.vue';
import SessionExpired from '@/components/SessionExpired.vue';
import UnAuthorized from '@/components/UnAuthorized.vue';
import UnAuthorizedPage from '@/components/UnAuthorizedPage.vue';
import Assessments from '@/views/Assessments.vue';
import authStore from '@/store/modules/auth';
import store from '@/store/index';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: {
        guest: true
      }
    },
    {
      path: '/batch-processing',
      name: 'Batch Processing',
      component: () => import('../views/BatchProcessing.vue'),
      meta: {
        guest: false
      }
    },    
    {
      path: '/logout',
      name: 'Logout',
      component: () => import('../views/Logout.vue'),
      meta: {
        requiresAuth: false
      }
    },    
    {
      path: '/assessments',
      name: 'Assessments',
      component: () => import('../views/Assessments.vue'),
      meta: {
        requiresAuth: true
      }
    } ,    
    {
      path: '/error',
      name: 'error',
      component: ErrorPage
    },
    {
      path: '/token-expired',
      name: 'backend-session-expired',
      component: BackendSessionExpired
    },  
    {
      path: '/session-expired',
      name: 'session-expired',
      component: SessionExpired,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: UnAuthorized,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/unauthorized-page',
      name: 'unauthorized-page',
      component: UnAuthorizedPage,
      meta: {
        requiresAuth: false
      }
    }
  ]
})


router.beforeEach((to, _from, next) => {
  function validateAndExecute(nextRouteInError) {
    store.dispatch('auth/getJwtToken').then(() => {
      if (!authStore.state.isAuthenticated) {
        next(nextRouteInError);
      } else {
        store.dispatch('auth/getUserInfo').then(() => {
          if (!authStore.state.isAuthorizedUser) {
            next('unauthorized');
          } else if (to.meta.role && !store.getters[`auth/${to.meta.role}`]) {
            next('unauthorized-page');
          } else {
            next();
          }
        }).catch(() => {
          // eslint-disable-next-line
          console.log('Unable to get user info');
          next('error');
        });
      }
    }).catch(() => {
      
      next(nextRouteInError);
    });
  }
  // this section is to set page title in vue store
  if (to && to.meta) {
    store.commit('app/setPageTitle',to.meta.pageTitle);
  } else {
    store.commit('app/setPageTitle','');
  }

  // // This section is to clear the search results when users are not on a search page
  // if (!to.meta.saveSearch){
  //   store.commit('studentSearch/clearStudentSearchParams');
  //   store.commit('studentSearch/clearStudentSearchResults');
  // }

  // this section is to handle the backend session expiry, where frontend vue session is still valid.
  if (to.meta.requiresAuth && authStore.state.isAuthenticated) {
    validateAndExecute('/token-expired');
  }else if (to.meta.requiresAuth) {
    validateAndExecute('login');
  }
  else{
    next();
  }
});
export default router;
