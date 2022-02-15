<template>
  <router-link to="/">
    <div class="header-title">
      <img class="logo" src="/assets/logo.png">
      <div style="justify-content:center">
        <p style="font-size:30px">Crispr Search Tool for Bacteria</p>
        <p>A user-friendly intuitive CRISPR target predictor for bacteria </p>
      </div>
    </div>
  </router-link>
  <nav>
    <div class="header-navigator">
      <TabMenu style="font-size:20px" :model="items"/>
    </div>
  </nav>
</template>

<script lang='ts'>

import TabMenu from "@mmsb/primevue-forked/tabmenu";

export default {
  components: { TabMenu },
  setup(){
    const items = [
      {label: "All genomes",
      to : "/all-genomes"}, 
      {label: "Specific gene",
      to : "/specific-gene"}
    ]

    return {items}
  }
  
}
</script>

<style>
.header-title{
  display:flex;
  justify-content:center;
  align-items:center;
}
.logo{
  width:400px; 
}
.header-navigator .p-tabmenu-nav{
  display:flex;
  width:100%;
}

.header-navigator .p-tabmenuitem{
  display:flex;
  width:50%;
  text-align:center;
}

.header-navigator .p-menuitem-link{
  width:100%;
}

.header-navigator .p-menuitem-text{
  width:100%; 
}


</style>