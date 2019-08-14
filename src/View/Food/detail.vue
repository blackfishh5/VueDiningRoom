<template>
  <div id="container" >
      <h2>书籍详情</h2>
        <div>
            {{msg.aladdin}}
        </div>
  </div>
</template>

<script>
export default {
    name:"Detail",
    data(){
        return {
            msg:''
        }
    },
    mounted(){
        var name = this.$route.params.name
        console.log('name' + name)
        this.axios.get('https://www.apiopen.top/novelInfoApi?name=' + name).then(res=>{
            if(res.data.code === 200){
                // console.log(res.data.data)
                this.msg = res.data && res.data.data;
                console.log(this.msg)
            }
        })
    }
}
</script>

<style scoped>
#container {
  width: 100%;
  height: 563px;
  margin: 56px auto;
  padding: 0;
}
</style>
