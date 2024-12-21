<template>
  <main class="login">
    <v-container fluid class="container">
      <v-row align="center" justify="end" class="h-100">
        <v-col class="col">
          <div class="heading">
            <h2 class="title">Bem-vindo</h2>
            <p>Faça login abaixo para ver seus usuários de forma simples e fácil</p>
          </div>
          <v-form class="form" @submit.prevent="submitLogin">
            <v-text-field label="Usuário" v-model="user"></v-text-field>
            <v-text-field label="Senha" type="password" v-model="password"></v-text-field>
            <v-btn width="100%" class="btn" size="large" type="submit">
              Fazer Login
            </v-btn>
          </v-form>
          <v-alert class="position-fixed top-0 right-0" location="top end" v-model="isAlertShown" elevation="10"
            density="comfortable" color="error" title="Usuário não encontrado"
            text="Usuário não encontrado ou servidor fora do ar, fale com seu administrador" closable></v-alert>
        </v-col>
        <v-col class="col">
          <img src="/src/assets/login_img.jpg" class="img" alt="teste de reference">
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { LoginService } from '../../api/login.service';
import { UserStore } from '../../stores/user.store';
import useAlert from '../../composables/alert.composable';

const { isAlertShown, showAlert, closeAlert } = useAlert();

const userStore = UserStore();
const user = ref("");
const password = ref("");

function submitLogin() {
  LoginService.login(user.value, password.value)
    .then((data) => {
      userStore.saveUser(data);
    })
    .catch(() => {
      showAlert();

      setTimeout(() => {
        closeAlert();
      }, 2000)
    })
}
</script>

<style lang="css" scoped>
.container {
  padding: 0;
}

.heading {
  width: 100%;
  margin-bottom: 8px;
  font-family: "roboto", sans-serif;

  @media (min-width: 900px) {
    width: 50%;
  }
}

.title {
  font-weight: 700;
  font-size: 32px;
}

.row {
  height: 100vh;
}

.col {
  max-height: 100vh;
  flex-basis: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media(min-width: 900px) {
    padding: 0;
    flex-basis: 0;
    width: 50%;
  }
}

.img {
  display: none;

  @media (min-width: 900px) {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.form {
  width: 100%;

  @media(min-width: 900px) {
    width: 50%;
    border-radius: 8px;
  }
}

.btn {
  background: #3454D1;
  color: #fff;
}

.alert {
  margin: 20px;
  transition: all .5s;
}
</style>
