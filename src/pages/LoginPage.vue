<template>
  <v-container class="pa-sm-6 pa-md-0 h-100" fluid>
    <v-row no-gutters class="h-100">
      <v-col class="d-flex align-center justify-center blue-grey-lighten-2" cols="12" md="6">
        <div class="text-center">
          <v-img class="mx-auto mb-4" src="/login.svg" max-width="300"></v-img>
          <h1 class="text-center text-primaty">Bem-vindo a plataforma ProtheusCRM!</h1>
          <p class="text-center text-grey-darken-1">Gerencie seus clientes de forma fácil e eficiente.</p>
        </div>
      </v-col>

      <v-col class="d-flex align-center justify-center" cols="12" md="6">
        <div class="w-100" style="max-width: 400px;">
          <v-form @submit.prevent="sumbeterFormulario">
            <div class="text-center mb-6">
              <h2 class="text-primary">Login</h2>
            </div>

            <v-text-field
               label="Email"
               v-model="formData.email"
               type="email"
               :rules="[rules.required, rules.email]"
               variant="outlined"
               class="mb-4">
            </v-text-field>

            <v-text-field
              v-model="formData.senha"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              label="Senha"
              :rules="[rules.required, rules.maxLength, rules.minLength]"
              @click:append-inner="visible = !visible"
              variant="outlined"
              maxlength="12"
              class="mb-4">
            </v-text-field>

            <v-btn color="primary" class="w-100 mb-3" type="submit" size="large">Entrar</v-btn>

            <div class="text-center mb-3">
              ou
            </div>

            <v-btn :to="{ name: 'register' }" color="primary" variant="outlined" class="w-100" type="submit" size="large">Cadastre-se</v-btn>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>

import { useNotification } from '@/composables/useNotification'

import { useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi'

const valid = ref(false)
const api = useApi();
const router = useRouter()
const visible = ref(false)

const notification = useNotification()

const formData = ref({
  email: '',
  senha: '',
})


const rules = {
  required: (value) => !!value || 'É necessário informar este campo.',
  email: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'E-mail inválido.'
  },

  maxLength: (value) => !value || value.length <= 12 || 'Máximo de 12 caracteres.',
  minLength: (value) => !value || value.length >= 6 || 'Mínimo de 6 caracteres.',
}



function sumbeterFormulario() {
  if (!valid.value) {
    notification.error('Erro ao enviar o formulário. Verifique os campos preenchidos.')
    return
  }

  LoginUser()
}

async function LoginUser() {
  try {
    await api.post('/user/login', formData.value)
    notification.success('Login realizado com sucesso!')
    router.push({ name: 'home' })
  } catch (error) {
    sessionStorage.setItem('erro', error.message)
    notification.error('Erro ao logar: ' + error.message)
  }
}
</script>
