<template>
  <div class="wrapper" ref="wrapper">
    <div class="context">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // ref 如果是绑定在组件中的，那么通过this.$refs.refname获取到的是一个组件对象
    // ref 如果是绑定在普通元素中，那么通过this.$refs.refname获取到的是一个元素对象
    // 1. 创建Scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType, // 监听滚动
      pullUpLoad: this.pullUpLoad, // 监听上拉加载
    });
    // console.log(this.scroll);

    // 2.监听滚动的位置
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      // 传回父组件处理
      this.$emit("scroll", position);
    });

    // 3.监听上拉加载
    this.scroll.on("pullingUp", () => {
      // console.log("上拉加载更多");
      // 传回父组件处理
      this.$emit("pullingUp");
    });
  },
  methods: {
    // 回到顶部
    scrollTo(x, y, time = 300) {
      this.scroll && this.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      // console.log("----");
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>
<style scoped>
</style>