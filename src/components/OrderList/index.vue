
<template>
  <mu-container id="container">
    <mu-card style="width: 95%; max-width: 375px; margin: 0 auto;" raised>
      <header class="user-header">
        <div class="user-avator">
          <img src="../../assets/grass.jpg" alt="">
        </div>
        <div class="user-name">
          <div>{{realname | filterName}}</div>
          <p>{{username | filterSubName}}</p>
        </div>
        <div v-if="!isLogin" class="user-logout">
          <mu-button color="red" @touchstart="handleToLogin" :ripple="false">去登陆</mu-button>
        </div>
      </header>
      <!-- <mu-card-media title="Image Title" sub-title="Image Sub Title"> -->
      <!-- <img src="../../assets/images/sun.jpg"> -->
      <!-- </!-->
      <mu-card-title title="订单列表" style="border-top:1px solid #aaa; border-bottom:1px solid #aaa;"></mu-card-title>
      <!-- <mu-card-text>
        散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
        调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
        似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
        找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
      </mu-card-text>
      <mu-card-actions>
        <mu-button flat>Action 1</mu-button>
        <mu-button flat>Action 2</mu-button>
      </mu-card-actions> -->
      <mu-container class="panel-container">
        <mu-expansion-panel :expand="panel === 'panel1'" @change="toggle('panel1')" class="panel-list">
          <div slot="header">梅园食堂</div>
          <mu-list >
            <mu-sub-header>Today</mu-sub-header>
            <mu-list-item avatar button :ripple="false">
              <mu-list-item-action>
                <mu-avatar>
                  <img src="../../assets/grass.jpg">
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-title>Mike Li</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value="chat_bubble"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
            <mu-list-item avatar button :ripple="false">
              <mu-list-item-action>
                <mu-avatar>
                  <img src="../../assets/grass.jpg">
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-title>Mike Li</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value="chat_bubble"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
            <mu-list-item avatar button :ripple="false">
              <mu-list-item-action>
                <mu-avatar>
                  <img src="../../assets/grass.jpg">
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-title>Mike Li</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value="chat_bubble"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
          </mu-list>
        </mu-expansion-panel>
        <mu-expansion-panel :expand="panel === 'panel2'" @change="toggle('panel2')" class="panel-list">
          <div slot="header">Panel 2</div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
        </mu-expansion-panel>
        <mu-expansion-panel :expand="panel === 'panel3'" @change="toggle('panel3')" class="panel-list">
          <div slot="header">Panel 3</div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
        </mu-expansion-panel>
      </mu-container>

    </mu-card>
  </mu-container>
</template>

<script>
export default {
  name: "OrderList",
  data() {
    return {
      username: "",
      realname: "",
      isLogin: false,
      panel: ""
    };
  },
  created() {
    this.axios.get("/api2/users/getuser").then(res => {
      if (res.data.state === 0) {
        console.log(res.data.data);
        var data = res.data && res.data.data;
        this.isLogin = true;
        this.username = data.username;
        this.realname = data.realname;
      }
    });
  },
  filters: {
    filterName(val) {
      if (!val) {
        return "未登录";
      }
      return val;
    },
    filterSubName(val) {
      if (!val) {
        return "请前往登陆页面";
      }
      return val;
    }
  },
  methods: {
    handleToLogin() {
      this.$router.push("/user/login");
    },
    toggle(panel) {
      this.panel = panel === this.panel ? "" : panel;
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
#container {
  width: 100%;
  margin: 56px auto;
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

.panel-container {
  margin: 20px auto;
}
.panel-container .panel-list {
  margin-bottom: 10px;
}
</style>
