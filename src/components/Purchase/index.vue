<template>
  <div id="container">
    <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
      <mu-card-title title="确认订单（预计16:00到达）" sub-title="hxh 15851862303"></mu-card-title>
    </mu-card>
    <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
      <mu-card-header title="梅园1-4" sub-title="梅3b120">
        <mu-avatar slot="avatar">
          <mu-icon size="49" value="home"></mu-icon>
        </mu-avatar>
      </mu-card-header>
    </mu-card>
    <mu-paper :z-depth="1" class="demo-list-wrap">
      <mu-list>
        <mu-sub-header>Today</mu-sub-header>
        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar>
              <img src="../../assets/grass.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>菜名</mu-list-item-title>
          <mu-list-item-title>×1</mu-list-item-title>
          <mu-list-item-action>
            <span>￥10.00</span>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar>
              <img src="../../assets/grass.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>菜名</mu-list-item-title>
          <mu-list-item-title>×1</mu-list-item-title>
          <mu-list-item-action>
            <span>￥10.00</span>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar>
              <img src="../../assets/grass.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>菜名</mu-list-item-title>
          <mu-list-item-title>×1</mu-list-item-title>
          <mu-list-item-action>
            <span>￥10.00</span>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar>
              <img src="../../assets/grass.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>菜名</mu-list-item-title>
          <mu-list-item-title>×1</mu-list-item-title>
          <mu-list-item-action>
            <span>￥10.00</span>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar>
              <img src="../../assets/grass.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>菜名</mu-list-item-title>
          <mu-list-item-title>×1</mu-list-item-title>
          <mu-list-item-action>
            <span>￥10.00</span>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar>
              <img src="../../assets/grass.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>菜名</mu-list-item-title>
          <mu-list-item-title>×1</mu-list-item-title>
          <mu-list-item-action>
            <span>￥10.00</span>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar>
              <img src="../../assets/grass.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>菜名</mu-list-item-title>
          <mu-list-item-title>×1</mu-list-item-title>
          <mu-list-item-action>
            <span>￥10.00</span>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar>
              <img src="../../assets/grass.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>菜名</mu-list-item-title>
          <mu-list-item-title>×1</mu-list-item-title>
          <mu-list-item-action>
            <span>￥10.00</span>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar>
              <img src="../../assets/grass.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>菜名</mu-list-item-title>
          <mu-list-item-title>×1</mu-list-item-title>
          <mu-list-item-action>
            <span>￥10.00</span>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar>
              <img src="../../assets/grass.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>菜名</mu-list-item-title>
          <mu-list-item-title>×1</mu-list-item-title>
          <mu-list-item-action>
            <span>￥10.00</span>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar>
              <img src="../../assets/grass.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>菜名</mu-list-item-title>
          <mu-list-item-title>×1</mu-list-item-title>
          <mu-list-item-action>
            <span>￥10.00</span>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
    </mu-paper>
    <PurchaseBar></PurchaseBar>
  </div>
</template>

<script>
import PurchaseBar from '@/components/PurchaseBar'

export default {
  name: "Purchase",
  components:{PurchaseBar},
  data() {
    return {};
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
#container {
  position: absolute;
  width: 100%;
  height: 563px;
  margin: 56px auto;
  padding: 0;
  
}

span {
  color: red;
}
</style>
