<template>
  <div>
    <v-app-bar elevation="4" scroll-behavior="fully-hide" dense fixed color="indigo">
      <v-app-bar-nav-icon class="d-md-block d-lg-none" @click="toggleDrawer">
        <v-icon icon="mdi-close" v-if="isNavigationDrawerOpen"></v-icon>
        <v-icon icon="mdi-menu" v-else></v-icon>
      </v-app-bar-nav-icon>
      <v-app-bar-title class="title">Gerenciador de Usuários</v-app-bar-title>

      <v-col class="d-none d-lg-flex justify-lg-end">
        <v-btn to="/users">Usuários</v-btn>
        <v-btn @click="logout">Fazer Logout</v-btn>
      </v-col>
    </v-app-bar>
    <NavigationDrawer @logout="logout" :is-open="isNavigationDrawerOpen" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavigationDrawer from './NavigationDrawer.vue';
import { UserStore } from '../../stores/user.store';
import router from '../../routes';

const userStore = UserStore();
const isNavigationDrawerOpen = ref(false);

function toggleDrawer() {
  isNavigationDrawerOpen.value = !isNavigationDrawerOpen.value;
}

function logout() {
  userStore.removeUser();
  router.push("/login");
}
</script>

<style scoped>
.title {
  font-weight: 700;
  letter-spacing: 1.5px;
}
</style>
