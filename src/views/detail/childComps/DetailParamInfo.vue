<template>
  <div class="param-info" v-if="Object.keys(paramInfo).value != 0">
    <table
      class="info-size"
      v-for="(table, index) in paramInfo.sizes"
      :key="index"
    >
      <tr v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{ td }}</td>
      </tr>
    </table>
    <table>
      <tr
        v-for="(table, index) in paramInfo.infos"
        :key="index"
        class="info-param"
      >
        <td class="info-param-key">{{ table.key }}</td>
        <td class="info-param-value">{{ table.value }}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image">
      <img :src="paramInfo.image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style scoped>
.param-info {
  padding: 20px 15px;
  font-size: 12px;
  border-bottom: 5px solid #f2f5f8;
  background-color: #fff;
}

.param-info table {
  width: 100%;
  border-collapse: collapse;
}

.param-info table tr {
  height: 42px;
}

.param-info table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.info-param-key {
  /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
  width: 95px;
}

.info-param {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.info-param-value {
  color: #eb4868;
}

.info-img img {
  width: 100%;
}
</style>