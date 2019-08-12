<template>
  <mu-container class="shopcar">
    <mu-appbar style="width: 100%;">
      <mu-button icon slot="left" @touchstart="handleOpenList">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      <span>￥ {{$store.state.buyfood.tp}} </span>
      <mu-button flat slot="right" @touchstart="handleToPurchase">去结算</mu-button>
    </mu-appbar>
    <mu-expand-transition>
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
    </mu-expand-transition>
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
  computed:{

    menu(){
      return this.$store.state.buyfood.mn
    },
    foodNum(){
      return this.$store.state.buyfood.fn
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
    }
  },
  methods: {
    handleOpenList() {
      this.open = true;
    },
    handleToPurchase() {
      this.$router.push("/food/purchase");
    },
    handleToAdd(index) {
      // console.log('add'+index)
      var num = this.foodNum[index];
      if (num >= 9) {
        num = 8;
      }
      // this.foodNum.splice(index, 1, num + 1);
      // this.$store.commit("buyfood/SET_FOODNUM", { fn: this.foodNum });
     
      console.log(index)
      this.foodNum.splice(index, 1, num + 1);
      this.$nextTick(()=>{
        this.$store.commit("buyfood/SET_FOODNUM", { fn: this.foodNum })
        window.localStorage.setItem("fn", JSON.stringify(this.foodNum));
      })
      
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
      
      console.log(index)
      this.foodNum.splice(index, 1, num - 1);
      this.$nextTick(()=>{
        this.$store.commit("buyfood/SET_FOODNUM", { fn: this.foodNum })
        window.localStorage.setItem("fn", JSON.stringify(this.foodNum));
      })
    },
    handleToClear(){
      for(let i = 0;i<this.foodNum.length;i++){
        this.foodNum.splice(i, 1, 0);
      }
      this.$store.commit("buyfood/SET_FOODNUM", { fn: this.foodNum});
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
</style>
