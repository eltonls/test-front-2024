<template>
  <div>
    <v-app>
      <Navbar v-if="route.meta.hasNavbar" />
      <div class="pt-15">
        <RouterView />
      </div>
    </v-app>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import Navbar from './components/navbar/Navbar.vue';

const route = useRoute();
</script>
