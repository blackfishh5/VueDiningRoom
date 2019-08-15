
<template>
  <mu-appbar class="pur-bar" style="width: 100%;">
    <span>￥ {{price}} </span>
    <mu-button flat slot="right" @touchstart.stop.prevent="openSimple = true">支付</mu-button>
    <mu-dialog title="Dialog" width="360" :open.sync="openSimple">
      本次订单需要支付：{{ price }} 元</br>
      确认支付吗？
      <mu-button slot="actions" flat color="primary" @touchstart.stop.prevent="openSimple = false">取消</mu-button>
      <mu-button slot="actions" flat color="primary" @touchstart.stop.prevent="handlePayMoney">确认支付</mu-button>
    </mu-dialog>
  </mu-appbar>
</template>

<script>
export default {
  name: "PurchaseBar",
  props: ["price", "username"],
  data() {
    return {
      openSimple: false
    };
  },
  methods: {
    handlePayMoney() {
      this.axios
        .post("/api2/users/consume", {
          username: this.username,
          paymoney: this.price
        })
        .then(res => {
          if (res.data.state === 0) {
            // console.log(res.data.msg)
            var money = res.data && res.data.data && res.data.data.money
            this.openSimple = false
            this.$emit('changeMoney',money)
          } else if(res.data.state === -2){
            console.log(res.data.msg)
          }
        });
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
