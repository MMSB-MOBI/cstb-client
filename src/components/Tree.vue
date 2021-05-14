<template>
  <div style="margin-bottom: 1em">
    <Button
      type="button"
      icon="pi pi-plus"
      label="Expand All"
      @click="expandAll(nodes)"
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
import { defineComponent, ref, computed } from "vue";
import Tree from "primevue/tree";
import Button from "primevue/button";

export default defineComponent({
  props: ["json"],
  components: { Tree, Button },
  setup(props) {
    const selectedKeys = ref<any>({});
    const nodes = computed(() => {
      return props.json.root;
    });
    const expandedKeys = ref<any>({});

    // comment éviter la répétition du rappel d'expandAll ?
    const expandAll = (nodes: any) => {
      if (nodes.value) {
        for (let i in nodes.value) {
          const node = nodes.value[i];
          expandedKeys.value[node.key] = true;
          if (node.children) {
            expandAll(node.children);
          }
        }
      } else {
        for (let i in nodes) {
          const node = nodes[i];
          expandedKeys.value[node.key] = true;
          if (node.children) {
            expandAll(node.children);
          }
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