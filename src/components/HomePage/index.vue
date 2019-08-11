
<template>
  <div id="container">
    <h1>首页</h1>
    <button @touchstart="handleToFood">123</button>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {};
  },
  methods:{
    handleToFood(){
      console.log(123)
      this.$router.push('/food')
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
#container{
  width:100%;
  margin:56px auto;
  padding:0;
}
</style>
