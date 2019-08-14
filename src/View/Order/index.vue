<template>
  <div>
    <Header title="订单详情" :isMain="true"></Header>
    <div>
      <!-- <router-view></router-view> -->
      <h2 id="container">订单详情</h2>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
export default {
  name: "Order",
  components: { Header, TabBar },
  data() {
    return {};
  }
};
</script>

<style scoped>
#container{
  width:100%;
  margin-top:56px;
}
</style>
