import { createRouter, createWebHistory } from 'vue-router';
import Positions from '../pages/Positions.vue';
import Organizations from '../pages/Organizations.vue';
import Departments from "../pages/Departments.vue";

const routes = [
    { path: '/positions', component: Positions },
    { path: '/organizations', component: Organizations },
    { path: '/departments', component: Departments}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
