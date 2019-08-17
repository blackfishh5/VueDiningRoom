<template>
  <div id="container">
    <mu-paper :z-depth="6">
      <mu-list textline="two-line">
        <mu-list-item class="list-item" v-for="(book,index) in menu" :key="index">
          <mu-list-item-action class="img-item" @touchstart="handleToFoodDetail(book.bookname)">
            <img :src="book.book_cover">
          </mu-list-item-action>
          <div style="line-height:28px;">
            <p>{{book.bookname | filterFoodName}}</p>
            <p class="money">￥ {{book.price}}</p>
          </div>
          <mu-list-item-action class="item">
            <mu-icon value="remove" color="red" @touchstart="handleToSubtract(index)"></mu-icon>
            <span class="number-show">{{foodNum[index]}}</span>
            <mu-icon value="add" color="blue" @touchstart="handleToAdd(index)"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
    </mu-paper>
  </div>
</template>

<script>
import { METHODS } from "http";
export default {
  name: "windowfood",
  data() {
    return {
      totalNum: 0, // 预定总个数
      totalPrice: 0, // 总价格
      menu: [], // 某个窗口下对应的菜单
      carShops: [], // 购物车商品
      foodNum: [], // 预定个数
      showNum: [] // 展示预定个数
    };
  },
  created() {
    this._datainit(this.$route.params.id);
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    openReflesh() {
      return this.$store.state.buyfood.openReflesh;
    }
  },
  watch: {
    id: function() {
      this._datainit(this.$route.params.id);
    },
    openReflesh: function() {
      console.log(this.openReflesh)
      if (!this.openReflesh) {
        this._datainit(this.$route.params.id);
      }
    }
  },
  filters: {
    filterFoodName(val) {
      return val;
    },
    filterNumber(val) {
      // console.log('val'+val)
      if (val === undefined) {
        return 0;
      } else {
        return val;
      }
    }
  },
  methods: {
    _datainit(id) {
      console.log('pppppppppppppppppppppppppppppppppppppppppppppp');
      this.axios.get("https://www.apiopen.top/novelApi").then(res => {
        if (res.data.code === 200) {
          this.menu = res.data.data;

          // 在初始化的时候记得好好处理，每一个菜单都要置数字
          // 窗口传id进来
          // var foodNum = JSON.parse(window.localStorage.getItem("fn"));
          console.log(window.localStorage.getItem("tp"));
          var tPrice = parseFloat(window.localStorage.getItem("tp"));
          console.log("tPrice"+tPrice)
          this.totalNum = window.localStorage.getItem("tn");
          if (tPrice) {
            this.totalPrice = tPrice;
            this.carShops = JSON.parse(window.localStorage.getItem("carShops"));
            console.log("this.carShops");
            console.log(this.carShops);
            for (let i = 0; i < this.menu.length; i++) {
              let name = this.menu[i].bookname;
              console.log(name);
              let index = this._getcarShopsIndex(name);
              console.log("index" + index);
              if (index !== -1) {
                this.foodNum[i] = this.carShops[index].number; // 用来初始化数据的
              } else {
                this.foodNum[i] = 0; // 用来初始化数据的
              }
            }
          } else {
            this.totalPrice = 0
            for (let i = 0; i < this.menu.length; i++) {
              this.foodNum[i] = 0; // 用来初始化数据的
            }
          }
          console.log(JSON.parse(window.localStorage.getItem("carShops")))
          console.log(this.foodNum);
          console.log(this.menu);
        }
      });
    },

    handleToFoodDetail(name) {
      // console.log(12332112312)
      this.$router.push(`/food/detail/${name}`);
    },

    /**
     * 增加和减少
     */
    handleToAdd(index) {
      // console.log('add'+index)
      var foodMsg = this.menu[index];
      var name = foodMsg.bookname; // 可能出现同名情况，但是真实数据中会根据id

      for (var i = 0; i < this.carShops.length; i++) {
        if (this.carShops[i].foodName === name) {
          let number = this.carShops[i].number;
          if (number >= 5) {
            return;
          }
          ++number;
          this.carShops[i].number = number;
          this.foodNum.splice(index, 1, number);
          this.totalNum++;
          this.totalPrice += parseFloat(foodMsg.price);
          this._setDataToStorage();

          console.log(this.foodNum);
          return;
        }
      }
      var newFood = Object.assign(
        {},
        {
          id: foodMsg.bid,
          foodName: foodMsg.bookname,
          price: foodMsg.price,
          foodImg: foodMsg.book_cover,
          number: 1
        }
      );
      this.foodNum.splice(index, 1, 1);
      this.totalNum++;
      this.carShops.push(newFood);
      this.totalPrice += parseFloat(foodMsg.price);
      this._setDataToStorage();

      console.log("carShops");
      console.log(this.totalPrice)
      console.log(this.carShops);
      console.log(this.foodNum);
    },
    handleToSubtract(index) {
      // console.log('subtract'+index)
      var foodMsg = this.menu[index];
      var name = foodMsg.bookname; // 可能出现同名情况，但是真实数据中会根据id

      for (var i = 0; i < this.carShops.length; i++) {
        if (this.carShops[i].foodName === name) {
          let number = this.carShops[i].number;
          // number = number <= 0 ? number : --number;
          this.carShops[i].number = --number;

          this.totalNum--;
          this.foodNum.splice(index, 1, number);
          this.totalPrice -= parseFloat(foodMsg.price);
          if (number <= 0) {
            this.carShops.splice(i, 1);
          }
          this._setDataToStorage();

          console.log("carShops");
          console.log(this.totalPrice)
          console.log(this.carShops);
          console.log(this.foodNum);
          return;
        }
      }
    },

    // 代码处理封装成函数
    _getcarShopsIndex(name) {
      for (let i = 0; i < this.carShops.length; i++) {
        if (this.carShops[i].foodName === name) {
          return i;
        }
      }
      return -1;
    },
    _setDataToStorage() {
      this.$store.commit("buyfood/SET_PRICE", { tp: this.totalPrice });
      window.localStorage.setItem("tp", this.totalPrice);
      this.$store.commit("buyfood/SET_NUM", { tn: this.totalNum });
      window.localStorage.setItem("tn", this.totalNum);
      this.$store.commit("buyfood/SET_CARSHOP", {
        carShops: this.carShops
      });
      window.localStorage.setItem("carShops", JSON.stringify(this.carShops));
    }
  }
};
</script>

<style scoped>
#container {
  margin-top: 20px;
}

img {
  width: 100%;
  height: 100%;
}
.list-item .img-item {
  width: 56px;
  height: 56px;
  margin-right: 10px;
}

.money {
  color: rgb(196, 145, 51);
}
.item {
  position: absolute;
  right: 10px;
  height: 28px;
  text-align: right;
  flex-direction: row;
  padding: 0;
}
.number-show {
  font-size: 14px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
