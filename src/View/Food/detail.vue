<template>
  <div >
    <Header title="食品详情" :isMain="false">
      <mu-button icon class="back-btn" @touchstart="handleBack">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
    </Header>
    <div id="container">
      {{msg}}
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "Detail",
  components: { Header },
  data() {
    return {
      msg: ""
    };
  },
  mounted() {
    var restaurantId = this.$route.params.restaurantId,
      windowsId = this.$route.params.windowsId,
      foodId = this.$route.params.foodId;
    this.axios
      .get(
        "/api/restaurant/restaurant/" +
          restaurantId +
          "/windows/" +
          windowsId +
          "/food/" +
          foodId
      )
      .then(res => {
        if (res.data.success) {
          // console.log(res.data.data)
          this.msg = res.data && res.data.data;
          console.log(this.msg);
        }
      });
  },
  methods: {
    handleBack() {
        this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
#container {
  width: 100%;
  height: 563px;
  margin: 56px auto;
  padding: 0;
}
.back-btn {
  position: absolute;
  left: 0;
  top: 5px;
}
</style>
