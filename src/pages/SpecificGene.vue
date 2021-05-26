<template>
  <div>
    <p class="py-5 px-3">
      Here you can search for sgRNA construct(s) in one or more bacterial
      genomes to use in CRISPRinterference. You must input a sequence, whose
      homologs will be found in selected bacteria, and common sgRNAs, if they
      exist, will be found. You can also choose bacteria in which you want to
      avoid sgRNA hybridisation.
    </p>

    <div v-if="!checked" class="grid grid-cols-2">
      <div class="px-7">
        <p class="py-2 text-2xl">Paste here your own sequence...</p>
        <textarea
          rows="10"
          cols="60"
          class="px-5 py-3 border border-gray-500 bg-gray-100"
          style="font-family: 'Courier New', Courier, monospace"
        ></textarea>
      </div>

      <div class="px-7">
        <p class="py-2 text-2xl">or upload a fasta file.</p>
        <div class="flex flex-col space-y-5">
          <input label="Choose file" type="file" />
        </div>
      </div>

      <div class="col-span-2 py-7 text-center">
        <button
          @click="next"
          class="py-3 px-7 text-white font-bold bg-green-500 border rounded border-gray-500"
        >
          Next >>
        </button>
      </div>
    </div>

    <div v-else class="grid grid-cols-2">
      <div class=""></div>
      <div class=""></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// import FileUpload from "primevue/fileupload";

export default defineComponent({
  components: { },
  setup() {
    const checked = ref(false);
    const loadFile = () => {
      console.log("load file to area");
    };
    const next = () => {
      console.log("next");
      checked.value = true;
    };
    return { loadFile, next, checked };
  },
});
</script>