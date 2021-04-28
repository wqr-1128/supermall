<template>
  <div v-if="Object.keys(goods).length != 0" class="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span
        class="discount"
        :style="{ backgroundColor: goods.discountBgColor }"
        >{{ goods.discount }}</span
      >
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[0].name }}</span>
    </div>
    <div class="info-service">
      <span
        class="info-service-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index].icon" alt="" />
        <span>{{ goods.services[index].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style scoped>
.base-info {
  padding: 10px 5px 0;
  border-bottom: 8px solid rgba(100, 100, 100, 0.1);
}
.info-title {
  color: #333;
}
.info-price {
  margin-top: 10px;
}
.info-price span {
  padding-left: 5px;
}
.info-price .n-price {
  color: var(--color-high-text);
  font-size: 20px;
}
.info-price .o-price {
  color: #aaa;
  font-size: 12px;
  text-decoration: line-through;
}
.info-price .discount {
  display: inline-block;
  vertical-align: top;
  padding: 2px 5px;
  color: #fff;
  border-radius: 5px;
  font-size: 12px;
}
.info-other {
  display: flex;
  margin-top: 10px;
  line-height: 30px;
  font-size: 13px;
  color: #aaa;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  justify-content: space-between;
}
.info-service {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  line-height: 40px;
}
.info-service .info-service-item img {
  width: 10px;
}
</style>