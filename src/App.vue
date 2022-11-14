<template>
  <Header />
  <router-view />

  <Footter />
</template>

<script>
import Header from "./components/Header-comp.vue"
import Footter from "./components/Footter.vue"

export default {
  name: 'App',
  components: {
    Header,
    Footter
  },
  mounted() {
    this.$store.commit('updateCartFromLocalStorage');
  },
  created() {
    this.$store.dispatch("getAllProducts", 'checkLogged');
  },


}
</script>

<style>
body {
  background-color: #ffffff;
}

@font-face {
  font-family: "Noto";
  src: local("Merienda"),
    url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Mitr:wght@400;600&family=Noto+Sans+Mono:wght@400;600;800&display=swap" rel="stylesheet') format("truetype");
}

#app {
  font-family: 'Mitr', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
