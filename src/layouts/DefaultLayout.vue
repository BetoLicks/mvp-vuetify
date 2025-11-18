<template>
  <v-layout>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        My Vuetify App
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list :items="items"></v-list>

    </v-navigation-drawer>

  <v-main style="height: 100dvh;">
    <router-view />
  </v-main>
  </v-layout>
</template>

<script setup>

const drawer = ref(false);

const items = [
  {
    title: 'Dashboard',
    value: 'dashboard'
  },  {
    title: 'Categorias',
    value: 'categorias'
  }, {
    title: 'Produtos',
    value: 'produtos'
  }

]

</script>

