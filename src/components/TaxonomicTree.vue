<template>
  <div>
    <div class="flex mt-3 mb-3">
      <div class="mt-auto mr-auto">
        <form @submit.prevent="search">
          <input
            type="search"
            placeholder="Search for an organism"
            class="border rounded"
          />
          <button class="border rounded bg-gray-200">Search</button>
        </form>
      </div>
      <!-- <div>
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
    </div> -->
    </div>

    <Tree
      :value="json"
      :expandedKeys="expandedKeys"
      selectionMode="checkbox"
      v-model:selectionKeys="selectedKeys"
      @node-select="onNodeSelect"
      @node-unselect="onNodeUnselect"

    />
    <!-- <button @click="resetTree" class="p-2 bg-red-500 border rounded">
      Reset tree
    </button> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, watch } from "vue";
import Tree from "primevue/tree";
// import Button from "primevue/button";

export default defineComponent({
  props: ["json"],
  components: { Tree },
  setup(_, { emit }) {
    // const { json } = toRefs(props);

    // onMounted(() => {
    //   nodes.value = props.json.root;
    // });

    const selectedKeys = ref<any>({});
    const expandedKeys = ref<any>({});
    // const nodes = ref();
    const resetTree = () => {
      emit("reset");
      selectedKeys.value = {};
    };

    const onNodeSelect = (node: any) => {
      emit("on-node-select", node);
      // node.selectable=false;
      // node.style="color:gray"
      // console.log();
    };

    const onNodeUnselect = (node:any) => {
      emit("on-node-unselect", node);
    };
 
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
      resetTree,
      expandedKeys,
      selectedKeys,
      onNodeSelect,
      onNodeUnselect
    };
  },
});
</script>

<style scoped>
button {
  margin-right: 0.5rem;
}
</style>