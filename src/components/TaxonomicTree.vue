<template>
  <div style="margin-bottom: 1em">
    <Button
      type="button"
      icon="pi pi-plus"
      label="Expand All"
      @click="expandAll"
      :nodes="nodes"
    />
    <Button
      type="button"
      icon="pi pi-plus"
      label="Collapse All"
      @click="collapseAll"
    />
  </div>
  <Tree
    :value="nodes"
    :expandedKeys="expandedKeys"
    selectionMode="checkbox"
    v-model:selectionKeys="selectedKeys"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Tree from "primevue/tree";
import Button from "primevue/button";

export default defineComponent({
  props: ["json"],
  components: { Tree, Button },
  setup(props) {
    const selectedKeys = ref<any>({});
    const nodes = ref(props.json.root);
    const expandedKeys = ref<any>({});
    const expandAll = () => {
      for (let node of nodes.value) {
        expandNode(node);
      }
      expandedKeys.value = { ...expandedKeys.value };
    };
    const expandNode = (node:any) => {
      if (node.children && node.children.length) {
        expandedKeys.value[node.key] = true;
        for (let child of node.children) {
          expandNode(child);
        }
      }
    };
    const collapseAll = () => {
      expandedKeys.value = {};
    };

    return {
      nodes,
      expandedKeys,
      selectedKeys,
      expandAll,
      collapseAll,
    };
  },
});
</script>

<style scoped>
button {
  margin-right: 0.5rem;
}
</style>