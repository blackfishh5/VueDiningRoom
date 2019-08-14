<template>
  <div>
    <Header title="用户" :isMain="true"></Header>
    <div>
      <router-view></router-view>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
export default {
  name: "User",
  components: { Header, TabBar },
  data() {
    return {};
  }
};
</script>

<style>

</style>
