import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/login/Login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      component: Login
    }
  ]
})

export default router;
