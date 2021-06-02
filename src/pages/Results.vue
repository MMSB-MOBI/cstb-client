<template>
  <div>
    Results
    <result-page
      v-if="dataLoad"
      :all-data="data.data_card"
      :org_names="data.gi"
      :complete_data="JSON.striginfy(data.data)"
      :fasta_metadata="data.fasta_metadata"
      :job_tag="data.tag"
      :total_hits="data.number_hits"
      :excluded_names="data.not_in"
    ></result-page>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
// import ResultPage from '@mmsb/result_page'

export default defineComponent({
  // components: { ResultPage },
  setup() {
    const data = ref();
    const dataLoad = ref(false);
    const socket: any = inject("socket");
    socket.on("allGenomesResults", (response: any) => {
      data.value = response;
      dataLoad.value = true;
      console.log(response);
    });

    socket.on("specificGeneResults", (response: any) => {
      data.value = response;
      dataLoad.value = true;
      console.log(response);
    });

    return {
      data,
      dataLoad,
    };
  },
});
</script>