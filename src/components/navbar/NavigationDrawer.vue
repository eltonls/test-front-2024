<template>
  <v-navigation-drawer v-model="props.isOpen" elevation="4" color="indigo" :persistent="false">
    <v-list-item>
      <v-btn class="w-100" variant="text" to="/users">Usuários</v-btn>
    </v-list-item>
    <v-divider />
    <v-list-item>
      <v-btn class="w-100" variant="text" active-color="indigo" @click="$emit('logout')">Fazer Logout</v-btn>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const emits = defineEmits(["logout"]);

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
    default: false
  }
})
</script>
