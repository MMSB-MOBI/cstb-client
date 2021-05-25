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
      @reset-tree="resetTree"
    />

    <button
      @click="resetTree"
      class="my-1 p-1 bg-red-500 border border-gray-500 rounded text-white"
    >
      Reset tree
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from "vue";
import Tree from "primevue/tree";
// import Button from "primevue/button";
import { SelectedKeys, Node } from "../types/TreeTypes";

export default defineComponent({
  props: ["tree", "updatedSelectedKeys", "updatedExpandedKeys"],
  components: { Tree },
  setup(props, { emit }) {
    const selectedKeys: Ref<any> = ref({});
    const expandedKeys: Ref<any> = ref({});

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
      resetTree,
    };
  },
});
</script>

<style scoped>
button {
  margin-right: 0.5rem;
}
</style>