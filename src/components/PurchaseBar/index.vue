
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
  props: ["price", "username","userid"],
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
            var money = res.data && res.data.data && res.data.data.money
            this.openSimple = false
            this.$emit('changeMoney',money)

             // 如果支付成功
             this.$toast.success(res.data.msg)
            var carShops = this.$store.state.buyfood.carShops;
            var length = carShops.length;
            var arrFood =[]
            for(let index = 0; index<length;index++){
              arrFood.push({
                id:carShops[index].id,
                foodImg:carShops[index].foodImg,
                foodName:carShops[index].foodName,
                num:carShops[index].number,
                foodPrice:carShops[index].number*carShops[index].price
              })
            }

            var orderData = {
              diningroom:"梅园食堂",
              food:arrFood,
              time:new Date(),
              totalprice:this.$store.state.buyfood.tp,
              userid:this.userid
            }

            this.axios.post("/api2/orders/save",orderData).then(res=>{
              if(res.data.state === 0){
                console.log(res.data.msg)
                window.localStorage.clear();
                this.$store.dispatch("buyfood/clearData");
                this.$router.push("/order")
              }
            })

          } else{
            this.$toast.error(res.data.msg)
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
