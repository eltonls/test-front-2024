<template>
    <v-navigation-drawer :width="350" class="pa-2 pt-5" elevation="8" location="right" :persistent="false"
      :model-value="props.isFilterDrawerOpen" @update:model-value="updateDrawer">
      <v-container>
        <v-row class="mb-2 d-flex justify-end">
          <v-btn variant="flat" @click="$emit('filterToggle')">
            <v-icon icon="mdi-close"></v-icon>
          </v-btn>
        </v-row>
        <v-row>
          <v-text-field v-model="queryParams.nome" label="Nome" clearable></v-text-field>
        </v-row>
        <v-row>
          <v-text-field v-model="queryParams.matricula" label="Matricula" clearable></v-text-field>
        </v-row>
        <v-row>
          <v-range-slider label="Idade" v-model="idadeFilterRange" min="18" max="99" step="1"
            :thumb-label="true" class="pa-2" @update:model-value="updateAgeFilters" strict></v-range-slider>
        </v-row>
        <v-row>
          <v-select label="Selecione um Cargo" v-model="queryParams.cargo" :items="cargos"></v-select>
        </v-row>
        <v-row>
          <v-select label="Selecione um tipo" v-model="queryParams.tipo" :items="tipos"></v-select>
        </v-row>
        <v-row class="d-flex ga-2">
          <v-btn class="w-100" @click="clearFilters">Limpar Filtros</v-btn>
          <v-btn class="w-100" @click="$emit('applyFilters')">Aplicar Filtros</v-btn>
        </v-row>
      </v-container>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import QueryParams from '../../../models/queryParams.model';

const emit = defineEmits([ "filterToggle", "applyFilters", "clearFilters", "setAgeFilters" ]);

const idadeFilterRange = ref([18, 99]);

const props = defineProps({
  queryParams: {
    type: {} as PropType<QueryParams>,
    required: true
  },
  isFilterDrawerOpen: {
    type: Boolean,
    required: true
  }
});

const cargos = [
  "Analista",
  "Gerente",
  "Desenvolvedor",
  "Professor"
]

const tipos = [
  {
    title: "Administrador",
    value: 1
  },
  {
    title: "Comum",
    value: 2
  }
]

function clearFilters() {
  idadeFilterRange.value[0] = 0;
  idadeFilterRange.value[1] = 99;

  emit("clearFilters");
}

function updateAgeFilters() {
  emit('setAgeFilters', idadeFilterRange.value[0], idadeFilterRange.value[1]);
}

function updateDrawer() {
  emit("filterToggle")
}
</script>
