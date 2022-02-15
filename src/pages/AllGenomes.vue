<template>
  <div>
    <p class="py-5 px-3" style="text-align:center">
      Here you can find sgRNA sequence(s) to target a pool of bacteria by
      CRISPR. You have to choose the bacterial genomes which you want to target
      and the bacterial genomes in which you want to avoid sgRNA hybridisation.
    </p>
    <TwoTrees category="allGenomes" @display-results="resultsPage" class="ml-2 mr-2"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import TwoTrees from "../components/TwoTrees.vue";

export default defineComponent({
  components: { TwoTrees },
  setup() {
    const router = useRouter();
    const resultsPage = () => {
      router.replace("/results");
    };

    return { resultsPage };
  },
});
</script>