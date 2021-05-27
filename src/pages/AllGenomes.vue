<template>
  <div>
    <p class="py-5 px-3">
      Here you can find sgRNA sequence(s) to target a pool of bacteria by
      CRISPR. You have to choose the bacterial genomes which you want to target
      and the bacterial genomes in which you want to avoid sgRNA hybridisation.
    </p>

    <div v-if="!submitted" class="grid grid-cols-2">
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

      <div class="col-span-2 py-2 text-center">
        <button
          @click="submitSelection"
          class="p-3 text-white font-bold bg-green-500 border rounded border-gray-500"
        >
          Submit selections
        </button>
      </div>
    </div>

    <div v-else class="grid grid-cols-2">
      <div class="px-5 py-3">
        <p class="text-center py-1 text-green-500 font-bold">
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

      <div class="px-5 py-3">
        <p class="text-center py-1 text-red-500 font-bold">
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
        <button
          @click="confirmedSelect"
          class="mx-2 py-3 px-4 text-white font-bold bg-green-500 border rounded border-gray-500"
        >
          Yes
        </button>
        <button
          @click="notConfirmedSelect"
          class="mx-2 py-3 px-4 text-white font-bold bg-red-500 border rounded border-gray-500"
        >
          No
        </button>
      </div>

      <div v-else class="col-span-2">
        <p class="mt-3 text-center text-2xl font-bold">Other parameters</p>
        <div class="grid grid-cols-3">
          <div
            class="px-6 py-5 mx-8 my-5 bg-gray-100 border rounded border-gray-400"
          >
            <p>PAM motif</p>
            <select class="w-60 border border-gray-400">
              <option>NGG</option>
            </select>
          </div>

          <div
            class="px-6 py-5 mx-8 my-5 bg-gray-100 border rounded border-gray-400"
          >
            <p>sgRNA length (without PAM motif)</p>
            <select class="w-60 border border-gray-400">
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
              name="email"
              label="email"
              class="w-60 border border-gray-400 rounded"
            />
            <p class="text-sm">
              Provide your email to be notified when your results are available
              and to have access to them.
            </p>
          </div>

          <div class="col-span-3 px-5 py-2 text-right">
            <button
              @click="submitRequest"
              class="p-3 text-white text-2xl font-bold bg-gradient-to-r from-green-700 to-green-400 rounded border border-black"
            >
              Submit >>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject } from "vue";
import TaxonomicTree from "../components/TaxonomicTree.vue";
import TaxonomyService from "../service/taxonomy";
import treeWrapper from "./treeWrapper";
import { SelectedKeys, ExpandedKeys, Node } from "../types/TreeTypes";

export default defineComponent({
  components: { TaxonomicTree },
  setup() {
    const treeWrapper1 = new treeWrapper();
    const treeWrapper2 = new treeWrapper();
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
      const tree1: any = treeWrapper1.newTree;
      const tree2: any = treeWrapper2.newTree;
      if (treeNb === 1) {
        if (tree1) {
          for (const node in Object.entries(tree1)) {
            browse(tree2[node], true);
          }
        }
      } else if (treeNb === 2) {
        if (tree2) {
          for (const node in Object.entries(tree2)) {
            browse(tree1[node], true);
          }
        }
      }
    };

    const resetTree = (
      currentWrapper: any,
      otherWrapper: any,
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
      currentWrapper: any, //TreeWrapper
      otherWrapper: any, //TreeWrapper
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
        // update the final selection
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
      const _length2 = Object.keys(treeWrapper2.finalSelection).length;

      if (_length1 !== 0 || _length2 !== 0) {
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

    const submitRequest = (socket: any) => {
      const input: HTMLInputElement | null = document.querySelector("input");
      if (input && input.value === "") {
        alert("You have to provide email adress.");
        return;
      } else {
        console.log("submit request");
        foo(socket);
      }
    };

    const socket: any = inject("socket");

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

function foo(socket: any) {
  const message = ref("hello");
  console.log("here");

  // socket.emit("computeSpecific", { gi: ["E.coli"], gni: ["citronbacter"] });
  socket.on("connect", function () {
    console.log("Connected");
  });

  return {
    message,
  };
}

</script>