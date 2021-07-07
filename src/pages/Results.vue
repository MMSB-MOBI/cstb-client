<template>
  <result-page
    v-if="dataLoad"
    :all_data="data.data_card"
    :org_names="data.gi"
    :complete_data="JSON.stringify(data.data)"
    :fasta_metadata="JSON.stringify(data.fasta_metadata)"
    :job_tag="data.tag"
    :total_hits="data.number_hits"
    :excluded_names="data.not_in"
    :gene="JSON.stringify(data.gene)"
  />
  <!-- :gene="data.gene" -->
  <div v-else class="grid place-content-center">
    <SyncLoader class="m-20"/>
    <!-- <p>Processing your request</p> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import SyncLoader from "vue-spinner/src/SyncLoader.vue";

export default defineComponent({
  components: { SyncLoader },
  setup() {
    const data = ref();
    const dataLoad = ref(false);
    const socket: any = inject("socket");

    socket.on("allGenomesResults", (response: any) => {
      console.log(response.data_card)
      console.log(typeof(response.data_card));
      
      data.value = response;
      dataLoad.value = true;
    });

    socket.on("specificGeneResults", (response: any) => {
      data.value = response;
      dataLoad.value = true;
    });

    return {
      data,
      dataLoad,
    };
  },
});
</script>