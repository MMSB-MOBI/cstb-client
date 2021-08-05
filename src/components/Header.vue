<template>
  <router-link to="/">
    <div
      class="
        w-full
        bg-gradient-to-r
        from-blue-600
        to-blue-200
        text-white
        px-4
        py-2
      "
    >
      <p class="text-center font-bold text-2xl">
        Crispr Search Tool for Bacteria
      </p>
      <p class="text-center font-bold text-2xl">CSTB</p>
      <p class="mt-1 text-center font-light">
        A user-friendly intuitive CRISPR target predictor for bacteria
      </p>
    </div>
  </router-link>
  <div class="w-full bg-yellow-50">
    <p class="text-center">
      This is a beta version of CSTB service. If you have any suggestions or
      problems, please contact us : cstb-support@ibcp.fr
    </p>
  </div>
  <nav>
    <div class="grid grid-cols-2">
      <router-link v-for="item in list" :key="item.to" :to="item.to">
        <div
          class="
            text-center
            font-bold
            py-3
            bg-gradient-to-r
            from-yellow-400
            to-yellow-100
          "
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