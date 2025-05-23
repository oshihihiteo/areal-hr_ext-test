import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/userStore.js";
import { storeToRefs } from 'pinia';
import Positions from "../pages/Positions.vue";
import Organizations from "../pages/Organizations.vue";
import Departments from "../pages/Departments.vue";
import Employees from "@/pages/Employees.vue";
import Changelog from "@/pages/Changelog.vue";
import HrOperations from "@/pages/HrOperations.vue";
import Files from "@/pages/Files.vue";
import Users from "@/pages/Users.vue";
import Login from "@/pages/Login.vue";

const routes = [
  { path: "/positions", component: Positions },
  { path: "/organizations", component: Organizations },
  { path: "/departments", component: Departments },
  { path: "/employees", component: Employees },
  { path: "/changelog", component: Changelog },
  { path: "/hr-operations", component: HrOperations },
  { path: "/files", component: Files },
  { path: "/users", component: Users },
  { path: "/login", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

let isUserChecked = false;

router.beforeEach(async (to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);

  const userStore = useUserStore();

  if (!isUserChecked) {
    isUserChecked = true;
    await userStore.getCurrentUser();
  }

  const isLoggedIn = !!userStore.user;

  if (authRequired && !isLoggedIn) {
    return next('/login');
  }

  if (to.path === '/login' && isLoggedIn) {
    return next('/');
  }

  return next();
});


export default router;
