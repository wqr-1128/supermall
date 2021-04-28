import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(content, payload) {
    // payload 新添加的商品
    // 1.1 for循环获取
    // let oldProduct = null;
    // for (let item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item;
    //   }
    // }

    // 1.2 查找之前数组中是否有
    let oldProduct = content.state.cartList.find(item => item.iid === payload.iid);

    // 2.判断oldProduct
    if (oldProduct) {
      // oldProduct.count += 1;
      content.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1;
      // state.cartList.push(payload);
      content.commit(ADD_TO_CART, payload)
    }
  }
}