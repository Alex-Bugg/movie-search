<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Main from "@/components/Main";
import Footer from "@/components/Footer";
export default {
  components: {
    Header,
    Main,
    Footer,
  },
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
</style>
