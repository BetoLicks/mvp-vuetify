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
          <v-form @click.prevent="">
            <div class="text-center mb-6">
              <h2 class="text-primary">Faça seu cadastro</h2>
            </div>

            <v-text-field label="Nome" :rules="[rules.required]" type="text" variant="outlined" class="mb-4"></v-text-field>
            <v-text-field label="Email" :rules="[rules.required, rules.email]" type="email" variant="outlined" class="mb-4"></v-text-field>
            <v-text-field label="Senha" :rules="[rules.required, rules.counter]" type="password" variant="outlined" class="mb-4"></v-text-field>

            <v-btn color="primary" class="w-100 mb-3" type="submit" size="large">Cadastrar</v-btn>

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


const rules = {
  required: value => !!value || 'É necessário informar este campo.',
  email: value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail.'
    },
  counter: value => value.length <= 20 || 'Max 20 characters',

}


</script>

