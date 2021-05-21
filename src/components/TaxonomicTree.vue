<template>
  <div>
    <!-- <div class="flex mt-3 mb-3">
      <div>
        <Button
          type="button"
          icon="pi pi-plus"
          label="Expand All"
          @click="expandAll"
          :nodes="nodes"
        />
      </div>

      <div>
        <Button
          type="button"
          icon="pi pi-plus"
          label="Collapse All"
          @click="collapseAll"
        />
      </div>
    </div> -->

    <Tree
      :value="tree"
      :filter="true"
      filterMode="strict"
      :expandedKeys="expandedKeys"
      selectionMode="checkbox"
      v-model:selectionKeys="selectedKeys"
      @node-select="onNodeSelect"
      @node-unselect="onNodeUnselect"
      @node-expand="onNodeExpand"
    />
    
    <!-- <button @click="resetTree" class="p-2 bg-red-500 border rounded">
      Reset tree
    </button> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import Tree from "primevue/tree";
// import Button from "primevue/button";

export default defineComponent({
  props: ["tree", "updatedSelectedKeys", "updatedExpandedKeys"],
  components: { Tree },
  setup(props, { emit }) {
    const selectedKeys = ref<any>({});
    const expandedKeys = ref<any>({});

    const onNodeSelect = (node: any) => {
      emit("on-node-select", node, selectedKeys);
    };

    const onNodeUnselect = (node: any) => {      
      emit("on-node-unselect", node, selectedKeys);
    };

    const onNodeExpand = (expandedKeys:any) => { 
      emit("on-node-expand", expandedKeys)
    }

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

    // const nodes = ref(props);

    // const resetTree = () => {
    //   emit("reset");
    //   selectedKeys.value = {};
    // };

    // const expandAll = () => {
    //   for (let node of nodes.value) {
    //     expandNode(node);
    //   }
    //   expandedKeys.value = { ...expandedKeys.value };
    // };

    // const expandNode = (node: any) => {
    //   if (node.children && node.children.length) {
    //     expandedKeys.value[node.key] = true;
    //     for (let child of node.children) {
    //       expandNode(child);
    //     }
    //   }
    // };

    // const collapseAll = () => {
    //   expandedKeys.value = {};
    // };

    return {
      onNodeSelect,
      onNodeUnselect,
      onNodeExpand,
      expandedKeys,
      selectedKeys,
    };
  },
});
</script>

<style scoped>
button {
  margin-right: 0.5rem;
}
</style>