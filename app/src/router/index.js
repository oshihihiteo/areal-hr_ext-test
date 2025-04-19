import { createRouter, createWebHistory } from "vue-router";
import Positions from "../pages/Positions.vue";
import Organizations from "../pages/Organizations.vue";
import Departments from "../pages/Departments.vue";
import Employees from "@/pages/Employees.vue";
import Changelog from "@/pages/Changelog.vue";
import HrOperations from "@/pages/HrOperations.vue";
import Files from "@/pages/Files.vue";
import Users from "@/pages/Users.vue";

const routes = [
  { path: "/positions", component: Positions },
  { path: "/organizations", component: Organizations },
  { path: "/departments", component: Departments },
  { path: "/employees", component: Employees },
  { path: "/changelog", component: Changelog },
  { path: "/hr-operations", component: HrOperations },
  { path: "/files", component: Files },
  { path: "/users", component: Users}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
