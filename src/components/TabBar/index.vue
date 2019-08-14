<template>
  <mu-container class="tabbar">
    <mu-bottom-nav class="tabbar-nav" :value="bottomNav">
      <mu-bottom-nav-item value="/main" title="首页" icon="home" to="/main"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="/order" title="订单" icon="assignment" to="/order"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="/user" title="个人" icon="account_circle" to="/user"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </mu-container>
</template>
<script>
export default {
  name: "TabBar",
  data() {
    return {
      bottomNav:'/main'
    };
  },
  created(){
    this.bottomNav = this.$route.path
  }
};
</script>

<style scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  z-index: 9;
  background: #fff;
  padding: 0;
}
/* .tabbar .tabbar-nav{
  width:100%;
} */
</style>

