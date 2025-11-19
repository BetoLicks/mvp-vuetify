<template>
  <v-layout>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        App
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item
          v-for="menu in items"
          :key="menu.name"
          :title="menu.title"
          :value="menu.name"
          :to="{ name: menu.name }"
        ></v-list-item>

      </v-list>

    </v-navigation-drawer>

    <v-main style="height: 120dvh;">
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup>

const drawer = ref(false);

const items = [
  {
    title: 'Dashboard',
    name: 'home'
  },  {
    title: 'Categorias',
    name: 'category'
  },  {
    title: 'Produtos',
    name: 'product'
  }

]

</script>

