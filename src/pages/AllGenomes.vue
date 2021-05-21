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
          @reset="reset(1)"
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
          @reset="reset(2)"
        />
      </div>

      <div class="col-span-2 py-2 text-center">
        <button
          @click="submit"
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
        <div class="border px-5 py-3 overflow-auto h-80 bg-gray-100 border-gray-300">
          <div v-for="label in labels1" :key="label">
            {{ label }}
          </div>
        </div>
      </div>

      <div class="px-5 py-3">
        <p class="text-center py-1 text-red-500 font-bold">
          List of bacteria without target:
        </p>
        <div class="border px-5 py-3 overflow-auto h-80 bg-gray-100 border-gray-300">
          <div v-for="label in labels2" :key="label">
            {{ label }}
          </div>
        </div>
      </div>

      <div class="py-5 col-span-2 text-center">
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import TaxonomicTree from "../components/TaxonomicTree.vue";
import TaxonomyService from "../service/taxonomy";
import treeWrapper from "./treeWrapper";

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

    // const reset = (treeNb: number) => {
    //   if (treeNb === 1) {
    //     finalSelection1.value = [];
    //   } else if (treeNb === 2) {
    //     finalSelection2.value = [];
    //   }
    // };

    const selectLeaf = (node: any, leaf: any[]) => {
      if (node.children) {
        node.children.forEach((child: any) => {
          selectLeaf(child, leaf);
        });
      } else {
        leaf.push(node);
      }
    };

    const selectUnselectNode = (
      currentWrapper: any,
      otherWrapper: any,
      node: any,
      selectedKeys: any,
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
        const _leaf: any[] = [];
        selectLeaf(node, _leaf);
        // update the final selection
        currentWrapper.finalSelection = currentWrapper.finalSelection.filter(
          (node: any) => !_leaf.includes(node)
        );
        browse(node2, true);
      }
    };

    // about tree 1
    const onNodeSelectTree1 = (node: any, selectedKeys: any) => {
      selectUnselectNode(treeWrapper1, treeWrapper2, node, selectedKeys, true);
    };
    const onNodeUnselectTree1 = (node: any, selectedKeys: any) => {
      selectUnselectNode(treeWrapper1, treeWrapper2, node, selectedKeys, false);
    };
    const onNodeExpandTree1 = (node: any, expandedKeys: any) => {
      treeWrapper1.expandedKeys = expandedKeys;
    };

    // about tree 2
    const onNodeSelectTree2 = (node: any, selectedKeys: any) => {
      selectUnselectNode(treeWrapper2, treeWrapper1, node, selectedKeys, true);
    };
    const onNodeUnselectTree2 = (node: any, selectedKeys: any) => {
      selectUnselectNode(treeWrapper2, treeWrapper1, node, selectedKeys, false);
    };
    const onNodeExpandTree2 = (expandedKeys: any) => {
      treeWrapper2.expandedKeys = expandedKeys;
    };

    // enable or disable the selection of leaves in a tree
    function browse(node: any, activate: boolean) {
      if (!node.checked) {
        node.selectable = activate ? true : false;
        node.style = activate ? "color:#495057" : "color:#cccccc";
      }
      if (node.children) {
        node.children.forEach((child: any) => browse(child, activate));
      }
    }

    // returns the final selection
    const filterCheckedLeaf = (finalSelection: any) => {
      let filterObj: Array<any> = [];
      let labels: Array<string> = [];
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
    const submit = () => {
      submitted.value = true;

      const obj1 = filterCheckedLeaf(treeWrapper1.finalSelection);
      treeWrapper1.listTree = obj1.filterObj;
      labels1.value = obj1.labels;

      const obj2 = filterCheckedLeaf(treeWrapper2.finalSelection);
      treeWrapper2.listTree = obj2.filterObj;
      labels2.value = obj2.labels;
    };

    const confirmedSelect = () => {
      console.log("selection confirmed");
    };

    const notConfirmedSelect = () => {
      submitted.value = false;
    };

    return {
      treeWrapper1,
      treeWrapper2,
      labels1,
      labels2,
      submit,
      onNodeSelectTree1,
      onNodeUnselectTree1,
      onNodeExpandTree1,
      onNodeSelectTree2,
      onNodeUnselectTree2,
      onNodeExpandTree2,
      submitted,
      confirmedSelect,
      notConfirmedSelect,
    };
  },
});
</script>