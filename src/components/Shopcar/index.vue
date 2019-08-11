<template>
  <mu-container class="shopcar">
    <mu-appbar style="width: 100%;">
      <mu-button icon slot="left" @touchstart="handleOpenList">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      <span>￥ 10.00 </span>
      <mu-button flat slot="right" @touchstart="handleToPurchase">去结算</mu-button>
    </mu-appbar>
    <mu-expand-transition>
      <mu-bottom-sheet class="sheet" :open.sync="open"  :overlay-opacity="0.1">
        <mu-list>
          <mu-sub-header>
            <mu-list>
              <mu-list-item>
                <mu-list-item-content>
                  <mu-list-item-title>已选商品</mu-list-item-title>
                </mu-list-item-content>
                <mu-list-item-action>
                  <mu-button flat>
                    清空
                    <mu-icon right value="delete"></mu-icon>
                  </mu-button>
                </mu-list-item-action>
              </mu-list-item>
            </mu-list>
          </mu-sub-header>
          <mu-list-item>
            <mu-list-item-title>菜名</mu-list-item-title>
            <mu-list-item-action class="item">
              <span>￥10.00</span>
              <mu-icon value="remove" color="red"></mu-icon>
              <span class="num">10</span>
              <mu-icon value="add" color="blue"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="inbox" color="blue"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>Inbox</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="chat" color="green"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>Chat</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="email" color="cyan"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>Email</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>
    </mu-expand-transition>
  </mu-container>
</template>

<script>
export default {
  name: "Shopcar",
  data() {
    return {
      open: false
    };
  },
  methods: {
    handleOpenList() {
      console.log(356);
      this.open = true;
    },
    handleToPurchase(){
      this.$router.push('/food/purchase')
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.shopcar {
  position: fixed;
  bottom: 0;
  z-index: 99;
  padding: 0;
}

span {
  color: red;
  font-size: 16px;
}
span.num {
  color: #000;
}
.price {
  color: red;
}
.sheet {
  margin-bottom: 56px;
}
.mu-item-title {
  flex: 1;
}
.item {
  flex: 1;
  flex-direction: row;
}
</style>
