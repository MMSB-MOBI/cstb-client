<template>
  <div
    class="w-full bg-gradient-to-r from-blue-600 to-blue-200 text-white px-4 py-2"
  >
    <p class="text-center text-2xl">Crispr Search Tool for Bacteria</p>
    <p class="text-center text-2xl">CSTB</p>
  </div>
  <nav>
    <div class="grid grid-cols-2">
      <router-link v-for="item in list" :key="item.to" :to="item.to">
        <div
          class="text-center py-2 bg-gradient-to-r from-yellow-200 to-yellow-50"
        >
          {{ item.title }}
        </div>
      </router-link>
    </div>
  </nav>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      list: [
        { title: "ALL GENOMES", to: "/all-genomes" },
        { title: "SPECIFIC GENE", to: "/specific-gene" },
      ],
    };
  },
});
</script>

<style>
</style>