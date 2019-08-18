
<template>
  <div id="container">
    <div>
      <h1>首页</h1>
      <mu-list>
        <mu-sub-header>Today</mu-sub-header>
        <mu-list-item avatar button v-for="(item,index) in dingningRome" :key="index" @click="handleToFood(item.dinninghallId)">
          <mu-list-item-action>
            <mu-avatar>
              <img :src="url + item.pictureUrl">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>{{item.name}}</mu-list-item-title>
          <mu-list-item-action @change="handleToFood(item.diningroomId)">
            <mu-icon value="chat_bubble"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      url:'',
      dingningRome: []
    };
  },
  created() {
    this.axios.get("/api/restaurant/list").then(res => {
      if (res.data.success) {
        console.log(res.data.data);
        this.url = "http://47.111.108.210:8080/restaurant/"
        this.dingningRome = res.data.data;
      }
    });
  },
  methods: {
    handleToFood(dinninghallId) {
      this.$router.push(`/food/${dinninghallId}`);
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
</style>
