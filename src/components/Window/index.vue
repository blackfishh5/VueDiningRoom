<template>
  <mu-container id="container" class="container" ref="container">
    <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;" :raised="false">
      <header class="user-header">
        <div class="user-avator">
          <img src="../../assets/grass.jpg" alt="">
        </div>
        <div class="user-name">
          <div>{{realname | filterUserName}}</div>
          <p>￥ {{money}}</p>
        </div>
        <div v-if="!isLogin" class="user-logout">
          <mu-button color="red" @touchstart="handleToLogin" :ripple="false">去登陆</mu-button>
        </div>
      </header>
      <mu-card-media title="Image Title" sub-title="Image Sub Title">
        <img src="../../assets/temp.jpg">
      </mu-card-media>
      <mu-card-title title="Content Title" sub-title="Content Title"></mu-card-title>

      <div class="list-container">
        <mu-paper class="left-list" ref="leftwrapper">
          <mu-list :value="pageid">
            <mu-list-item @touchstart="activeBtn = 1" :value="1" button :ripple="false" :to="{name:'ooo',params:{id:1}}">
              <mu-list-item-title class="list-title">All mail</mu-list-item-title>
            </mu-list-item>
            <mu-list-item @touchstart="activeBtn = 2" :value="2" button :ripple="false" :to="{name:'ooo',params:{id:2}}">
              <mu-list-item-title class="list-title">Trash</mu-list-item-title>
            </mu-list-item>
            <mu-list-item @touchstart="activeBtn = 3" :value="3" button :ripple="false" :to="{name:'ooo',params:{id:3}}">
              <mu-list-item-title class="list-title">Spam</mu-list-item-title>
            </mu-list-item>
            <mu-list-item @touchstart="activeBtn = 4" :value="4" button :ripple="false" :to="{name:'ooo',params:{id:4}}">
              <mu-list-item-title class="list-title">Follow up</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-paper>
        <div class="right-list" ref="rightwrapper">
          <div>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
        </div>
      </div>
    </mu-card>
    <Shopcar :username="username"></Shopcar>
  </mu-container>

</template>
<script>
import BScroll from "better-scroll";
import Shopcar from "@/components/Shopcar";
import { type } from "os";

export default {
  name: "Window",
  components: { Shopcar },
  data() {
    return {
      isLogin: false,
      realname: "",
      username: "",
      money: 0,

      activeBtn: 1,
      // buttonNav: 1,
      flag: false // 用于滑动解锁 和 加锁
    };
  },
  filters: {
    filterUserName(val) {
      if (!val) {
        return "未登录";
      }
      return val;
    }
  },
  created() {
    this.axios.get("/api2/users/getuser").then(res => {
      if (res.data.state === 0) {
        // console.log(res.data.data);
        var data = res.data && res.data.data;
        this.isLogin = true;
        this.realname = data.realname;
        this.username = data.username;
        this.money = data.money;
      }
    });
  },
  mounted() {
    this.contScroll = this.leftScroll = new BScroll(this.$refs.container, {
      tap: true,
      click: true,
      probeType: 2,
      bounce: {
        bottom: false
      }
    });
    this.leftScroll = new BScroll(this.$refs.leftwrapper, {
      tap: true,
      click: true,
      probeType: 1
    });
    this.rightScroll = new BScroll(this.$refs.rightwrapper, {
      tap: true,
      click: true,
      probeType: 2,
      bounce: false
      // preventDefault:false
    });

    this.handleScroll();
  },
  computed: {
    pageid() {
      return this.$route.params.id;
    }
  },
  methods: {
    /**
     * 用户处理函数
     */
    handleToLogin() {
      this.$router.push({ name: "loginPage", params: { type: 1 } });
    },

    /**
     * 选购处理函数
     */
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

    onclickFN() {
      console.log(123);
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

/* 用户信息头部 */
.user-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
}
.user-header .user-avator {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}
.user-header .user-avator img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.user-header .user-name {
  flex: 1;
  font-family: Arial, Helvetica, sans-serif;
}
.user-header .user-name div {
  font-size: 20px;
}
.user-header .user-name p {
  font-size: 13 px;
  color: brown;
}
.user-header .user-login {
  line-height: 50px;
}

/* 各种菜 */

.list-container {
  display: flex;
  height: 563px;
  overflow: hidden;
}

.left-list {
  width: 100px;
  max-width: 120px;
  height: 100%;
}

.list-title {
  font-size: 12px;
}
.right-list {
  flex: 1;
  height: 100%;
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
</style>

