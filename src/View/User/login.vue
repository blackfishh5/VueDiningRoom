<template>
  <mu-container id="container">
    <mu-card style="width: 97%; max-width: 375px; margin: 0 auto;" raised>
      <mu-card-header>
        <h2>登陆界面</h2>
      </mu-card-header>
      <mu-form :model="form" ref="form" class="mu-demo-form" :label-position="labelPosition" label-width="100">
        <mu-form-item prop="username" label="username">
          <mu-text-field v-model.trim="form.username"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="password" label="password">
          <mu-text-field v-model.trim="form.password" :action-icon="visibility ? 'visibility_off' : 'visibility'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'"></mu-text-field><br />
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="handleSubmit">提交</mu-button>
          <mu-button @touchstart="handleClear">重置</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-card>
  </mu-container>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      labelPosition: "top",
      visibility: false
    };
  },
  methods: {
    handleSubmit() {
      // if( !this.form.username || !this.form.password ){
      //   console.log("wgnmd")
      // }
      this.axios
        .post("/api2/users/login", {
          username: this.form.username,
          password: this.form.password
        })
        .then((res) => {
          if (res.data.state === 0) {
            // console.log(res.data.msg);
            this.$router.push('/user/detail')
          }
        });
    },
    handleClear() {
      this.$refs.form.clear();
      this.form = {
        username: "",
        password: ""
      };
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
#container {
  width: 100%;
  margin: 65px auto;
  padding: 0;
}

.mu-demo-form {
  width: 90%;
  max-width: 480px;
  margin: 0 auto;
}
</style>
