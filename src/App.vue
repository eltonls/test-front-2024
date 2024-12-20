<template>
  <div>
    <h1>Alô, users</h1>
    {{ users }}
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Service } from './api/Service';

const users = ref([]);

onMounted(() => {
  Service.getUsuarios().then((data) => {
    users.value = data;
  })
})
</script>

<style scoped></style>
