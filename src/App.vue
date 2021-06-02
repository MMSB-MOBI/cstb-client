<template>
  <div class="flex flex-col h-screen justify-between">
    <header><Header /></header>
    <body class="mb-auto">
      <router-view></router-view>
    </body>
    <footer class="bottom-0"><Footer /></footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default defineComponent({
  components: { Header, Footer },
});
</script>