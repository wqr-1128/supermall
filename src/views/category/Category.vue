<template>
  <div class="wrapper">
    <div>
      <!-- 1.无论是否设置click:false，button都可以点击 -->
      <button @click="btnClick">按钮</button>

      <!-- 2.必须设置click:true，那么div才能监听点击 -->
      <div @click="divClick">北京</div>

      <ul>
        <li>分类内容1</li>
        <li>分类内容2</li>
        <li>分类内容3</li>
        <li>分类内容4</li>
        <li>分类内容5</li>
        <li>分类内容6</li>
        <li>分类内容7</li>
        <li>分类内容8</li>
        <li>分类内容9</li>
        <li>分类内容10</li>
        <li>分类内容11</li>
        <li>分类内容12</li>
        <li>分类内容13</li>
        <li>分类内容14</li>
        <li>分类内容15</li>
        <li>分类内容16</li>
        <li>分类内容17</li>
        <li>分类内容18</li>
        <li>分类内容19</li>
        <li>分类内容20</li>
        <li>分类内容21</li>
        <li>分类内容22</li>
        <li>分类内容23</li>
        <li>分类内容24</li>
        <li>分类内容25</li>
        <li>分类内容26</li>
        <li>分类内容27</li>
        <li>分类内容28</li>
        <li>分类内容29</li>
        <li>分类内容30</li>
        <li>分类内容31</li>
        <li>分类内容32</li>
        <li>分类内容33</li>
        <li>分类内容34</li>
        <li>分类内容35</li>
        <li>分类内容36</li>
        <li>分类内容37</li>
        <li>分类内容38</li>
        <li>分类内容39</li>
        <li>分类内容40</li>
        <li>分类内容41</li>
        <li>分类内容42</li>
        <li>分类内容43</li>
        <li>分类内容44</li>
        <li>分类内容45</li>
        <li>分类内容46</li>
        <li>分类内容47</li>
        <li>分类内容48</li>
        <li>分类内容49</li>
        <li>分类内容50</li>
        <li>分类内容51</li>
        <li>分类内容52</li>
        <li>分类内容53</li>
        <li>分类内容54</li>
        <li>分类内容55</li>
        <li>分类内容56</li>
        <li>分类内容57</li>
        <li>分类内容58</li>
        <li>分类内容59</li>
        <li>分类内容60</li>
        <li>分类内容61</li>
        <li>分类内容62</li>
        <li>分类内容63</li>
        <li>分类内容64</li>
        <li>分类内容65</li>
        <li>分类内容66</li>
        <li>分类内容67</li>
        <li>分类内容68</li>
        <li>分类内容69</li>
        <li>分类内容70</li>
        <li>分类内容71</li>
        <li>分类内容72</li>
        <li>分类内容73</li>
        <li>分类内容74</li>
        <li>分类内容75</li>
        <li>分类内容76</li>
        <li>分类内容77</li>
        <li>分类内容78</li>
        <li>分类内容79</li>
        <li>分类内容80</li>
        <li>分类内容81</li>
        <li>分类内容82</li>
        <li>分类内容83</li>
        <li>分类内容84</li>
        <li>分类内容85</li>
        <li>分类内容86</li>
        <li>分类内容87</li>
        <li>分类内容88</li>
        <li>分类内容89</li>
        <li>分类内容90</li>
        <li>分类内容91</li>
        <li>分类内容92</li>
        <li>分类内容93</li>
        <li>分类内容94</li>
        <li>分类内容95</li>
        <li>分类内容96</li>
        <li>分类内容97</li>
        <li>分类内容98</li>
        <li>分类内容99</li>
        <li>分类内容100</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Category",
  // 挂载完成
  mounted() {
    // 默认情况下bscroll是不可以实时监控滚动位置的，想要实时监听的话，需要在后面添加参数{}
    const bscroll = new BScroll(".wrapper", {
      // probeType侦测
      // 0,1都是不侦测实时的位置
      // 2：在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测
      // 3：只要是滚动，都侦测
      probeType: 3,
      click: true,
      // pullUpLoad 上拉加载更多
      pullUpLoad: true,
    });

    // bscroll 监听滚动
    bscroll.on("scroll", (position) => {
      // console.log(position);
    });

    // bscroll 监听上拉操作
    bscroll.on("pullingUp", () => {
      console.log("上拉加载更多");
      // 发送网络请求，请求更多的数据

      // 等数据请求完成，并且将新的数据显示出来后，调用finishPullUp()方法
      setTimeout(() => {
        bscroll.finishPullUp();
      }, 2000);
    });
  },
  methods: {
    btnClick() {
      // console.log("btnClick");
    },
    divClick() {
      // console.log("divClick");
    },
  },
};
</script>
<style scoped>
.wrapper {
  height: 150px;
  background-color: red;
  overflow: hidden;

  /* 原生js滚动 在移动端滚动时会比较卡顿 */
  /* overflow-y: scroll; */
}
</style>