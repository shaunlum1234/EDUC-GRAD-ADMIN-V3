import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import StudentSearch from '../views/StudentSearch.vue';
import StudentProfile from '../views/StudentProfile.vue';
import AdminGraduationPrograms from '../views/AdminGraduationPrograms.vue';


Vue.use(VueRouter)

const routes = [{
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/',
    name: 'student-search',
    component: StudentSearch
  },
  {
    path: '/student-profile',
    name: 'student-profile',
    component: StudentProfile
  },
  {
    path: '/admin-graduation-programs',
    name: 'admin-graduation-programs',
    component: AdminGraduationPrograms
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router