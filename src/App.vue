<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <SearchForm />
</template>

<script>
import { computed } from 'vue';
import { AppState } from './AppState';
import SearchForm from "./components/SearchForm.vue";

export default {
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState)
    };
  },

}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
