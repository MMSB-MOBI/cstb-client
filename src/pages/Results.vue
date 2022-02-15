<template>
  <Message class="here-message" v-if="dataLoad && !data.sended_mail" severity="warn">Error with email : email to restore results has not been send</Message>
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
import { useRoute } from 'vue-router'
import Message from '@mmsb/primevue-forked/message'; 

interface BadRequestMinimal {
  statusCode: number;
  message: string[];
  error: string;
}

export default defineComponent({
  components: { SyncLoader, Message },
  setup() {
    const route = useRoute()
    const data = ref();
    const dataLoad = ref(false);
    const jobException = ref(false); 
    const emptySearch = ref(false); 
    const emptyMsg = ref(); 
    const jobExceptionMsg = ref()
    const socket: any = inject("socket");

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

      const externalScript3 = document.createElement("link")
      externalScript3.rel = 'stylesheet'
      externalScript3.href = 'https://fonts.googleapis.com/icon?family=Material+Icons'
      document.head.appendChild(externalScript3)

      const externalScript4 = document.createElement("link")
      externalScript4.rel = 'stylesheet'
      externalScript4.href = 'https://www.w3schools.com/w3css/4/w3.css'
      document.head.appendChild(externalScript4)

      if (route.path.startsWith('/results/') && route.params.id) restoreResults(route.params.id)
    });

    const restoreResults = (id: string|string[]) => {
      if(Array.isArray(id)){
        jobException.value = true
        jobExceptionMsg.value = "Can't provide results, unknown error in url structure"
      }

      socket.emit("restoreResults", {id})
    }

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

    socket.on("badRequestException", (error: BadRequestMinimal) => {
      console.log(error)
      jobException.value = true; 
      jobExceptionMsg.value = `Error with input data : ${error.message}`
    })

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

<style>
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
.here-message{
  margin: 0.5rem 2rem !important;
}
.here-message .p-message-wrapper {
  padding: 0.5rem 1rem !important
}
</style>