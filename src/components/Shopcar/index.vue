<template>
  <mu-container class="shopcar">

    <!-- <mu-expand-transition>
      <mu-bottom-sheet class="sheet" :open.sync="open" :overlay-opacity="0.1">
        <mu-list>
          <mu-sub-header>
            <mu-list>
              <mu-list-item>
                <mu-list-item-content>
                  <mu-list-item-title>已选商品</mu-list-item-title>
                </mu-list-item-content>
                <mu-list-item-action>
                  <mu-button flat @touchstart="handleToClear">
                    清空
                    <mu-icon right value="delete"></mu-icon>
                  </mu-button>
                </mu-list-item-action>
              </mu-list-item>
            </mu-list>
          </mu-sub-header>

          <mu-list-item v-for="(food,index) in $store.state.buyfood.mn" :key="index" v-if="foodNum[index]">
            <mu-list-item-title>{{food.bookname}}</mu-list-item-title>
            <mu-list-item-action class="item">
              <span>￥{{food.price*foodNum[index] | filterPrice}}</span>
              <mu-icon value="remove" color="red" @touchstart="handleToSubtract(index)"></mu-icon>
              <span class="num">{{foodNum[index]}}</span>
              <mu-icon value="add" color="blue" @touchstart="handleToAdd(index)"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>
    </mu-expand-transition> -->
    <mu-flex class="mu-transition-row">
      <mu-fade-transition>
        <div class="black-div" v-show="open" ></div>
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
            <mu-list-item v-for="(food,index) in $store.state.buyfood.mn" :key="index" v-if="foodNum[index]">
              <mu-list-item-title>{{food.bookname}}</mu-list-item-title>
              <mu-list-item-action class="item">
                <span>￥{{food.price*foodNum[index] | filterPrice}}</span>
                <mu-icon value="remove" color="red" @touchstart="handleToSubtract(index)"></mu-icon>
                <span class="num">{{foodNum[index]}}</span>
                <mu-icon value="add" color="blue" @touchstart="handleToAdd(index)"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
          </mu-list>
        </mu-paper>
      </mu-expand-transition>
    </mu-flex>

    <mu-appbar style="width: 100%;">
      <mu-badge v-if="total" :content="total | filterTotal" circle color="secondary" slot="left" style="z-index:999;">
        <mu-button icon @touchstart="handleOpenList">
          <mu-icon value="shopping_cart"></mu-icon>
        </mu-button>
      </mu-badge>

      <span>￥ {{$store.state.buyfood.tp}} </span>
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
      open: false
    };
  },
  mounted(){
    var that = this; //this的指向问题
    document.addEventListener("touchstart", function(e) {
      if (e.target.className === "black-div") {
        that.open = false; //这里that代表组件，this代表document
      }
    });
  },
  watch: {
    foodNum() {
      var total = 0;
      for (let i = 0; i < this.foodNum.length; i++) {
        total += this.foodNum[i] * this.menu[i].price;
      }
      this.$store.commit("buyfood/SET_PRICE", { tp: total });
      window.localStorage.setItem("tp", total);
    }
  },
  computed: {
    menu() {
      return this.$store.state.buyfood.mn;
    },
    foodNum() {
      return this.$store.state.buyfood.fn;
    },
    total() {
      return this.$store.state.buyfood.tn;
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
    filterTotal(val){
      return val.toString()
    }
  },
  methods: {
    handleOpenList() {
      this.open = !this.open;
      console.log(this.open)
    },
    handleToPurchase() {
      if (this.username) {
        // 如果有用户，则处理点餐情况并传至订单详情页
        var accFn = [],
          accMn = [];
        for (var i = 0; i < this.foodNum.length; i++) {
          if (this.foodNum[i]) {
            accFn.push(this.foodNum[i]);
            accMn.push(this.menu[i]);
            this.$store.commit("buyfood/SET_BUTFOOD", { accMn, accFn });
            window.localStorage.setItem("accMn", JSON.stringify(accMn));
            window.localStorage.setItem("accFn", JSON.stringify(accFn));
          }
        }
        this.$router.push("/food/purchase");
      } else {
        this.$router.push({ name: "loginPage", params: { type: 2 } });
      }
    },
    handleToAdd(index) {
      // console.log('add'+index)
      var num = this.foodNum[index];
      if (num >= 9) {
        num = 8;
      }
      // this.foodNum.splice(index, 1, num + 1);
      // this.$store.commit("buyfood/SET_FOODNUM", { fn: this.foodNum });

      console.log(index);
      this.foodNum.splice(index, 1, num + 1);
      this.$nextTick(() => {
        this.$store.commit("buyfood/SET_FOODNUM", { fn: this.foodNum });
        window.localStorage.setItem("fn", JSON.stringify(this.foodNum));
        this.total++;
        this.$store.commit("buyfood/SET_NUM", { tn: this.total });
        window.localStorage.setItem("tn", this.total);
      });

      // console.log(this.foodNum)
    },
    handleToSubtract(index) {
      // console.log('subtract'+index)
      var num = this.foodNum[index];
      if (num <= 0) {
        num = 1;
      }
      // this.foodNum.splice(index, 1, num - 1);
      // this.$store.commit("buyfood/SET_FOODNUM", { fn: this.foodNum });

      console.log(index);
      this.foodNum.splice(index, 1, num - 1);
      this.$nextTick(() => {
        this.$store.commit("buyfood/SET_FOODNUM", { fn: this.foodNum });
        window.localStorage.setItem("fn", JSON.stringify(this.foodNum));
        this.total--;
        this.$store.commit("buyfood/SET_NUM", { tn: this.total });
        window.localStorage.setItem("tn", this.total);
      });
    },
    handleToClear() {
      for (let i = 0; i < this.foodNum.length; i++) {
        this.foodNum.splice(i, 1, 0);
      }
      this.$store.commit("buyfood/SET_FOODNUM", { fn: this.foodNum });
      this.$store.commit("buyfood/SET_PRICE", { tp: 0 });
      window.localStorage.setItem("fn", JSON.stringify(this.foodNum));
      window.localStorage.setItem("tp", 0);
      this.$store.commit("buyfood/SET_NUM", { tn: 0 });
      window.localStorage.setItem("tn", 0);
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
.mu-transition-row{
  width:100%;
}
.mu-paper{
  width:100%;
}
.black-div{
  width:100%;
  height:600px;
  background: rgba(0,0,0,0.1);
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
