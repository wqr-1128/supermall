<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <!-- scroll 可滚动区域 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- v-on修饰符 native：监听组件根元素的原生事件  -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import { backTopMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  mixins: [backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      // isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 这个地方img标签确实被挂载，但是其中的图片还没有占据高度

    // this.$refs.scroll.refresh 对这个函数进行防抖操作
    const refresh = debounce(this.$refs.scroll.refresh, 200);

    // 对监听的事件进行保存
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);

    // this.$bus 需要在挂载完成后调用，否则可能会为空
    // 1.监听item中图片加载完成
    // this.$bus.$on("itemImageLoad", () => {
    //   // console.log("----");
    //   // // 图片加载完成后调用refresh()
    //   this.$refs.scroll.refresh();
    // });
  },
  activated() {
    // 进来时，将位置设置为原来保存的位置
    this.$refs.scroll.scrollTo(0, this.saveY);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY();

    // 2.取消全局事件的监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    // 提取到common/util.js
    // debounce(func, delay) {
    //   let timer = null;
    //   return function (...args) {
    //     if (timer) clearTimeout(timer);
    //     timer = setTimeout(() => {
    //       func.apply(this, args);
    //     }, delay);
    //   };
    // },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // backClick() {
    //   // this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    //   // 封装方法
    //   this.$refs.scroll.scrollTo(0, 0, 500);
    // },
    contentScroll(position) {
      // console.log(position);
      // position > 1000
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;

      // 2.判断tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // 上拉加载更多
    loadMore() {
      // console.log("上拉加载更多");
      // 调用请求数据的封装方法
      this.getHomeGoods(this.currentType);
      // 重新计算可滚动区域
      // this.$refs.scroll.scroll.refresh();
    },
    swiperImageLoad() {
      // 获取tabControl的offsetTop
      // 所有的组件都有一个属性$el：用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // console.log(res);

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>
<style scoped>
#home {
  position: relative;
  /* padding-top: 44px; */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}

.tab-control {
  position: relative;
  z-index: 99;
}
/* .tab-control {
  position: sticky 适合移动端原生js  使用BScroll插件后不起作用
  position: sticky;
  top: 44px;
} */

/* 方式二： */
.content {
  /* height: 300px; */
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* 方式一： */
/* .content {
  height: calc(100%-93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>