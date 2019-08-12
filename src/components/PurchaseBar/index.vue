
<template>
  <mu-appbar class="pur-bar" style="width: 100%;">
    <span>￥ {{price}} </span>
    <mu-button flat slot="right">支付</mu-button>
  </mu-appbar>
</template>

<script>
export default {
  name: "PurchaseBar",
  props:['price'],
  data() {
    return {};
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.pur-bar{
  position: fixed;
  bottom: 0;
  z-index: 99;
  padding: 0;
}
</style>
