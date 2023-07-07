import { createRouter, createWebHistory } from "vue-router";
import ErrorPage from "@/components/ErrorPage.vue";
import BackendSessionExpired from "@/components/BackendSessionExpired.vue";
import SessionExpired from "@/components/SessionExpired.vue";
import UnAuthorized from "@/components/UnAuthorized.vue";
import UnAuthorizedPage from "@/components/UnAuthorizedPage.vue";
import {useAuthStore} from "../store/modules/auth";
import {useAccessStore} from "../store/modules/access";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "Home",
      component: () => import("../views/Home.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/",
      name: "search",
      component: () => import("../views/StudentSearch.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue"),
      meta: {
        guest: true,
      },
    },
    {
      path: "/batch-processing",
      name: "Batch Processing",
      component: () => import("../views/BatchProcessing.vue"),
      meta: {
        guest: false,
      },
    },
    {
      path: "/logout",
      name: "Logout",
      component: () => import("../views/Logout.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/assessments",
      name: "Assessments",
      component: () => import("../views/Assessments.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/courses",
      name: "Courses",
      component: () => import("../views/Courses.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/error",
      name: "error",
      component: ErrorPage,
    },
    {
      path: "/token-expired",
      name: "backend-session-expired",
      component: BackendSessionExpired,
    },
    {
      path: "/schools",
      name: "Schools",
      component: () => import("../views/Schools.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/session-expired",
      name: "session-expired",
      component: SessionExpired,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/unauthorized",
      name: "unauthorized",
      component: UnAuthorized,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/unauthorized-page",
      name: "unauthorized-page",
      component: UnAuthorizedPage,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/student-profile/:studentId",
      name: "student-profile",
      component: () => import("../views/StudentProfile.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/psi",
      name: "psi",
      component: () => import("../views/PSI.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/school-reports",
      name: "school-reports",
      component: () => import("../views/SchoolReports.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});
router.beforeEach((to, _from, next) => {
  const aStore = useAuthStore();
  const accessStore = useAccessStore();
  // this section is to set page title in vue store
  if (to.meta.requiresAuth) {
    aStore.getJwtToken().then(() => {
      if (!aStore.isAuthenticated) {
        next('/token-expired');
      } else {
        accessStore.setAccess().then(() => {
          next()
        }).catch((error) => {
          next('error');
        });
        aStore.getUserInfo().then(() => {
          next()
        }).catch(() => {
          next('error');
        });
      }
    }).catch(() => {
      if (!aStore.userInfo) {
        next('/login');
      }else{
        next('/token-expired');
      }
    });
  }
  else{
    next();
  }
});
export default router;
