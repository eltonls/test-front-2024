import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/login/Login.vue";
import UserList from "../pages/userList/UserList.vue";
import AddUser from "../pages/addUser/AddUser.vue";

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
    },
    {
      path: "/users/addUser",
      component: AddUser
    }
  ]
})

export default router;
