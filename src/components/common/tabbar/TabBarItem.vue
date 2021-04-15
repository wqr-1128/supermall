<!--  -->
<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 如果需要判断显示，插槽外层最好使用div包裹，判断条件写在外层div层 -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :class="{active:isActive}" :style="activeStyle">
      <slot name="item-text"></slot>
    </div>

    <!-- 所有的item都展示同一个图片，同一个文字 -->
    <!-- <img src="../../assets/img/tabbar/home.png" alt />
    <div>首页</div>-->
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#d81e06',
    },
  },
  data() {
    return {
      // isActive: true,
    }
  },
  computed: {
    isActive() {
      // 判断当前path是否活跃  /home -> item1(/home) = true
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {}
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)
      // console.log('itemClick')
    },
  },
}
</script>
<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  /* line-height: 49px; */
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
/* .active {
  color: #d81e06;
} */
</style>