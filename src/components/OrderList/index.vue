
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
        <div v-if="!isLogin" class="user-login">
          <mu-button color="red" @touchstart="handleToLogin" :ripple="false">去登陆</mu-button>
        </div>
      </header>
      <mu-card-title title="订单列表" style="border-top:1px solid #aaa; border-bottom:1px solid #aaa;"></mu-card-title>
      <mu-container class="panel-container">
        <mu-expansion-panel :expand="panel === 'panel1'" @change="toggle('panel1')" class="panel-list">
          <div slot="header" class="header-title">梅园食堂 <span>2019-08-15</span></div>
          <mu-list class="list">
            <mu-list-item avatar :ripple="false" >
              <mu-list-item-action>
                <mu-avatar>
                  <img src="../../assets/grass.jpg">
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-title>鸭血粉丝</mu-list-item-title>
              <mu-list-item-title style="text-align:center;">
                X 1
              </mu-list-item-title>
              <mu-list-item-action style="font-weight:bolder;color:#000;">
               ￥20
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider></mu-divider>
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
            <mu-divider></mu-divider>
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
            <mu-divider></mu-divider>
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
.user-header .user-login {
  line-height: 50px;
}

.panel-container {
  margin: 20px auto;
}
.panel-container .panel-list {
  margin-bottom: 10px;
  padding:0;
}

.header-title span{
  margin-left:20px;
}
.header-list{
  border-bottom:1px solid red;
}
</style>
