<template>
  <v-container>
    <h2 class="mb-2">Criar Usuário</h2>
    <v-form ref="form" @submit.prevent="createUser">
      <v-text-field label="Nome" :rules="[regras.required, regras.isNameValid]" v-model="nome" required></v-text-field>
      <v-text-field label="Matricula" :rules="[regras.required, regras.isMatriculaValid]" v-model="matricula"
        required></v-text-field>
      <v-text-field label="Idade" :rules="[regras.isIdadeValid]" type="number" v-model="idade" required></v-text-field>
      <v-select label="Cargo" v-model="cargo" :items="cargos"></v-select>
      <v-select v-model="tipo" label="Tipo de Usuário" :items="listaTipos"></v-select>
      <div class="d-flex ga-2">
        <v-btn variant="outlined">Cancelar</v-btn>
        <v-btn color="blue" type="submit">Criar</v-btn>
      </div>
      <v-alert class="position-fixed top-0 right-0 mt-16" location="top end" v-model="isFailAlertShown" elevation="10"
        density="comfortable" color="error" title="Matrícula já existe" text="Matrícula já foi adicionada a o sistema"
        closable></v-alert>
      <v-alert class="position-fixed top-0 right-0 mt-16" location="top end" v-model="isSuccessAlertShown" elevation="10"
        density="comfortable" color="sucess" title="Usuário Criado!" text="Usuário adicionado com sucesso"
        closable></v-alert>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { isIdadeValid, isMatriculaValid, isNameValid } from '../../utils/validators.util';
import { VForm } from 'vuetify/components/VForm';
import Usuario from '../../models/user.model';
import { Service } from '../../api/Service';
import { UserStore } from '../../stores/user.store';
import { cargos, listaTipos } from '../../constants/selectOptions';
import router from '../../routes';

const userStore = UserStore();
const nome = ref<string>("");
const matricula = ref<string>("");
const idade = ref<number>(0);
const cargo = ref<string>("");
const tipo = ref<number>(0);
const form = ref<InstanceType<typeof VForm> | null>(null)
const isFailAlertShown = ref<boolean>(false);
const isSuccessAlertShown = ref<boolean>(false);

const regras = {
  required: (value: string) => !!value || "O campo é obrigatório",
  isNameValid: (value: string) => !!isNameValid(value) || "Insira um nome válido",
  isMatriculaValid: (value: string) => !!isMatriculaValid(value) || "Insira uma matrícula válida",
  isIdadeValid: (value: string) => !!isIdadeValid(value) || "Insira uma idade entre 18 e 60"
};

function createUser(): void {
  if (form.value?.isValid) {
    const novoUsuario = new Usuario(
      nome.value,
      matricula.value,
      idade.value,
      cargo.value,
      tipo.value
    )

    Service.createUsuario(novoUsuario)
      .then(() => {
        isSuccessAlertShown.value = true;
        router.push("/users");

        setTimeout(() => {
          isSuccessAlertShown.value = false;
        }, 2000);
      })
      .catch(() => {
        isFailAlertShown.value = true;

        setTimeout(() => {
          isFailAlertShown.value = false;
        }, 2000);
      })
  }
}


onMounted(() => {
  if (!userStore.user) {
    router.push("/login")
  }

  if(userStore.user && userStore.user.tipo !== 1) {
    router.push("/users")
  }
})

</script>
