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
          v-model="seqFromFile"
        />
      </div>

      <div class="px-7">
        <p class="py-2 text-2xl">or upload a fasta file.</p>
        <div class="flex flex-col space-y-5">
          <FileUpload
            accept=".fna"
            :maxFileSize="1000000"
            :fileLimit="1"
            :customUpload="true"
            @uploader="onUpload"
            @select="onSelect"
            @remove="onRemove"
            @clear="onRemove"
          />
        </div>
      </div>

      <div class="col-span-2 py-7 text-center">
        <button
          @click="next"
          class="
            py-3
            px-7
            text-white
            font-bold
            bg-green-500
            border
            rounded
            border-gray-500
          "
        >
          Next >>
        </button>
      </div>
    </div>

    <div v-else>
      <div class="col-span-2 px-4 py-2 mx-5 border border-gray-400 bg-gray-100">
        <p class="font-bold">Your query is :</p>
        <p class="overflow-auto h-30 text-s" style="word-wrap: break-word">
          {{ seq }}
        </p>
      </div>
      <TwoTrees
        category="specificGene"
        :sequence="seq"
        @display-results="resultsPage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import TwoTrees from "../components/TwoTrees.vue";
import FileUpload from "primevue/fileupload";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { TwoTrees, FileUpload },
  setup() {
    const checked = ref(false);
    const seqFromFile = ref();

    const onUpload = (event: any) => {
      if (event.files) {
        const file = event.files[0];
        const reader: FileReader = new FileReader();
        reader.onload = function () {
          const text = reader.result;
          seqFromFile.value = text;
        };
        reader.readAsText(file);
      } else {
        alert("Pas de fichier selectionné");
      }
    };

    const onSelect = () => {
      var chooseButton: HTMLElement | null = document.querySelector(
        "span.p-fileupload-choose"
      );
      if (chooseButton) {
        chooseButton.setAttribute("style", "fill-opacity: .25;");
      }
    };

    const onRemove = (event: any) => {
      seqFromFile.value = "";
      var button = document.querySelector("span.p-fileupload-choose input");
      if (button) {
        button.removeAttribute("disabled");
        // event.files[0]
      }
    };

    const seq: Ref<string | undefined> = ref();
    // const format = (fasta: string) => {
    //   // display of fasta query in blocks header + 70nt
    //   var newFasta = "";
    //   if (fasta[0] === ">") {
    //     var header = "";
    //     var seq = "";
    //     var head = true;
    //     for (let i = 0; i < fasta.length; i++) {
    //       if (head) {
    //         header += fasta[i];
    //       } else {
    //         if (i > 0 && i % 70 === 0) {
    //           seq += " " + fasta[i];
    //         } else {
    //           seq += fasta[i];
    //         }
    //       }
    //       if (fasta[i] === "\n") {
    //         head = false;
    //       }
    //     }
    //     newFasta = header + "\n" + seq;
    //   }
    //   return newFasta;
    // };

    const next = () => {
      seq.value = (
        document.getElementById("sequence") as HTMLInputElement
      ).value;

      const fasta = /(^>[^]+\n[acgtACGT\s]+$)|(^[acgtACGT\s]+$)/;

      if (seq.value !== "") {
        if (fasta.test(seq.value)) {
          // seq.value = format(seq.value);
          checked.value = true;
        } else {
          alert("Sequence not in fasta format");
        }
      } else {
        alert("Empty sequence.");
      }
    };

    const router = useRouter();

    const resultsPage = () => {
      router.replace("/results");
    };

    return {
      onUpload,
      next,
      checked,
      seq,
      seqFromFile,
      onRemove,
      onSelect,
      resultsPage,
    };
  },
});
</script>

<style>
.choose {
  fill-opacity: 0.25;
}
</style>