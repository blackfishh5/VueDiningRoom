<template>
  <mu-container id="container">
    <mu-circular-progress  color="secondary" :stroke-width="5" :size="48"></mu-circular-progress>
  </mu-container>
</template>

<script>
export default {
    name:"LoadingPage",
};
</script>

<style  scoped>
#container{
    width:100%;
    height:563px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>>

