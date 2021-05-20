<template>
  <div>
    <p class="py-5 px-3 text-center">
      Here you can find sgRNA sequence(s) to target a pool of bacteria by
      CRISPR. You have to choose the bacterial genomes which you want to target
      and the bacterial genomes in which you want to avoid sgRNA hybridisation.
    </p>

    <div class="grid grid-cols-2">
      <div v-if="!submitted" class="px-5 py-3">
        <p class="text-center font-bold text-3xl py-3">Organisms to target</p>
        <TaxonomicTree
          :tree="newTree1"
          :updatedSelectedKeys="selectedKeys1"
          :updatedExpandedKeys="expandedKeys1"
          @on-node-select="onNodeSelectTree1"
          @on-node-unselect="onNodeUnselectTree1"
          @on-node-expand="onNodeExpandTree1"
          @reset="reset(1)"
        />
      </div>

      <div v-else class="px-5 py-3">
        <p class="text-center py-1 text-green-500 font-bold">
          List of bacteria will be targeted:
        </p>
        <div class="border px-5 py-3 overflow-auto h-40 bg-gray-100">
          <div v-for="label in labels1" :key="label">
            {{ label }}
          </div>
        </div>
      </div>

      <div v-if="!submitted" class="px-5 py-3">
        <p class="text-center font-bold text-3xl py-3">Organisms to exclude</p>
        <TaxonomicTree
          :tree="newTree2"
          :updatedSelectedKeys="selectedKeys2"
          :updatedExpandedKeys="expandedKeys2"
          @on-node-select="onNodeSelectTree2"
          @on-node-unselect="onNodeUnselectTree2"
          @on-node-expand="onNodeExpandTree2"
          @reset="reset(2)"
        />
      </div>

      <div v-else class="px-5 py-3">
        <p class="text-center py-1 text-red-500 font-bold">
          List of bacteria without target:
        </p>
        <div class="border px-5 py-3 overflow-auto h-40 bg-gray-100">
          <div v-for="label in labels2" :key="label">
            {{ label }}
          </div>
        </div>
      </div>

      <div v-if="!submitted" class="col-span-2 py-2 text-center">
        <button
          @click="submit"
          class="p-3 text-white font-bold bg-green-500 border rounded"
        >
          Submit selections
        </button>
      </div>

      <div v-else class="py-5 col-span-2 text-center">
        <p class="py-2 font-bold">Confirm your selection ?</p>
        <button
          @click="confirmedSelect"
          class="mx-2 py-3 px-4 text-white font-bold bg-green-500 border rounded"
        >
          Yes
        </button>
        <button
          @click="notConfirmedSelect"
          class="mx-2 py-3 px-4 text-white font-bold bg-red-500 border rounded"
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

export default defineComponent({
  components: { TaxonomicTree },
  setup() {
    const newTree1 = ref();
    const newTree2 = ref();
    const newTreeIndex1 = ref();
    const newTreeIndex2 = ref();
    const treeService = new TaxonomyService();

    onMounted(() => {
      treeService.getTree().then((coll) => {
        newTree1.value = coll.newTree.root;
        newTreeIndex1.value = coll.treeIndex;
      });
      treeService.getTree().then((coll) => {
        newTree2.value = coll.newTree.root;
        newTreeIndex2.value = coll.treeIndex;
      });
    });

    // const reset = (treeNb: number) => {
    //   if (treeNb === 1) {
    //     finalSelection1.value = [];
    //   } else if (treeNb === 2) {
    //     finalSelection2.value = [];
    //   }
    // };

    const finalSelection1 = ref([]);
    const finalSelection2 = ref([]);

    const selectLeaf = (node: any, leaf: any[]) => {
      if (node.children) {
        node.children.forEach((child: any) => {
          selectLeaf(child, leaf);
        });
      } else {
        leaf.push(node);
      }
    };

    const selectedKeys1 = ref();
    const selectedKeys2 = ref();
    const expandedKeys1 = ref();
    const expandedKeys2 = ref();

    const onNodeSelectTree1 = (
      node: any,
      selectedKeys: any
    ) => {
      selectedKeys1.value = selectedKeys.value;
      node.checked = true;
      const node2 = newTreeIndex2.value[node.key];
      selectLeaf(node, finalSelection1.value);
      browse(node2, false);
    };

    const onNodeUnselectTree1 = (node: any, selectedKeys: any) => {
      selectedKeys1.value = selectedKeys.value;
      const node2 = newTreeIndex2.value[node.key];
      node.checked = false;
      const _leaf: any[] = [];
      selectLeaf(node, _leaf);
      // update the final selection
      finalSelection1.value = finalSelection1.value.filter(
        (node) => !_leaf.includes(node)
      );
      browse(node2, true);
    };

    const onNodeExpandTree1 = (expandedKeys: any) => {
      expandedKeys1.value = expandedKeys;
      // console.log(expandedKeys.value);
      // console.log(expandedKeys1.value);
    };

    const onNodeSelectTree2 = (
      node: any,
      selectedKeys: any
    ) => {
      selectedKeys2.value = selectedKeys.value;
      node.checked = true;
      const node1 = newTreeIndex1.value[node.key];
      selectLeaf(node, finalSelection2.value);
      browse(node1, false);
    };

    const onNodeUnselectTree2 = (
      node: any,
      selectedKeys: any
    ) => {
      selectedKeys2.value = selectedKeys.value;
      const node1 = newTreeIndex1.value[node.key];
      node.checked = false;
      const _leaf: any[] = [];
      selectLeaf(node, _leaf);
      // update the final selection
      finalSelection2.value = finalSelection2.value.filter(
        (node) => !_leaf.includes(node)
      );
      browse(node1, true);
    };

    const onNodeExpandTree2 = (expandedKeys: any) => {
      expandedKeys2.value = expandedKeys;
    };

    function browse(node: any, activate: boolean) {
      // enable or disable the selection of leaves in a tree
      if (!node.checked) {
        node.selectable = activate ? true : false;
        node.style = activate ? "color:#495057" : "color:#cccccc";
      }

      if (node.children) {
        node.children.forEach((child: any) => browse(child, activate));
      }
    }

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

    const submitted = ref<boolean>(false);
    const labels1 = ref();
    const labels2 = ref();
    const listTree1 = ref();
    const listTree2 = ref();

    const submit = () => {
      submitted.value = true;
      const obj1 = filterCheckedLeaf(finalSelection1.value);
      listTree1.value = obj1.filterObj;
      labels1.value = obj1.labels;

      const obj2 = filterCheckedLeaf(finalSelection2.value);
      listTree2.value = obj2.filterObj;
      labels2.value = obj2.labels;
    };

    const confirmedSelect = () => {
      console.log("selection confirmed");
    };

    const notConfirmedSelect = () => {
      submitted.value = false;
    };

    return {
      newTree1,
      newTree2,
      submit,
      onNodeSelectTree1,
      onNodeUnselectTree1,
      onNodeExpandTree1,
      onNodeSelectTree2,
      onNodeUnselectTree2,
      onNodeExpandTree2,
      submitted,
      labels1,
      labels2,
      listTree1,
      listTree2,
      confirmedSelect,
      notConfirmedSelect,
      selectedKeys1,
      selectedKeys2,
      expandedKeys1,
      expandedKeys2,
    };
  },
});
</script>