<template>
  <p class="py-1 px-1">
    Here you can find sgRNA sequence(s) to target a pool of bacteria by CRISPR.
    You have to choose the bacterial genomes which you want to target and the
    bacterial genomes in which you want to avoid sgRNA hybridisation.
  </p>

  <div class="grid grid-cols-2">
    <div class="px-5 py-3">
      <p class="text-center text-3xl py-3">Organisms to target</p>
      <TaxonomicTree
        :json="newTree"
        @on-node-select="onNodeSelectTree1"
        @on-node-unselect="onNodeUnselectTree1"
        @reset="reset(1)"
      />
    </div>

    <div class="px-5 py-3">
      <p class="text-center text-3xl py-3">Organisms to exclude</p>
      <TaxonomicTree
        :json="newTree2"
        @on-node-select="onNodeSelectTree2"
        @on-node-unselect="onNodeUnselectTree2"
        @reset="reset(2)"
      />
    </div>

    <div class="px-5 text-right">
      <button @click="submit" class="p-2 bg-green-500 border rounded">
        Submit selections
      </button>
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
    const newTree = ref();
    const newTree2 = ref();
    const newTreeIndex1 = ref();
    const newTreeIndex2 = ref();
    const treeService = new TaxonomyService();
    onMounted(() => {
      treeService.getTree().then((coll) => {
        newTree.value = coll.newTree.root;
        newTreeIndex1.value = coll.treeIndex;
      });
      treeService.getTree().then((coll) => {
        newTree2.value = coll.newTree.root;
        newTreeIndex2.value = coll.treeIndex;
      });
    });

    // const filterCheckedLeaf = (treeIndex: any) => {
    //   let filterObj: Array<any> = [];
    //   console.log(treeIndex["1-0"]);

    // Object.keys(treeIndex).forEach((key) => {
    // console.log(key);
    // console.log(treeIndex[key].checked);
    // console.log(treeIndex[key].genome_uuid);

    //   if (treeIndex[key].checked && treeIndex[key].genome_uuid)
    //     filterObj.push(treeIndex[key]);
    //     console.log("toto");

    // });
    //   return filterObj
    // };

    const submit = () => {
      // const finalSelection1 = filterCheckedLeaf(newTreeIndex1.value);
      // const finalSelection2 = filterCheckedLeaf(newTreeIndex2.value);
      console.log(finalSelection1.value);
      console.log(finalSelection2.value);
    };

    // const reset = (treeNb: number) => {
    //   if (treeNb === 1) {
    //     finalSelection1.value = [];
    //   } else if (treeNb === 2) {
    //     finalSelection2.value = [];
    //   }
    // };
    const finalSelection1 = ref([]);
    const finalSelection2 = ref([]);

    const onNodeSelectTree1 = (node: any) => {
      node.checked = true;
      const node2 = newTreeIndex2.value[node.key];
      selectLeaf(node, finalSelection1.value);
      browse(node2, false);
    };

    const selectLeaf = (node: any, leaf: any[]) => {
      if (node.children) {
        node.children.forEach((child: any) => {
          selectLeaf(child, leaf);
        });
      } else {
        leaf.push(node);
      }
    };

    const onNodeUnselectTree1 = (node: any) => {
      const node2 = newTreeIndex2.value[node.key];
      node.checked = false;
      const _leaf:any[] = [];
      selectLeaf(node, _leaf)
      finalSelection1.value = finalSelection1.value.filter(node => !_leaf.includes(node) )
      browse(node2, true);
    };

    const onNodeSelectTree2 = (node: any) => {
      node.checked = true;
      const node1 = newTreeIndex1.value[node.key];
      selectLeaf(node, finalSelection2.value);
      browse(node1, false);
    };

    const onNodeUnselectTree2 = (node: any) => {
      const node1 = newTreeIndex1.value[node.key];
      node.checked = false;
      const _leaf:any[] = [];
      selectLeaf(node, _leaf)
      finalSelection2.value = finalSelection2.value.filter(node => !_leaf.includes(node) )
      console.log(_leaf);      
      browse(node1, true);
    };

    function browse(node: any, activate: boolean) {
      if (!node.checked) {
        node.selectable = activate ? true : false;
        node.style = activate ? "color:#495057" : "color:#cccccc";
      }
      if (node.children) {
        node.children.forEach((child: any) => browse(child, activate));
      }
    }

    return {
      newTree,
      newTree2,
      submit,
      onNodeSelectTree1,
      onNodeUnselectTree1,
      onNodeSelectTree2,
      onNodeUnselectTree2,
    };
  },
});
</script>