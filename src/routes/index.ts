import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/login/Login.vue";
import AddUser from "../pages/addUser/AddUser.vue";
import UserList from "../pages/userList/UserList.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: UserList,
      meta: { hasNavbar: true }
    },
    {
      path: "/login",
      component: Login,
      meta: { hasNavbar: false }
    },
    {
      path: "/users",
      component: UserList,
      meta: { hasNavbar: true }
    },
    {
      path: "/users/addUser",
      component: AddUser,
      meta: { hasNavbar: true }
    }
  ]
})

export default router;
