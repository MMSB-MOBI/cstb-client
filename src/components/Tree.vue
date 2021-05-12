<template>
  <Tree
    :value="nodes"
    :expandedKeys="expandedKeys"
    selectionMode="checkbox"
    v-model:selectionKeys="selectedKeys"
  />
  <div style="margin-bottom: 1em">
    <Button
      type="button"
      icon="pi pi-plus"
      label="Expand All"
      @click="expandAll"
    />
    <Button
      type="button"
      icon="pi pi-plus"
      label="Collapse All"
      @click="collapseAll"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import Tree from "primevue/tree";
import Button from "primevue/button";
// import NodeService from '../service/NodeService';

export default defineComponent({
  props: ["json"],
  components: { Tree, Button },
  setup(props) {
    const selectedKeys = ref<any>({});
    const nodes = computed(() => {
      return props.json.root ;
    });
    const expandedKeys = ref<any>({});

    const expandAll = () => {
      for (let i in nodes.value) {
        const node = nodes.value[i];
        expandedKeys.value[node.key] = true;
      }
    };

    const collapseAll = () => {
      expandedKeys.value = {};
    }

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