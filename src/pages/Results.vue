<template>
  <div>
    <result-page
      v-if="dataLoad"
      :all_data="data.data_card"
      :org_names="data.gi"
      :complete_data="JSON.stringify(data.data)"
      :fasta_metadata="JSON.stringify(data.fasta_metadata)"
      :job_tag="data.tag"
      :total_hits="data.number_hits"
      :excluded_names="data.not_in"
    ></result-page>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";

export default defineComponent({
  setup() {
    const data = ref();
    const dataLoad = ref(false);
    const socket: any = inject("socket");

    socket.on("allGenomesResults", (response: any) => {
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