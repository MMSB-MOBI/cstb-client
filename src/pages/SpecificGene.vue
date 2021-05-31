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
          id="sequence"
          rows="10"
          cols="60"
          class="px-5 py-3 border border-gray-500 bg-gray-100"
          style="font-family: 'Courier New', Courier, monospace"
          v-model="sequence"
        />
      </div>

      <div class="px-7">
        <p class="py-2 text-2xl">or upload a fasta file.</p>
        <div class="flex flex-col space-y-5">
          <input id="file" type="file" @change="loadFile" />
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

    <div v-else>
      <div class="col-span-2 px-4 py-2 mx-5 border border-gray-400 bg-gray-100">
        <p class="font-bold">Your query is :</p>
        <p class="overflow-auto h-10" style="word-wrap: break-word">
          {{ seq }}
        </p>
      </div>
      <TwoTrees category="specificGene" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import TwoTrees from "../components/TwoTrees.vue";

export default defineComponent({
  components: { TwoTrees },
  setup() {
    const checked = ref(false);
    const sequence = ref();

    const loadFile = () => {
      const _selectedFile = document.getElementById("file") as HTMLInputElement;
      if (_selectedFile.files) {
        sequence.value = (document.getElementById(
          "sequence"
        ) as HTMLInputElement).value;
        const file = _selectedFile.files[0];
        const reader: FileReader = new FileReader();
        reader.onload = function () {
          const text = reader.result;
          sequence.value = text;
        };
        reader.readAsText(file);
      } else {
        console.log("pas de fichier selectionné");
      }
    };

    const seq: Ref<string | undefined> = ref();

    const next = () => {
      seq.value = (document.getElementById(
        "sequence"
      ) as HTMLInputElement).value;

      console.log(seq.value, typeof seq.value);
      const fasta = /^[acgtACGT\s]+$/;

      if (seq.value !== "") {
        if (fasta.test(seq.value)) {
          checked.value = true;
        } else {
          alert("Sequence not in fasta format");
        }
      } else {
        alert("Empty sequence.");
      }
    };

    return {
      loadFile,
      next,
      checked,
      seq,
      sequence,
    };
  },
});
</script>