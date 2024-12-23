<template>
  <v-container>
    <div class="d-flex ga-5">
      <h2>Usuários</h2>
      <v-btn @click="toggleFilterDrawer" append-icon="mdi-filter">Filtrar</v-btn>
    </div>
    <FilterDrawer :query-params="queryParams" :is-filter-drawer-open="isFilterShown" @filterToggle="toggleFilterDrawer"
      @applyFilters="getUsuarios" @clearFilters="clearFilters" @setAgeFilters="setAgeFilters" />
    <v-row dense>
      <v-col>
        <v-data-table-server :items="users" v-model:items-per-page="itemsPerPage" :headers="headers"
          :items-length="itemsTotal" custom>
          <template v-slot:[`item.tipo`]="{ item }">
            <p>{{ item.tipo == 1 ? "Admin" : "Comum" }}</p>
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Usuario from '../../models/user.model';
import { Service } from '../../api/Service';
import QueryParams from '../../models/queryParams.model';
import FilterDrawer from './components/FilterDrawer.vue';

const headers = [
  { title: 'Nome', key: 'nome', align: 'center' },
  { title: 'Matrícula', key: 'matricula', align: 'center' },
  { title: 'Idade', key: 'idade', align: 'center' },
  { title: 'Cargo', key: 'cargo', align: 'center' },
  { title: 'Tipo de Usuário', key: 'tipo', align: 'center' },
]

const itemsPerPage = ref(5);
const itemsTotal = ref(0);
const users = ref([] as Array<Usuario>);
const queryParams = ref(new QueryParams())
const isFilterShown = ref(false);

function toggleFilterDrawer() {
  isFilterShown.value = !isFilterShown.value;
}

function setAgeFilters(idadeMin: number, idadeMax: number) {
  queryParams.value.idade_gte = idadeMin;
  queryParams.value.idade_lte = idadeMax;
}

function clearFilters() {
  queryParams.value = new QueryParams();

  getUsuarios()
}

function getUsuarios() {
  Service.getUsuarios(queryParams.value)
    .then((data) => {
      users.value = data;
      itemsTotal.value = data.length;
    })
}

onMounted(() => {
  getUsuarios();
})
</script>
