<template>
  <div class="goods-list">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goods-item="item"
    />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.goods-list {
  display: flex;
  /*flex-wrap 设置弹性元素是否在弹性容器中自动换行 */
  flex-wrap: wrap;
  padding: 5px;
  /* 均等分 */
  justify-content: space-around;
}
</style>