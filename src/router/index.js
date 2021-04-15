import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载
const Home = () =>
  import('views/home/Home')
const Category = () =>
  import('views/category/Category')
const Shopcar = () =>
  import('views/shopcar/Shopcar')
const Profile = () =>
  import('views/profile/Profile')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
const routes = [
  // 配置对应的映射关系
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcar',
    component: Shopcar
  },
  {
    path: '/profile',
    component: Profile
  }
]

const router = new VueRouter({
  routes,
  // 建议使用history模式
  mode: 'history'
})

// 3.导出
export default router;