<template>
  <div class="recommend">
    <div
      v-for="(item, index) in recommends"
      :key="index"
      class="recommend-item"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.recommend {
  display: flex;
  width: 100%;
  font-size: 12px;
  padding: 15px 0;
  border-bottom: 8px solid #eee;
}
.recommend-item {
  flex: 1;
  width: 25%;
  text-align: center;
}

.recommend-item img {
  width: 80%;
  margin-bottom: 5px;
}
</style>