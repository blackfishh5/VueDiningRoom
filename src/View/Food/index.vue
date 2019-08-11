<template>
  <div>
    <Header title="点餐" :isMain="false">
      <mu-button icon class="back-btn" @touchstart="handleBack">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
    </Header>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "Food",
  components: { Header },
  data() {
    return {};
  },
  methods:{
    handleBack(){
      this.$router.back()
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.back-btn {
  position: absolute;
  left: 0;
  top: 5px;
}
</style>
