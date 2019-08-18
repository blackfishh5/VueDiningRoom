<template>
  <mu-container class="shopcar">
    <mu-flex class="mu-transition-row">
      <mu-fade-transition>
        <div class="black-div" v-show="open"></div>
      </mu-fade-transition>
    </mu-flex>
    <mu-flex class="mu-transition-row">
      <mu-expand-transition>
        <mu-paper :z-depth="1" class="demo-list-wrap" v-show="open">
          <mu-appbar color="#fff">
            <span style="color:#000;">已选商品</span>
            <mu-button flat slot="right" color="#000" @touchstart="handleToClear">
              清空
              <mu-icon right value="delete"></mu-icon>
            </mu-button>
          </mu-appbar>
          <mu-list class="list">
            <mu-list-item v-for="(food,index) in $store.state.buyfood.carShops" :key="index">
              <mu-list-item-title>{{food.foodName}}</mu-list-item-title>
              <mu-list-item-action class="item">
                <span>￥{{food.price*food.number | filterPrice}}</span>
                <mu-icon value="remove" color="red" @touchstart.stop="handleToSubtract(index)"></mu-icon>
                <span class="num">{{food.number}}</span>
                <mu-icon value="add" color="blue" @touchstart.stop="handleToAdd(index)"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
          </mu-list>
        </mu-paper>
      </mu-expand-transition>
    </mu-flex>

    <mu-appbar style="width: 100%;">
      <mu-badge v-if="totalNum" :content="totalNum | filterTotal" circle color="secondary" slot="left" style="z-index:999;">
        <mu-button icon @touchstart="handleOpenList">
          <mu-icon value="shopping_cart"></mu-icon>
        </mu-button>
      </mu-badge>

      <span>￥ {{totalPrice}} </span>
      <mu-button flat slot="right" @touchstart="handleToPurchase">去结算</mu-button>
    </mu-appbar>
  </mu-container>
</template>

<script>
export default {
  name: "Shopcar",
  props: ["username"],
  data() {
    return {
      open: false,
      changeObj: {}
    };
  },
  mounted() {
    var that = this; //this的指向问题
    document.addEventListener("touchstart", function(e) {
      if (e.target.className === "black-div") {
        that.open = false; //这里that代表组件，this代表document
        that.$store.commit("buyfood/SET_OPENREFLESH", {
          openReflesh: that.open
        });
      }
    });
  },
  computed: {
    carShops() {
      return this.$store.state.buyfood.carShops;
    },
    totalNum() {
      return this.$store.state.buyfood.tn;
    },
    totalPrice() {
      console.log('this.$store.state.buyfood.tp')
      console.log(this.$store.state.buyfood.tp)
      return this.$store.state.buyfood.tp;
    }
  },

  filters: {
    filterPrice(val) {
      var val = parseFloat(val);
      if (!val) {
        return 0.0;
      } else {
        return val.toFixed(1);
      }
    },
    filterTotal(val) {
      var val = parseFloat(val);
      if (!val) {
        return "";
      }
      return val.toString();
    }
  },
  methods: {
    handleOpenList() {
      this.open = !this.open;
      this.$store.commit("buyfood/SET_OPENREFLESH", { openReflesh: this.open });
      console.log(this.open);
    },
    handleToPurchase() {
      if (this.username) {
        // 如果有用户，则处理点餐情况并传至订单详情页
        if (!this.carShops.length) {
          this.$toast.warning('购物车不能为空')
          return;
        }
        this.$router.push({ name: "purchase" });
      } else {
        this.$router.push({ name: "loginPage", params: { type: 2 } });
      }
    },
    handleToAdd(i) {
      let number = this.carShops[i].number;
      if (number >= 5) {
        return;
      } else {
        console.log("add");
        ++number;
        this.$set(this.carShops[i], "number", number);
        console.log(this.carShops);
        this.changeObj = Object.assign({}, this.carShops[i]);

        this.$store.commit("buyfood/SET_CARSHOP", {
          carShops: this.carShops
        });
        window.localStorage.setItem("carShops", JSON.stringify(this.carShops));
      }
    },
    handleToSubtract(i) {
      let number = this.carShops[i].number;
      console.log("number");
      --number;
      // Vue.set(vm.carShops[i], 'name', '新的值')
      this.$set(this.carShops[i], "number", number);
      console.log(this.carShops);
      this.changeObj = Object.assign({}, this.carShops[i]);
      if (number <= 0) {
        this.carShops.splice(i, 1);
      }

      this.$store.commit("buyfood/SET_CARSHOP", {
        carShops: this.carShops
      });
      window.localStorage.setItem("carShops", JSON.stringify(this.carShops));
    },
    handleToClear() {
      this.carShops.splice(0, this.carShops.length);
      console.log(this.carShops)
      this.changeObj = {}
      this.$store.commit("buyfood/SET_CARSHOP", {
        carShops: this.carShops
      });
      window.localStorage.setItem("carShops", JSON.stringify(this.carShops));
      this.$store.commit("buyfood/SET_PRICE", { tp: 0 });
      window.localStorage.setItem("tp", 0);
      this.$store.commit("buyfood/SET_NUM", { tn: 0 });
      window.localStorage.setItem("tn", 0);
    }
  },
  watch: {
    changeObj() {
      console.log(123312321321);
      let tPrice = 0,
        tNum = 0;
      for (let item of this.carShops) {
        tNum += item.number;
        tPrice += item.price * item.number;
      }
      window.localStorage.clear()
      this.$store.commit("buyfood/SET_PRICE", { tp: tPrice });
      window.localStorage.setItem("tp", tPrice);
      this.$store.commit("buyfood/SET_NUM", { tn: tNum });
      window.localStorage.setItem("tn", tNum);
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.shopcar {
  position: fixed;
  bottom: 0;
  z-index: 99;
  padding: 0;
}

/* 折叠框 */
.mu-transition-row {
  width: 100%;
}
.mu-paper {
  width: 100%;
}
.black-div {
  width: 100%;
  height: 600px;
  background: rgba(0, 0, 0, 0.1);
}

span {
  color: red;
  font-size: 16px;
}
span.num {
  color: #000;
}
.price {
  color: red;
}
.sheet {
  margin-bottom: 56px;
}
.mu-item-title {
  flex: 1;
}
.item {
  flex: 1;
  flex-direction: row;
}
</style>
