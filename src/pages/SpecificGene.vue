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
      <div class="col-span-2">
        <p>Your query:</p>
        <div>{{ seq }}</div>
      </div>

      <div class="px-5 py-3">
        <p class="text-center font-bold text-3xl py-3">Organisms to target</p>
        <TaxonomicTree
          :tree="treeWrapper1.newTree"
          :updatedSelectedKeys="treeWrapper1.selectedKeys"
          :updatedExpandedKeys="treeWrapper1.expandedKeys"
          @on-node-select="onNodeSelectTree1"
          @on-node-unselect="onNodeUnselectTree1"
          @on-node-expand="onNodeExpandTree1"
          @reset-tree="resetTree1"
        />
      </div>

      <div class="px-5 py-3">
        <p class="text-center font-bold text-3xl py-3">Organisms to exclude</p>
        <TaxonomicTree
          :tree="treeWrapper2.newTree"
          :updatedSelectedKeys="treeWrapper2.selectedKeys"
          :updatedExpandedKeys="treeWrapper2.expandedKeys"
          @on-node-select="onNodeSelectTree2"
          @on-node-unselect="onNodeUnselectTree2"
          @on-node-expand="onNodeExpandTree2"
          @reset-tree="resetTree2"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import TaxonomicTree from "../components/TaxonomicTree.vue";
import TreeWrapper from "./treeWrapper";
import { SelectedKeys, ExpandedKeys, Node, NewTree } from "../types/TreeTypes";
import TaxonomyService from "../service/taxonomy";
// import FileUpload from "primevue/fileupload";
// import { io } from "socket.io-client";

export default defineComponent({
  components: { TaxonomicTree },
  setup(_, { emit }) {
    const checked = ref(false);
    const treeWrapper1 = new TreeWrapper();
    const treeWrapper2 = new TreeWrapper();
    const treeService = new TaxonomyService();

    onMounted(() => {
      // socket.on("connect", function () {
      //   console.log("Connected");
      // });

      treeService.getTree().then((coll) => {
        treeWrapper1.newTree = coll.newTree.root;
        treeWrapper1.newTreeIndex = coll.treeIndex;
      });

      treeService.getTree().then((coll) => {
        treeWrapper2.newTree = coll.newTree.root;
        treeWrapper2.newTreeIndex = coll.treeIndex;
      });
    });

    const loadFile = () => {
      console.log("load file to area");
    };

    type fasta = string;

    const next = () => {
      let seq: fasta = (document.getElementById("sequence") as HTMLInputElement)
        .value;

      if (seq as string) {
        if (seq !== "") {
          checked.value = true;
          return seq;
        } else {
          alert("Empty sequence.");
        }
      } else {
        alert("Sequence not in fasta format");
      }
    };

    const resetBrowse = (treeNb: number) => {
      if (
        treeWrapper1.newTree != undefined &&
        treeWrapper2.newTree != undefined
      ) {
        const tree1: any = treeWrapper1.newTree; // NewTree
        const tree2: any = treeWrapper2.newTree; // NewTree

        if (treeNb === 1 && tree1) {
          for (const node in Object.entries(tree1)) {
            browse(tree2[node], true);
          }
        } else if (treeNb === 2 && tree2) {
          for (const node in Object.entries(tree2)) {
            browse(tree1[node], true);
          }
        }
      }
    };

    const resetTree = (
      currentWrapper: TreeWrapper,
      otherWrapper: TreeWrapper,
      treeNb: number
    ) => {
      currentWrapper.selectedKeys = {};
      currentWrapper.expandedKeys = {};
      currentWrapper.finalSelection = [];
      otherWrapper.finalSelection = [];
      resetBrowse(treeNb);
    };

    const selectLeaf = (node: Node, leaf: Node[]) => {
      if (node.children) {
        node.children.forEach((child: Node) => {
          selectLeaf(child, leaf);
        });
      } else {
        leaf.push(node);
      }
    };

    const selectUnselectNode = (
      currentWrapper: any, // TreeWrapper
      otherWrapper: any, // TreeWrapper
      node: Node,
      selectedKeys: SelectedKeys,
      nodeSelected: boolean
    ) => {
      currentWrapper.selectedKeys = selectedKeys.value;
      node.checked = nodeSelected ? true : false;
      const node2 = currentWrapper.getBrowsableNode(
        node,
        otherWrapper.newTreeIndex
      );
      if (node2 && nodeSelected) {
        selectLeaf(node, currentWrapper.finalSelection);
        browse(node2, false);
      } else if (node2 && !nodeSelected) {
        const _leaf: Node[] = [];
        selectLeaf(node, _leaf);
        currentWrapper.finalSelection = currentWrapper.finalSelection.filter(
          (node: Node) => !_leaf.includes(node)
        );
        browse(node2, true);
      }
    };

    // about tree 1
    const onNodeSelectTree1 = (node: Node, selectedKeys: SelectedKeys) => {
      selectUnselectNode(treeWrapper1, treeWrapper2, node, selectedKeys, true);
    };
    const onNodeUnselectTree1 = (node: Node, selectedKeys: SelectedKeys) => {
      selectUnselectNode(treeWrapper1, treeWrapper2, node, selectedKeys, false);
    };
    const onNodeExpandTree1 = (expandedKeys: ExpandedKeys) => {
      treeWrapper1.expandedKeys = expandedKeys;
    };
    const resetTree1 = () => {
      resetTree(treeWrapper1, treeWrapper2, 1);
    };

    // about tree 2
    const onNodeSelectTree2 = (node: Node, selectedKeys: SelectedKeys) => {
      selectUnselectNode(treeWrapper2, treeWrapper1, node, selectedKeys, true);
    };
    const onNodeUnselectTree2 = (node: Node, selectedKeys: SelectedKeys) => {
      selectUnselectNode(treeWrapper2, treeWrapper1, node, selectedKeys, false);
    };
    const onNodeExpandTree2 = (expandedKeys: ExpandedKeys) => {
      treeWrapper2.expandedKeys = expandedKeys;
    };
    const resetTree2 = () => {
      resetTree(treeWrapper2, treeWrapper1, 2);
    };

    // enable or disable the selection of leaves in a tree
    const browse = (node: Node, activate: boolean) => {
      if (!node.checked) {
        node.selectable = activate ? true : false;
        node.style = activate ? "color:#495057" : "color:#cccccc";
      }
      if (node.children) {
        node.children.forEach((child: Node) => browse(child, activate));
      }
    };

    // returns the final selection
    const filterCheckedLeaf = (finalSelection: any) => {
      // FinalSelection
      let filterObj: Node[] = [];
      let labels: string[] = [];
      Object.keys(finalSelection).forEach((key) => {
        if (finalSelection[key].genome_uuid) {
          filterObj.push(finalSelection[key]);
        }
      });
      Object.keys(filterObj).forEach((key: any) => {
        labels.push(filterObj[key].label);
      });
      return { filterObj, labels };
    };

    // submit selection
    const submitted = ref<boolean>(false);
    const labels1 = ref();
    const labels2 = ref();

    const submitSelection = () => {
      const _length1 = Object.keys(treeWrapper1.finalSelection).length;

      if (_length1 !== 0) {
        submitted.value = true;

        const obj1 = filterCheckedLeaf(treeWrapper1.finalSelection);
        treeWrapper1.listTree = obj1.filterObj;
        labels1.value = obj1.labels;

        const obj2 = filterCheckedLeaf(treeWrapper2.finalSelection);
        treeWrapper2.listTree = obj2.filterObj;
        labels2.value = obj2.labels;
      } else {
        alert("You have to choose at least one included genome.");
      }
    };

    // confirmation of selection
    const displayParameters = ref<boolean>(false);
    const confirmedSelect = () => {
      displayParameters.value = true;
    };

    const notConfirmedSelect = () => {
      submitted.value = false;
    };

    // submit request
    // const socket:any = inject("socket");
    const submitRequest = () => {
      const email = document.querySelector("#email") as HTMLInputElement;

      if (email.value !== "") {
        const gi: string[] = [];
        const gni: string[] = [];

        treeWrapper1.listTree.forEach((leave: Node) => {
          const genome_uuid: any = leave.genome_uuid; // string
          gi.push(genome_uuid);
        });

        treeWrapper2.listTree.forEach((leave: Node) => {
          const genome_uuid: any = leave.genome_uuid; // string
          gni.push(genome_uuid);
        });

        var _pam, pam;
        _pam = document.getElementById("pam_AllG") as HTMLSelectElement;
        pam = _pam.options[_pam.selectedIndex].text;

        var _sgrna_length, sgrna_length;
        _sgrna_length = document.getElementById(
          "sgrna-length_AllG"
        ) as HTMLSelectElement;
        sgrna_length = _sgrna_length.options[_sgrna_length.selectedIndex].text;

        const inputData = {
          gi,
          gni,
          pam,
          sgrna_length,
          email: email.value,
        };
      } else {
        alert("You have to provide email adress.");
      }
    };

    return {
      loadFile,
      next,
      checked,
      treeWrapper1,
      treeWrapper2,
      labels1,
      labels2,
      submitSelection,
      onNodeSelectTree1,
      onNodeUnselectTree1,
      onNodeExpandTree1,
      onNodeSelectTree2,
      onNodeUnselectTree2,
      onNodeExpandTree2,
      submitted,
      confirmedSelect,
      notConfirmedSelect,
      resetTree1,
      resetTree2,
      displayParameters,
      submitRequest,
    };
  },
});
</script>