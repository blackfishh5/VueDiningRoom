<template>
  <mu-container class="container" ref="container">
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
              <mu-list-item-action class="img-item">
                <img :src="book.book_cover">
              </mu-list-item-action>
              <mu-list-item-title>{{book.bookname | filterName}}</mu-list-item-title>
              <mu-list-item-action>
                <span class="money">￥ 7.0</span>
              </mu-list-item-action>
              <mu-list-item-action>
                <mu-button icon color="primary">+</mu-button>
              </mu-list-item-action>
            </mu-list-item>
            <mu-list-item class="list-item" v-for="(book,index) in menu" :key="index">
              <mu-list-item-action class="img-item">
                <img :src="book.book_cover">
              </mu-list-item-action>
              <mu-list-item-title>{{book.bookname | filterName}}</mu-list-item-title>
              <mu-list-item-action>
                <span class="money">￥ 7.0</span>
              </mu-list-item-action>
              <mu-list-item-action>
                <mu-button icon color="primary">+</mu-button>
              </mu-list-item-action>
            </mu-list-item>
            <mu-list-item class="list-item" v-for="(book,index) in menu" :key="index">
              <mu-list-item-action class="img-item">
                <img :src="book.book_cover">
              </mu-list-item-action>
              <mu-list-item-title>{{book.bookname | filterName}}</mu-list-item-title>
              <mu-list-item-action>
                <span class="money">￥ 7.0</span>
              </mu-list-item-action>
              <mu-list-item-action>
                <mu-button icon color="primary">+</mu-button>
              </mu-list-item-action>
            </mu-list-item>
          </mu-list>
        </mu-paper>
      </div>
    </mu-card>
  </mu-container>
</template>
<script>
import BScroll from "better-scroll";

export default {
  name: "Window",
  data() {
    return {
      menu: [],
      flag: false, // 用于滑动解锁 和 加锁
      listTitle: []
    };
  },
  filters: {
    filterName(val) {
      return val.slice(0, 6);
    }
  },
  created() {
    this.axios.get("https://www.apiopen.top/novelApi").then(res => {
      if (res.data.code === 200) {
        this.menu = res.data.data;
        console.log(this.menu);
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

    this.handleScroll()
    // this.listTitle = document.querySelectorAll('list-title')
  },
  methods: {
    handleScroll() {
      this.contScroll.on("scroll", pos => {
        console.log("container1111111111111111111111" + pos.y);
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
      this.leftScroll.on("scroll", pos => {
        console.log("leftScroll" + pos);
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
          console.log("flag" + this.flag);
          this.flag = true;
        }
      });
    }
  }
};
</script>

<style scoped>
.container {
  padding: 0;
  height: 563px;
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

.isActive {
  color: red;
}
</style>

