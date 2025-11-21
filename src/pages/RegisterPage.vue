<template>
  <v-container class="pa-sm-6 pa-md-0 h-100" fluid>
    <v-row no-gutters class="h-100">
      <v-col class="d-flex align-center justify-center bg-grey-lighten-4" cols="12" md="6">
        <div class="text-center">
          <v-img class="mx-auto mb-4" src="/register.svg" max-width="300"></v-img>
          <h1 class="text-center text-primaty">Bem-vindo a plataforma App!</h1>
          <p class="text-center text-grey-darken-1">Gerencie seus clientes de forma fácil e eficiente.</p>
        </div>
      </v-col>

      <v-col class="d-flex align-center justify-center" cols="12" md="6">
        <div class="w-100" style="max-width: 400px;">
          <v-form v-model="valid" @submit.prevent="sumbeterFormulario">
            <div class="text-center mb-6">
              <h2 class="text-primary">Faça seu cadastro</h2>
            </div>

            <v-text-field
              v-model="formData.nome"
              label="Nome"
              :rules="[rules.required, rules.fullName]"
              type="text"
              variant="outlined"
              class="mb-4">
            </v-text-field>

            <v-text-field
               v-model="formData.email"
               label="Email"
               :rules="[rules.required, rules.email]"
               type="email"
               variant="outlined"
               class="mb-4">
            </v-text-field>

            <v-text-field
               v-model="formData.senha"
               :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                label="Senha"
               :rules="[rules.required, rules.maxLength, rules.minLength, rules.passwordStrength]"
               @click:append-inner="visible = !visible"
               variant="outlined"
               maxlength="12"
               class="mb-4">
              </v-text-field>

            <v-btn :disabled="!valid" color="primary" class="w-100 mb-3" type="submit" size="large">Cadastrar</v-btn>

            <div class="text-center mb-3">
              ou
            </div>

            <v-btn :to="{ name: 'login' }" color="primary" variant="outlined" class="w-100" size="large">Voltar</v-btn>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup>

import axios from 'axios';

import {useNotification} from '@/composables/useNotification';

import { useRouter } from 'vue-router';

const notification = useNotification();

const router = useRouter();

const formData = ref({
  name: '',
  email: '',
  password: ''
});

async function createUser(){
  try {
    await axios.get('http://127.0.0.1/ProteusCRM/api/usuarios/create',...formData.value);
    notification.success('Usuário cadastrado com sucesso!');
    router.push({ name: 'login' });
  } catch (error) {
    notification.error('Erro ao cadastrar usuário: ' + error.message);
  }
}

const rules = {
  required: value => !!value || 'É necessário informar este campo.',
  email: value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'E-mail inválido.'
    },

  maxLength: value => !value || value.length <= 12 || 'Máximo de 12 caracteres.',
  minLength: value => !value || value.length >= 6 || 'Mínimo de 6 caracteres.',

  fullName: value => {
      if (!value) return 'É necessário informar o nome completo.';
      const words = value.trim().split(/\s+/).filter(word => word.length > 0);
      return words.length >= 2 || 'Informe nome e sobrenome.';
    },

  passwordStrength: value => {
      if (!value) return 'É necessário informar a senha.';

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

      if (!hasUpperCase) return 'A senha deve conter pelo menos uma letra maiúscula.';
      if (!hasLowerCase) return 'A senha deve conter pelo menos uma letra minúscula.';
      if (!hasSpecialChar) return 'A senha deve conter pelo menos um caractere especial.';

      return true;
    }
}

const valid = ref(false);

function sumbeterFormulario(){
  if (!valid.value){
    alert('Formulário inválido');
  }

  createUser();
}

const visible = ref(false);

</script>

