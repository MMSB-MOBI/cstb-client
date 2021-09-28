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
  <div v-else-if="jobException" class="error-div">
    {{jobExceptionMsg}}
  </div>
  <div v-else-if="emptySearch" class="empty-div">
    This search returns no results : {{emptyMsg}}
  </div>
  <div v-else class="grid place-content-center">
    <SyncLoader class="m-20" />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, onMounted } from "vue";
import SyncLoader from "vue-spinner/src/SyncLoader.vue";

export default defineComponent({
  components: { SyncLoader },
  setup() {
    onMounted(() => {
      let externalScript1 = document.createElement("script");
      externalScript1.setAttribute("src", "https://d3js.org/d3.v4.js");
      document.head.appendChild(externalScript1);

      let externalScript2 = document.createElement("script");
      externalScript2.setAttribute(
        "src",
        "https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/LIB/d3-scale-radial.js"
      );
      document.head.appendChild(externalScript2);
    });

    const data = ref();
    const dataLoad = ref(false);
    const jobException = ref(false); 
    const emptySearch = ref(false); 
    const emptyMsg = ref(); 
    const jobExceptionMsg = ref()
    const socket: any = inject("socket");

    socket.on("allGenomesResults", (response: any) => {
      data.value = response;
      dataLoad.value = true;
    });

    socket.on("specificGeneResults", (response: any) => {
      data.value = response;
      dataLoad.value = true;
    });

    socket.on('emptySearch', (response: any) => {
      emptySearch.value = true
      emptyMsg.value = response
    })

    socket.on("exception", (response: any) => {
      jobException.value = true
      jobExceptionMsg.value = response.message
    });

    return {
      data,
      dataLoad,
      jobException,
      jobExceptionMsg,
      emptySearch, 
      emptyMsg
    };
  },
});
</script>

<style scoped>
.error-div{
  text-align:center;
  padding:1em;
  color:#e60000;
  background-color:#ffe6e6;
  margin-top:1em; 
}
.empty-div{
  text-align:center;
  padding:1em;
  color:#e67300;
  background-color:#fff2e6;
  margin-top:1em; 
}
</style>