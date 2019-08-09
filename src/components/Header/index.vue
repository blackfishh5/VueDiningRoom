<template>
  <mu-appbar class='head' color="primary">{{title}}</mu-appbar>
</template>
<script>
export default {
  name: 'Header',
  props:['title']
};
</script>

<style scoped>
.head{
  position:fixed;
  top:0;
  width: 100%;
  text-align: center;
}
</style>


