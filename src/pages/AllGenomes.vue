<template>
  <div>
    <p class="py-5 px-3">
      Here you can find sgRNA sequence(s) to target a pool of bacteria by
      CRISPR. You have to choose the bacterial genomes which you want to target
      and the bacterial genomes in which you want to avoid sgRNA hybridisation.
    </p>
    <TwoTrees category="allGenomes"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TwoTrees from "../components/TwoTrees.vue"

export default defineComponent({
  components: { TwoTrees },
  setup() {
    return {
    };
  },
});
</script>