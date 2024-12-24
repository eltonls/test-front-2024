<template>
  <v-container>
    <div class="d-flex ga-5">
      <h2>Usuários</h2>
      <v-btn @click="toggleFilterDrawer" append-icon="mdi-filter">Filtrar</v-btn>
      <v-btn to="/users/addUser" v-if="isUserAdmin()">Criar Usuário</v-btn>
    </div>
    <FilterDrawer :query-params="queryParams" :is-filter-drawer-open="isFilterShown" @filterToggle="toggleFilterDrawer"
      @applyFilters="getUsuarios" @clearFilters="clearFilters" @setAgeFilters="setAgeFilters" />
    <v-row dense>
      <v-col>
        <v-data-table :items="users" v-model:items-per-page="itemsPerPage"
          :headers="isUserAdmin() ? adminHeaders : userHeaders" :items-length="itemsTotal" :page="actualPage" custom
          items-per-page-text="Usuários por Página">
          <template v-slot:[`item.tipo`]="{ item }">
            <p>{{ item.tipo == 1 ? "Admin" : "Comum" }}</p>
          </template>
          <template v-slot:item.actions="{ item }" v-if="isUserAdmin()">
            <v-icon class="me-2" size="small" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon size="small" @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-p">Tem certeza que deseja deletar o usuário?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="outlined" @click="closeDeleteDialog">Cancelar</v-btn>
          <v-btn color="blue-darken-1" variant="tonal" @click="deleteUserConfirm">Confirmar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar Usuário</span>
        </v-card-title>

        <v-card-text>
          <v-container v-if="editedUser">
            <v-chip class="mb-5">Matricula: {{ editedUser.matricula }}</v-chip>
            <v-text-field label="Nome" :rules="[regras.required, regras.isNameValid]" v-model="editedUser.nome"
              required></v-text-field>
            <v-text-field label="Idade" :rules="[regras.isIdadeValid]" type="number" v-model="editedUser.idade"
              required></v-text-field>
            <v-select label="Cargo" v-model="editedUser.cargo" :items="cargos"></v-select>
            <v-select v-model="editedUser.tipo" label="Tipo de Usuário" :items="listaTipos"></v-select>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="outlined" @click="closeEditDialog">
            Cancel
          </v-btn>
          <v-btn color="blue-darken-1" variant="elevated" @click="updateUserConfirm">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs, UnwrapNestedRefs } from 'vue';
import Usuario from '../../models/user.model';
import { Service } from '../../api/Service';
import QueryParams from '../../models/queryParams.model';
import FilterDrawer from './components/FilterDrawer.vue';
import { UserStore } from '../../stores/user.store';
import { cargos, listaTipos } from '../../constants/selectOptions';
import { isIdadeValid, isMatriculaValid, isNameValid } from '../../utils/validators.util';
import { adminHeaders, userHeaders } from './constants/headerFields';
import router from '../../routes';

const userStore = UserStore();

const itemsPerPage = ref(5);
const itemsTotal = ref(0);
const actualPage = ref(1);
const users = ref([] as Array<Usuario>);
const queryParams = ref(new QueryParams())
const isFilterShown = ref(false);
const editedIndex = ref<number>();
const editedUser = ref<Usuario | null>(null);
const dialog = ref(false);
const dialogDelete = ref(false);

const regras = {
  required: (value: string) => !!value || "O campo é obrigatório",
  isNameValid: (value: string) => !!isNameValid(value) || "Insira um nome válido",
  isMatriculaValid: (value: string) => !!isMatriculaValid(value) || "Insira uma matrícula válida",
  isIdadeValid: (value: string) => !!isIdadeValid(value) || "Insira uma idade entre 18 e 60"
};

function toggleFilterDrawer(): void {
  isFilterShown.value = !isFilterShown.value;
}

function isUserAdmin(): boolean {
  if (userStore.user) {
    return userStore.user.tipo === 1;
  }

  return false;
}

function setAgeFilters(idadeMin: number, idadeMax: number) {
  queryParams.value.idade_gte = idadeMin;
  queryParams.value.idade_lte = idadeMax;
}

function clearFilters() {
  queryParams.value = new QueryParams();

  getUsuarios()
}

function getUsuarios(): void {
  Service.getUsuarios({ ...queryParams.value })
    .then((data) => {
      users.value = data;
      itemsTotal.value = data.length;
    })
}

function editItem(usuario: Usuario): void {
  editedIndex.value = users.value.indexOf(usuario);
  editedUser.value = Object.assign({}, usuario)
  dialog.value = true;
}

function deleteItem(usuario: Usuario): void {
  editedIndex.value = users.value.indexOf(usuario);
  editedUser.value = Object.assign({}, usuario);
  dialogDelete.value = true;
}

function deleteUserConfirm() {
  if (editedUser.value) {
    Service.deleteUsuario(editedUser.value.matricula)
      .then((res) => {
        if (res.status === 200) {
          closeDeleteDialog();
          getUsuarios();
        }
      })
  }
}

function updateUserConfirm() {
  if (editedUser.value) {
    Service.updateUsuario(editedUser.value.matricula, editedUser.value)
      .then((res) => {
        if (res.status === 200) {
          closeEditDialog();
          getUsuarios();
        }
      })
  }
}

function closeDeleteDialog(): void {
  dialogDelete.value = false;
}

function closeEditDialog(): void {
  dialog.value = false;
}

onMounted(() => {
  // Redirect if can't find a user
  if(!userStore.user) {
    router.push("/login");
  } 

  getUsuarios();
})
</script>
