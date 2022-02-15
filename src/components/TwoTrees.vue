<template>
  <div v-if="!submitted" class="twotrees-wrapper">
    <div style="margin:2px">
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

    <div>
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

    <div style="grid-column:2">
      <Button
        @click="submitSelection"
        class="p-button-lg"
      >
        Submit selections
      </Button>
    </div>
  </div>

  <div v-else class="grid grid-cols-2 mr-5 ml-5" style="column-gap:2em">
    <div class="py-3">
      <p class="text-center py-1 text-red-500 font-bold">
        List of bacteria will be targeted:
      </p>
      <div
        class="border px-5 py-3 overflow-auto h-80 bg-gray-100 border-gray-300"
      >
        <div v-for="label in labels1" :key="label">
          {{ label }}
        </div>
      </div>
    </div>

    <div class="py-3">
      <p class="text-center py-1 text-green-500 font-bold">
        List of bacteria without target:
      </p>
      <div
        class="border px-5 py-3 overflow-auto h-80 bg-gray-100 border-gray-300"
      >
        <div v-for="label in labels2" :key="label">
          {{ label }}
        </div>
      </div>
    </div>

    <div v-if="!displayParameters" class="py-5 col-span-2 text-center">
      <p class="py-2 font-bold">Confirm your selection ?</p>
      <div style="display:flex; justify-content:center; column-gap:1em">
        <Button
        @click="confirmedSelect"
          class="p-button-outlined"
      >
        Yes
        </Button>
        <Button
        @click="notConfirmedSelect"
          class="p-button-outlined"
      >
        No
        </Button>
      </div>
    </div>

    <div v-else class="col-span-2">
      <p class="mt-3 text-center text-2xl font-bold">Other parameters</p>
      <div v-if="category === 'allGenomes'" class="grid grid-cols-3">
        <div
          class="px-6 py-5 mx-8 my-5 bg-gray-100 border rounded border-gray-400"
        >
          <p>PAM motif</p>
          <select id="pam_AllG" class="w-60 border border-gray-400">
            <option selected>NGG</option>
          </select>
        </div>

        <div
          class="px-6 py-5 mx-8 my-5 bg-gray-100 border rounded border-gray-400"
        >
          <p>sgRNA length (without PAM motif)</p>
          <select id="sgrna-length_AllG" class="w-60 border border-gray-400">
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20" selected>20</option>
          </select>
        </div>

        <div
          class="px-6 py-1 mx-8 my-5 bg-gray-100 border rounded border-gray-400"
        >
          <p>Email</p>
          <input
            type="text"
            id="email"
            label="email"
            class="w-60 border border-gray-400 rounded"
          />
          <p class="text-sm">
            Provide your email to be notified when your results are available
            and to have access to them.
          </p>
        </div>

        <div class="col-span-3 px-5 py-2 text-right">
          <Button
            @click="submitRequest"
            class="
              p-button-lg
            "
          >
            Submit >>
          </Button>
        </div>
      </div>

      <div v-if="category === 'specificGene'" class="grid grid-cols-4">
        <div
          class="px-6 py-5 mx-6 my-5 bg-gray-100 border rounded border-gray-400"
        >
          <p>Percentage identity min for homolog genes research</p>
          <input
            id="percent_identity"
            type="number"
            value="70"
            min="0"
            max="100"
            class="border border-gray-400 px-1"
            width="10px"
          />
        </div>

        <div
          class="px-6 py-5 mx-6 my-5 bg-gray-100 border rounded border-gray-400"
        >
          <p>PAM motif</p>
          <select id="pam_AllG" class="w-60 border border-gray-400">
            <option selected>NGG</option>
          </select>
        </div>

        <div
          class="px-6 py-5 mx-6 my-5 bg-gray-100 border rounded border-gray-400"
        >
          <p>sgRNA length (without PAM motif)</p>
          <select id="sgrna-length_AllG" class="w-60 border border-gray-400">
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20" selected>20</option>
          </select>
        </div>

        <div
          class="px-6 py-1 mx-6 my-5 bg-gray-100 border rounded border-gray-400"
        >
          <p>Email</p>
          <input
            type="text"
            id="email"
            label="email"
            class="w-60 border border-gray-400"
          />
          <p class="text-sm">
            Provide your email to be notified when your results are available
            and to have access to them.
          </p>
        </div>

        <div class="col-span-4 px-5 py-2 text-right">
          <Button
            @click="submitRequest"
          >
            Submit >>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, inject } from "vue";
import TaxonomicTree from "../components/TaxonomicTree.vue";
import TaxonomyService from "../service/taxonomy";
import TreeWrapper from "../service/treeWrapper";
import Button from '@mmsb/primevue-forked/button'
import {
  SelectedKeys,
  ExpandedKeys,
  NewNode,
  // NewTree,
  // FinalSelection,
} from "../types/TreeTypes";

export default defineComponent({
  props: ["category", "sequence"],
  components: { TaxonomicTree, Button },
  setup(props, { emit }) {
    const treeWrapper1 = new TreeWrapper();
    const treeWrapper2 = new TreeWrapper();
    const treeService = new TaxonomyService();

    onMounted(() => {
      treeService.getTree().then((coll) => {
        treeWrapper1.newTree = coll.newTree.root;
        treeWrapper1.newTreeIndex = coll.treeIndex;
      });

      treeService.getTree().then((coll) => {
        treeWrapper2.newTree = coll.newTree.root;
        treeWrapper2.newTreeIndex = coll.treeIndex;
      });
    });

    const resetBrowse = (treeNb: number) => {
      if (
        treeWrapper1.newTree != undefined &&
        treeWrapper2.newTree != undefined
      ) {
        const tree1: any = treeWrapper1.newTree; // NewTree
        const tree2: any = treeWrapper2.newTree; // NewTree

        if (treeNb === 1 && tree1) {
          for (const key in Object.entries(tree1)) {
            tree2[key].checked = false;
            browse(tree2[key], true);
          }
        } else if (treeNb === 2 && tree2) {
          for (const key in Object.entries(tree2)) {
            tree1[key].checked = false;
            browse(tree1[key], true);
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

    const selectLeaf = (node: NewNode, leaf: NewNode[]) => {
      if (node.children) {
        node.children.forEach((child: NewNode) => {
          if (child.selectable !== false) {
            selectLeaf(child, leaf);
          }
        });
      } else {
        leaf.push(node);
      }
    };

    const selectUnselectNode = (
      currentWrapper: any, // TreeWrapper
      otherWrapper: any, // TreeWrapper
      node: NewNode,
      selectedKeys: SelectedKeys,
      nodeSelected: boolean
    ) => {
      currentWrapper.selectedKeys = selectedKeys.value;
      node.checked = nodeSelected ? true : false;

      // same node of the other tree
      const node2 = currentWrapper.getBrowsableNode(
        node,
        otherWrapper.newTreeIndex
      );

      // cannot check a disabled node, to finish !
      if (node.selectable === false) {
        node.checked = undefined;
        return;
      }

      // select a node disable the same node in the other tree
      if (node2 && nodeSelected) {
        selectLeaf(node, currentWrapper.finalSelection);
        browse(node2, false);
      } else if (node2 && !nodeSelected) {
        const _leaf: NewNode[] = [];
        selectLeaf(node, _leaf);
        currentWrapper.finalSelection = currentWrapper.finalSelection.filter(
          (node: NewNode) => !_leaf.includes(node)
        );
        browse(node2, true);
      }
    };

    // about tree 1
    const onNodeSelectTree1 = (node: NewNode, selectedKeys: SelectedKeys) => {
      selectUnselectNode(treeWrapper1, treeWrapper2, node, selectedKeys, true);
    };
    const onNodeUnselectTree1 = (node: NewNode, selectedKeys: SelectedKeys) => {
      selectUnselectNode(treeWrapper1, treeWrapper2, node, selectedKeys, false);
    };
    const onNodeExpandTree1 = (expandedKeys: ExpandedKeys) => {
      treeWrapper1.expandedKeys = expandedKeys;
    };
    const resetTree1 = () => {
      resetTree(treeWrapper1, treeWrapper2, 1);
    };

    // about tree 2
    const onNodeSelectTree2 = (node: NewNode, selectedKeys: SelectedKeys) => {
      selectUnselectNode(treeWrapper2, treeWrapper1, node, selectedKeys, true);
    };
    const onNodeUnselectTree2 = (node: NewNode, selectedKeys: SelectedKeys) => {
      selectUnselectNode(treeWrapper2, treeWrapper1, node, selectedKeys, false);
    };
    const onNodeExpandTree2 = (expandedKeys: ExpandedKeys) => {
      treeWrapper2.expandedKeys = expandedKeys;
    };
    const resetTree2 = () => {
      resetTree(treeWrapper2, treeWrapper1, 2);
    };

    // enable or disable the selection of leaves in a tree
    const browse = (node2: NewNode, activate: boolean) => {
      node2.selectable = activate ? true : false;
      node2.checked = activate ? undefined : false;
      node2.style = activate ? "color:#495057" : "color:#cccccc";
      if (node2.children) {
        node2.children.forEach((child: NewNode) => {
          if (child.checked === true) return;
          browse(child, activate);
        });
      }
    };

    // returns the final selection
    const filterCheckedLeaf = (finalSelection: any /* FinalSelection */) => {
      let filterObj: NewNode[] = [];
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
    const socket: any = inject("socket");
    const inputData = ref();

    const submitRequest = () => {
      const email = (document.querySelector("#email") as HTMLInputElement)
        .value;

      if (email !== "") {
        const gi: string[] = [];
        const gni: string[] = [];

        treeWrapper1.listTree.forEach((leave: NewNode) => {
          const genome_uuid: any = leave.genome_uuid; // string
          gi.push(genome_uuid);
        });

        treeWrapper2.listTree.forEach((leave: NewNode) => {
          const genome_uuid: any = leave.genome_uuid; // string
          gni.push(genome_uuid);
        });

        const _pam = document.getElementById("pam_AllG") as HTMLSelectElement;
        const pam = _pam.options[_pam.selectedIndex].text;

        const _sgrna_length = document.getElementById(
          "sgrna-length_AllG"
        ) as HTMLSelectElement;
        const sgrna_length =
          _sgrna_length.options[_sgrna_length.selectedIndex].text;

        if (props.category === "allGenomes") {
          inputData.value = {
            gi,
            gni,
            pam,
            sgrna_length,
            email: email,
          };

          socket.emit("allGenomesRequest", inputData.value);
          _displayResults();
        } else if (props.category === "specificGene") {
          const pid = (
            document.getElementById("percent_identity") as HTMLInputElement
          ).value;
          if (parseInt(pid) < 0 || parseInt(pid) > 100) {
            alert("The percentage identity must be between 0 and 100.");
            return;
          }
          const seq = props.sequence;
          inputData.value = {
            gi,
            gni,
            pam,
            sgrna_length,
            email,
            pid,
            seq,
          };
          socket.emit("specificGeneRequest", inputData.value);
          _displayResults();
        }
      } else {
        alert("You have to provide email adress.");
      }
    };

    const _displayResults = () => {
      emit("display-results");
    };

    return {
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

<style scoped>
.twotrees-wrapper{
  display:grid; 
  grid-template-columns: repeat(2, 1fr);
  grid-gap:2em; 
}
.parameter{
  flex-grow:1;
  display:flex;
  flex-direction:column;
  justify-content:center; 
  padding:1rem; 
  border-width:1px; 
  border-color: rgba(156, 163, 175);
  border-radius: 0.25rem;
  background-color: rgba(243, 244, 246); 
}
</style>