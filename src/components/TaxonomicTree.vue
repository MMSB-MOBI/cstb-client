<template>
  <div>
    <Tree
      :value="tree"
      :filter="true"
      :expandedKeys="expandedKeys"
      selectionMode="checkbox"
      v-model:selectionKeys="selectedKeys"
      v-model:filteredKeys="filteredKeys"
      v-model:filterText="filterText"
      @node-select="onNodeSelect"
      @node-unselect="onNodeUnselect"
      @node-expand="onNodeExpand"
      @reset-tree="resetTree"
    />

    <Button
      @click="resetTree"
      class="p-button-sm"
    >
      Reset tree
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, onUpdated, watch } from "vue";
import { SelectedKeys, ExpandedKeys, NewNode } from "../types/TreeTypes";
import Tree from "@mmsb/primevue-forked/tree";
import Button from '@mmsb/primevue-forked/button'
// import Button from "@mmsb/primevue-forked/button";

export default defineComponent({
  props: ["tree", "updatedSelectedKeys", "updatedExpandedKeys"],
  components: { Tree, Button },
  setup(props, { emit }) {
    const selectedKeys: Ref<SelectedKeys> = ref({});
    const expandedKeys: Ref<ExpandedKeys> = ref({});
    const filteredKeys: Ref<NewNode[]> = ref([]); 
    const filterText : Ref<string> = ref(""); 
    const timeout : Ref<number|undefined> = ref()

    const onNodeSelect = (node: Node) => {
      emit("on-node-select", node, selectedKeys);
    };

    const onNodeUnselect = (node: Node) => {
      emit("on-node-unselect", node, selectedKeys);
    };

    const onNodeExpand = () => {
      emit("on-node-expand", expandedKeys);
    };

    const resetTree = () => {
      selectedKeys.value = {};
      expandedKeys.value = {};
      emit("reset-tree");
    };

    /**Open the tree given in nodes, regarding to search expression. 
     * In each path, will open until the firt parent that match the search.
     */
    const BFSAndStopTree = (nodes:NewNode[], search:string) => {
      let newList: NewNode[] = []
      for(const node of nodes) {
        if(!(node.label.toLowerCase().includes(search))){
          expandedKeys.value[node.key] = true
          if(node.children){
            newList = newList.concat(node.children)
          }
        }   
      }  
      if (newList.length >  0) BFSAndStopTree(newList, search)
    }
    

    watch(filteredKeys, (current: NewNode[]) => {
      if(! filterText.value){ //if we search nothing
        expandedKeys.value = {}
        return
      }
      if(timeout.value){
        clearTimeout(timeout.value)
      }
      timeout.value = setTimeout(() => {
        expandedKeys.value = {}
        if(filterText.value) BFSAndStopTree(current, filterText.value)
      }, 500)
    })

    if (props.updatedSelectedKeys) {
      const newSelectedKeys = computed(() => {
        return props.updatedSelectedKeys;
      });
      selectedKeys.value = newSelectedKeys.value;
    }

    if (props.updatedExpandedKeys) {
      const newExpandedKeys = computed(() => {
        return props.updatedExpandedKeys;
      });
      expandedKeys.value = newExpandedKeys.value;
    }

    return {
      onNodeSelect,
      onNodeUnselect,
      onNodeExpand,
      expandedKeys,
      selectedKeys,
      resetTree,
      filteredKeys,
      filterText
    };
  },
});
</script>

<style scoped>
button {
  margin-right: 0.5rem;
}
</style>