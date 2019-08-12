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
      <mu-button icon slot="left" @touchstart="handleOpenList">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      <span>￥ {{$store.state.buyfood.tp}} </span>
      <mu-button flat slot="right" @touchstart="handleToPurchase">去结算</mu-button>
    </mu-appbar>
  </mu-container>
</template>

<script>
export default {
  name: "Shopcar",
  data() {
    return {
      open: false
    };
  },
  mounted() {
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
    }
  },
  filters: {
    filterPrice(val) {
      var val = parseFloat(val);
      if (!val) {
        return 0.0;
      } else {
        return val
      }
    }
  },
  methods: {
    handleOpenList() {
      console.log(this.open);
      this.open = !this.open;
    },
    handleToPurchase() {
      let newMenu = [];
      let newFoodNum = [];
      newMenu = this.menu.filter((item, index) => {
        if (this.foodNum[index] > 0) {
          return item;
        }
      });
      newFoodNum = this.foodNum.filter((item, index) => {
        if (this.foodNum[index] > 0) {
          return item;
        }
      });
      console.log(newMenu)
      console.log(newFoodNum)
      this.$nextTick(() => {
        this.$store.commit("buyfood/SET_BUTFOOD", {
          accMn: newMenu,
          accFn: newFoodNum
        });
        window.localStorage.setItem('accMn',JSON.stringify(newMenu))
        window.localStorage.setItem('accFn',JSON.stringify(newFoodNum))
        this.$router.push("/food/purchase");
      });

    },
    handleToAdd(index) {
      var num = this.foodNum[index];
      if (num >= 9) {
        num = 8;
      }
      this.foodNum.splice(index, 1, num + 1);
      this.$nextTick(() => {
        this.$store.commit("buyfood/SET_FOODNUM", { fn: this.foodNum });
        window.localStorage.setItem("fn", JSON.stringify(this.foodNum));
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

.demo-list-wrap {
  border-top: 1px solid #000;
  width: 100%;
}
.list {
  padding: 0;
}
.mu-transition-row {
  width: 100%;
}
.black-div {
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 700px;
}
</style>
