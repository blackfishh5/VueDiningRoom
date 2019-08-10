<template>
  <mu-container class="tabbar">
    <mu-bottom-nav class="tabbar-nav">
      <mu-bottom-nav-item title="Recents" icon="restore" to="/"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="Favorites" icon="favorite" to="/main/window"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="Nearby" icon="location_on" to="/main/user"></mu-bottom-nav-item>
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
  padding:0;
}
/* .tabbar .tabbar-nav{
  width:100%;
} */
</style>

