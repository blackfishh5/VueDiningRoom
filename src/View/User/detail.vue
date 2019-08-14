<template>
  <mu-container id="container">
    <mu-card style="width: 95%; max-width: 375px; margin: 0 auto;" raised>
      <header class="user-header">
        <div class="user-avator">
          <img src="../../assets/grass.jpg" alt="">
        </div>
        <div class="user-name">
          <div>{{realname}}</div>
          <p>{{username}}</p>
        </div>
        <div class="user-logout">
          <mu-button color="red" @touchstart="handleToExit" :ripple="false">退出</mu-button>
        </div>
      </header>
      <mu-appbar style="width: 100%;">
        您的余额：￥ {{money}}
      </mu-appbar>
      <mu-tabs :value.sync="active3" class="tab-btn" color="#fff">
        <mu-tab >
          <mu-icon value="phone" color="#666"></mu-icon>
          <p class="btn-name">充值</p>
        </mu-tab>
        <mu-tab>
          <mu-icon value="favorite" color="#666"></mu-icon>
          <p class="btn-name">收藏</p>
        </mu-tab>
        <mu-tab>
          <mu-icon value="person_pin" color="#666"></mu-icon>
          <p class="btn-name">评价</p>
        </mu-tab>
      </mu-tabs>
      <div class="demo-text" v-if="active3 === 0">
        <mu-form ref="form" :model="validateForm" class="mu-demo-form">
          <mu-form-item label="充值金额" help-text="充值金额不得超过500元" prop="recharge" >
            <mu-text-field v-model.number="validateForm.recharge" prop="recharge"></mu-text-field>
          </mu-form-item>
          <!-- <mu-form-item label="密码" prop="password" :rules="passwordRules">
            <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
          </mu-form-item> -->
          <mu-form-item>
            <mu-button v-loading="loadingBtn" data-mu-loading-size="24" color="primary" @touchstart="handleRecharge">确定充值</mu-button>
          </mu-form-item>
        </mu-form>
      </div>
      <div class="demo-text" v-if="active3 === 1">
        <p>“我的心从来没有这么坚定过，所以我会为了补偿而死，也可以为了补偿而死……一辈子，急辈子都无所谓，我绝不后退！”</p>
        <p>“如果我后退呢？如果我想要死呢？我不想你再次背对着我逃跑了……”</p>
        <p>“那么就去地狱找到你，我绝对不逃！”</p>
        <p>“白痴，你也哭了？因为那些软弱拖累你的脚步？”</p>
      </div>
      <div class="demo-text" v-if="active3 === 2">
        <p>“不，这泪水……是因为勇气，因为力量，因为信任，……你不会懂的！”</p>
        <p>“我不会帮你，想要什么样的未来……自己去追寻吧！”</p>
        <p>“我不需要你的帮忙！未来我会一手开启，什么样的敌人我也不会惧怕……还有，其实我们可以成为朋友的……”</p>
        <p>“也许吧，未来……给你了。”</p>
      </div>
      <!-- <mu-card-media title="Image Title" sub-title="Image Sub Title">
    <img src="../../assets/images/sun.jpg">
  </mu-card-media> -->
      <!-- <mu-card-title title="Content Title" sub-title="Content Title"></mu-card-title>
      <mu-card-text>
        散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
        调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
        似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
        找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
      </mu-card-text>
      <mu-card-actions>
        <mu-button flat>Action 1</mu-button>
        <mu-button flat>Action 2</mu-button>
      </mu-card-actions> -->
    </mu-card>
  </mu-container>
</template>

<script>
import axios from "axios";
export default {
  name: "UserDetail",
  data() {
    return {
      // limitRecharge: [
      //   { validate: (val) => !!val, message: '必须填写充值金额'},
      //   { validate: (val) => val <= 0, message: '充值金额必须大于0'},
      //   { validate: (val) => val > 500, message: '充值金额必须小于500'}
      // ],
      validateForm:{
        recharge: ""
      },
      username: "",
      realname: "",
      money: 0,
      active3: 0,
      loadingBtn:false
    };
  },
  methods: {
    handleToExit() {
      this.axios.get("/api2/users/logout").then(res => {
        if (res.data.state === 0) {
          this.$router.push("/user/login");
        }
      });
    },
    handleRecharge() {
      // console.log(typeof this.validateForm.recharge)
      // console.log(this.validateForm.recharge)
      if(this.validateForm.recharge <= 0 || this.validateForm.recharge > 500 || this.validateForm.recharge === ""){
        return
      }
      this.loadingBtn = true
      this.axios
        .post("/api2/users/recharge", {
          username: this.username,
          rechargemoney: this.validateForm.recharge
        })
        .then((res) => {
          if (res.data.state === 0) {
            this.money = res.data.data.money
            this.loadingBtn = false
          }
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    // 通过 `vm` 访问组件实例
    // console.log(123);
    axios.get("/api2/users/getUser").then(res => {
      var state = res.data.state;
      console.log(state);
      if (state === 0) {
        next(vm => {
          vm.username = res.data.data.username;
          vm.realname = res.data.data.realname;
          vm.money = res.data.data.money;
        });
      } else {
        next("/user/login");
      }
    });
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style  scoped>
#container {
  width: 100%;
  margin-top: 60px;
  padding: 0;
}
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
  color: #aaa;
}
.user-header .user-logout {
  line-height: 50px;
}

.demo-text {
  padding: 16px;
  background: #fff;
}
.demo-text p {
  margin: 8px;
}
.tab-btn {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
}
.btn-name {
  font-size: 10px;
  color: #000;
}
</style>
