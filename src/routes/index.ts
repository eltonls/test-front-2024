import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/login/Login.vue";
import UserList from "../pages/userList/UserList.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      component: Login
    },
    {
      path: "/users",
      component: UserList
    }
  ]
})

export default router;
