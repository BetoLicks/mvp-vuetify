<template>
  <v-container class="pa-sm-6 pa-md-0 h-100" fluid>
    <v-row no-gutters class="h-100">
      <v-col class="d-flex align-center justify-center bg-grey-lighten-4" cols="12" md="6">
        <div class="text-center">
          <v-img class="mx-auto mb-4" src="/register.svg" max-width="300"></v-img>
          <h1 class="text-center text-primaty">Bem-vindo a plataforma App!</h1>
          <p class="text-center text-grey-darken-1">
            Gerencie seus clientes de forma fácil e eficiente.
          </p>
        </div>
      </v-col>

      <v-col class="d-flex align-center justify-center" cols="12" md="6">
        <div class="w-100" style="max-width: 400px">
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
              @input="(e) => (formData.nome = e.target.value.toUpperCase())"
              class="mb-4"
            >
            </v-text-field>

            <v-text-field
              v-model="formData.email"
              label="Email"
              :rules="[rules.required, rules.email]"
              type="email"
              variant="outlined"
              @input="(e) => (formData.email = e.target.value.toLowerCase())"
              class="mb-4"
            >
            </v-text-field>

            <v-row class="mb-4">
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="formData.cpf"
                  label="CPF"
                  :rules="[rules.required, rules.cpf]"
                  type="text"
                  variant="outlined"
                  @input="formatCPF"
                  placeholder="000.000.000-00"
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="formData.telefone"
                  label="Telefone"
                  :rules="[rules.required, rules.phone]"
                  type="text"
                  variant="outlined"
                  placeholder="(00) 00000-0000"
                  @input="formatTelefone"
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-text-field
              v-model="formData.senha"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              label="Senha"
              :rules="[rules.required, rules.maxLength, rules.minLength]"
              @click:append-inner="visible = !visible"
              variant="outlined"
              maxlength="12"
              class="mb-4"
            >
            </v-text-field>

            <v-btn :disabled="!valid" color="primary" class="w-100 mb-3" type="submit" size="large"
              >Cadastrar</v-btn
            >

            <div class="text-center mb-3">ou</div>

            <v-btn
              :to="{ name: 'login' }"
              color="primary"
              variant="outlined"
              class="w-100"
              size="large"
              >Voltar</v-btn
            >
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>

import { useNotification } from '@/composables/useNotification'
import { useApi } from '@/composables/useApi'
import { useRouter } from 'vue-router'

const valid = ref(false)
const api = useApi()
const router = useRouter()
const visible = ref(false)
const notification = useNotification()

const formData = ref({
  nome: '',
  cpf: '',
  email: '',
  telefone: '',
  senha: '',
})

async function createUser() {
  try {
    await api.post('/usuarios/create', formData.value)
    notification.success('Usuário cadastrado com sucesso!')
    router.push({ name: 'login' })
  } catch (error) {
    sessionStorage.setItem('erro', error.message)
    notification.error('Erro ao cadastrar usuário: ' + error.message)
  }
}

// Função para formatar CPF
function formatCPF(event) {
  let value = event.target.value.replace(/\D/g, '')

  if (value.length <= 11) {
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }

  formData.value.cpf = value
}

// Função para formatar Telefone
function formatTelefone(event) {
  let value = event.target.value.replace(/\D/g, '')

  if (value.length <= 11) {
    if (value.length <= 10) {
      // Formato: (00) 0000-0000
      value = value.replace(/(\d{2})(\d)/, '($1) $2')
      value = value.replace(/(\d{4})(\d)/, '$1-$2')
    } else {
      // Formato: (00) 00000-0000
      value = value.replace(/(\d{2})(\d)/, '($1) $2')
      value = value.replace(/(\d{5})(\d)/, '$1-$2')
    }
  }

  formData.value.telefone = value
}

const rules = {
  required: (value) => !!value || 'É necessário informar este campo.',
  email: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'E-mail inválido.'
  },

  maxLength: (value) => !value || value.length <= 12 || 'Máximo de 12 caracteres.',
  minLength: (value) => !value || value.length >= 6 || 'Mínimo de 6 caracteres.',

  fullName: (value) => {
    if (!value) return 'É necessário informar o nome completo.'
    const words = value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0)
    return words.length >= 2 || 'Informe nome e sobrenome.'
  },

  cpf: (value) => {
    if (!value) return 'CPF é obrigatório.'
    const cpfLimpo = value.replace(/\D/g, '')
    return cpfLimpo.length === 11 || 'CPF deve ter 11 dígitos.'
  },

  phone: (value) => {
    if (!value) return 'Telefone é obrigatório.'
    const telefoneLimpo = value.replace(/\D/g, '')
    return telefoneLimpo.length === 10 || telefoneLimpo.length === 11 || 'Telefone inválido.'
  },
}

function sumbeterFormulario() {
  if (!valid.value) {
    alert('Formulário inválido')
    return
  }

  createUser()
}


</script>
