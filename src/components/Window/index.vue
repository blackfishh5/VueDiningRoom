<template>
  <mu-container id="container" class="container" ref="container">
    <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;" :raised="false">
      <mu-card-header title="Myron Avatar" sub-title="sub title">
        <mu-avatar slot="avatar">
          <!-- <img src="../../assets/images/uicon.jpg"> -->
        </mu-avatar>
      </mu-card-header>
      <mu-card-media title="Image Title" sub-title="Image Sub Title">
        <img src="../../assets/temp.jpg">
      </mu-card-media>
      <mu-card-title title="Content Title" sub-title="Content Title"></mu-card-title>

      <div class="list-container">
        <mu-paper class="left-list" ref="leftwrapper">
          <mu-list>
            <mu-list-item button>
              <mu-list-item-title class="list-title">鸭血粉丝</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button>
              <mu-list-item-title class="list-title">水煮江湖</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button>
              <mu-list-item-title class="list-title">饺子混沌</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button>
              <mu-list-item-title class="list-title">锡纸饭</mu-list-item-title>
            </mu-list-item>

          </mu-list>
        </mu-paper>
        <mu-paper :z-depth="6" class="right-list" ref="rightwrapper">
          <mu-list textline="two-line">
            <mu-list-item class="list-item" v-for="(book,index) in menu" :key="index">
              <mu-list-item-action class="img-item" @touchstart="handleToFoodDetail(book.bookname)">
                <img :src="book.book_cover">
              </mu-list-item-action>
              <div style="line-height:28px;">
                <p>{{book.bookname | filterName}}</p>
                <p class="money">￥ {{book.price}}</p>
              </div>
              <mu-list-item-action class="item">
                <mu-icon value="remove" color="red" @touchstart="handleToSubtract(index)"></mu-icon>
                <span class="number-show">{{$store.state.buyfood.fn[index]}}</span>
                <mu-icon value="add" color="blue" @touchstart="handleToAdd(index)"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>

          </mu-list>
        </mu-paper>
      </div>
    </mu-card>
    <Shopcar></Shopcar>
  </mu-container>

</template>
<script>
import BScroll from "better-scroll";
import Shopcar from "@/components/Shopcar";

export default {
  name: "Window",
  components: { Shopcar },
  data() {
    return {
      menu: [],
      flag: false, // 用于滑动解锁 和 加锁
      listTitle: [],
      foodNum:[],  // 预定个数
      showNum:[]  // 展示预定个数
    };
  },
  filters: {
    filterName(val) {
      return val.slice(0, 6);
    },
    filterNumber(val){
      // console.log('val'+val)
      if(val === undefined){
        return 0
      }else{
        return val
      }
    }
  },
  created() {
    this.axios.get("https://www.apiopen.top/novelApi").then(res => {
      if (res.data.code === 200) {
        this.menu = res.data.data;
        for(let i = 0;i<this.menu.length;i++){
          this.foodNum[i] = 0;
        }
        // console.log(this.menu);
        this.$store.commit('buyfood/SET_MENU',{mn:this.menu})
        this.$store.commit('buyfood/SET_FOODNUM',{fn: this.foodNum})
        window.localStorage.setItem('mn',JSON.stringify(this.menu))
        window.localStorage.setItem('fn',JSON.stringify(this.foodNum))
        console.log(this.$store.state.buyfood.mn);
      }
    });
  },
  mounted() {
    this.contScroll = this.leftScroll = new BScroll(this.$refs.container, {
      tap: true,
      probeType: 2,
      bounce: {
        bottom: false
      }
    });
    this.leftScroll = new BScroll(this.$refs.leftwrapper, {
      tap: true,
      probeType: 1
    });
    this.rightScroll = new BScroll(this.$refs.rightwrapper, {
      tap: true,
      probeType: 2,
      bounce: false
      // preventDefault:false
    });

    this.handleScroll();
    // this.listTitle = document.querySelectorAll('list-title')
  },
  watch:{
    foodNum(){
      var total = 0;
      for(let i = 0;i<this.foodNum.length;i++){
        total += this.foodNum[i]*this.menu[i].price
      }
      this.$store.commit('buyfood/SET_PRICE',{tp:total})
      window.localStorage.setItem('tp',total)
    }
  },
  methods: {
    handleScroll() {
      this.contScroll.on("scroll", pos => {
        // console.log("container1111111111111111111111" + pos.y);
        if ((pos.y <= -290 && !this.flag) || (pos.y <= -380 && !this.flag)) {
          this.contScroll.disable();
          this.contScroll.scrollTo(0, -380);
          this.leftScroll.enable();
          this.rightScroll.enable();
        }
      });
      this.contScroll.on("touchEnd", pos => {
        this.flag = false;
        this.leftScroll.enable();
        this.rightScroll.enable();
      });
      this.rightScroll.on("scroll", pos => {
        if (pos.y < -5) {
          this.contScroll.disable();
          this.contScroll.scrollTo(0, -380);
        }
        if (pos.y >= 0 && !this.contScroll.enabled) {
          if (this.flag) {
            this.rightScroll.disable();
            this.leftScroll.disable();
            this.contScroll.enable();
            this.contScroll.scrollTo(0, -379);
          }
          this.rightScroll.stop();
        } else {
          this.flag = false;
        }
      });
      this.rightScroll.on("touchEnd", pos => {
        if (pos.y >= 0) {
          // console.log("flag" + this.flag);
          this.flag = true;
        }
      });
    },

    handleToFoodDetail(name){
      // console.log(12332112312)
      this.$router.push(`/food/detail/${name}`)
    },

    handleToAdd(index){
      // console.log('add'+index)
      var num = this.foodNum[index]
      if(num >= 9){
        num = 8
      }
      this.foodNum.splice(index, 1, num+1);
      this.$store.commit('buyfood/SET_FOODNUM',{fn: this.foodNum})
      window.localStorage.setItem('fn',JSON.stringify(this.foodNum))

    },
    handleToSubtract(index){
      // console.log('subtract'+index)
      var num = this.foodNum[index]
      if(num <= 0){
        num = 1
      }
      this.foodNum.splice(index, 1, num-1);
      this.$store.commit('buyfood/SET_FOODNUM',{fn:this.foodNum})
      window.localStorage.setItem('fn',JSON.stringify(this.foodNum))
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

img {
  width: 100%;
  height: 100%;
}
.list-container {
  display: flex;
  height: 563px;
  overflow: hidden;
}

.list-item .img-item {
  width: 56px;
  height: 56px;
  margin-right: 10px;
}
.left-list {
  max-width: 120px;
  height: 100%;
}
.right-list {
  flex: 1;
  height: 100%;
}
.list-title {
  font-size: 12px;
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
.btn {
  width: 20px;
  height: 20px;
  line-height: 20px;
  color: blue;
  margin-left: 10px;
  margin-right: 10px;
  border: 1px solid blue;
  border-radius: 50%;
}
.isActive {
  color: red;
}
.number-show {
  font-size: 14px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>

