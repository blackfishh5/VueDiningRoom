<template>
  <mu-container class="container">
    <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;" :raised="false">
      <mu-card-header title="Myron Avatar" sub-title="sub title">
        <mu-avatar slot="avatar">
          <!-- <img src="../../assets/images/uicon.jpg"> -->
        </mu-avatar>
      </mu-card-header>
      <mu-card-media title="Image Title" sub-title="Image Sub Title">
        <img src="../../assets/temp.jpg">
      </mu-card-media>
      <mu-card-title title="Content Title" sub-title="Content Title"></mu-card-title>
    </mu-card>

    <div class="list-container">
      <mu-paper class="left-list">
        <mu-list>
          <mu-list-item button>
            <mu-list-item-title class="list-title">All mail</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title class="list-title">Trash</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title class="list-title">Spam</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title class="list-title">Follow up</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-paper>
      <mu-paper :z-depth="6" class="right-list">
        <mu-list textline="two-line">
          <mu-list-item button class="list-item">
            <img src="../../assets/grass.jpg">
            <span>鸭血粉丝</span>
            <span class="money">￥ 7.0</span>
            <mu-button fab small color="teal">
              <mu-icon value="add"></mu-icon>
            </mu-button>
          </mu-list-item>
          <mu-list-item button class="list-item">
            <img src="../../assets/grass.jpg">
            <span>鸭血粉丝</span>
          </mu-list-item>
          <mu-list-item button class="list-item">
            <img src="../../assets/grass.jpg">
            <span>鸭血粉丝</span>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </div>

  </mu-container>
</template>
<script>
export default {
  name: "Window"
};
</script>

<style scoped>
.container {
  padding: 0;
}
img {
  width: 100%;
  height: 100%;
}
.list-container {
  display: flex;
}

.list-item img {
  width: 64px;
  height: 64px;
}
.left-list {
  max-width: 120px;
}
.right-list {
  flex: 1;
}
.list-title {
  font-size: 12px;
}
.money {
  color: rgb(196, 145, 51);
}
</style>

