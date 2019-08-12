
<template>
  <mu-appbar class="pur-bar" style="width: 100%;">
    <span>￥ {{price}} </span>
    <mu-button flat slot="right" @touchstart.stop.prevent="openSimpleDialog">支付</mu-button>
    <mu-dialog title="Dialog" width="360" :open.sync="openSimple">
      this is simple Dialog
      <mu-button slot="actions" flat color="primary" @touchstart.stop.prevent="closeSimpleDialog">Close</mu-button>
    </mu-dialog>
  </mu-appbar>
</template>

<script>
export default {
  name: "PurchaseBar",
  props: ["price"],
  data() {
    return {
      openSimple: false
    };
  },
  methods: {
    openSimpleDialog() {
      this.openSimple = true;
    },
    closeSimpleDialog() {
      this.openSimple = false;
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.pur-bar {
  position: fixed;
  bottom: 0;
  z-index: 99;
  padding: 0;
}
</style>
