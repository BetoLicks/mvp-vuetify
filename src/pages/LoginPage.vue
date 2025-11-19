<template>
  <v-container class="pa-sm-6 pa-md-0 h-100" fluid>
    <v-row no-gutters class="h-100">
      <v-col class="d-flex align-center justify-center bg-grey-lighten-4" cols="12" md="6">
        <div class="text-center">
          <v-img class="mx-auto mb-4" src="/login.svg" max-width="300"></v-img>
          <h1 class="text-center text-primaty">Bem-vindo a plataforma ProtheusCRM!</h1>
          <p class="text-center text-grey-darken-1">Gerencie seus clientes de forma fácil e eficiente.</p>
        </div>
      </v-col>

      <v-col class="d-flex align-center justify-center" cols="12" md="6">
        <div class="w-100" style="max-width: 400px;">
          <v-form @click.prevent="">
            <div class="text-center mb-6">
              <h2 class="text-primary">Login</h2>
            </div>

            <v-text-field label="Email" type="email" required variant="outlined" class="mb-4"></v-text-field>

            <v-text-field label="Senha" type="password" required variant="outlined" class="mb-4"></v-text-field>

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
