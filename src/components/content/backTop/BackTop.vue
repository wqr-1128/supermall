<template>
  <!-- <div class="back-top" @click="BackClick"> -->
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  // methods: {
  //   BackClick() {
  //     // console.log("回到顶部");
  //   },
  // },
};
</script>
<style scoped>
.back-top {
  position: fixed;
  bottom: 50px;
  right: 10px;
}
.back-top img {
  width: 40px;
  height: 40px;
}
</style>