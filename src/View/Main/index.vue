<template>
  <div>
    <Header title="食堂"></Header>
    <div id="container">
      <router-view></router-view>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
export default {
  name: "Main",
  components: { Header, TabBar },
  data() {
    return {};
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
#container{
  width:100%;
  margin:56px auto;
  padding:0;
}
</style>
