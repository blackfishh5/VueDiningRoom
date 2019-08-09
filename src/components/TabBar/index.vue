<template>
  <mu-container class="tabbar">
    <mu-bottom-nav class="tabbar-nav">
      <mu-bottom-nav-item title="Recents" icon="restore"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="Favorites" icon="favorite"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="Nearby" icon="location_on"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </mu-container>
</template>
<script>
export default {
  name: "TabBar"
};
</script>

<style scoped>
.tabbar{
  position:fixed;
  bottom:0;
  z-index:9;
  background: #fff;
}
/* .tabbar .tabbar-nav{
  width:100%;
} */
</style>

