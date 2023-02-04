<template>
  <div>
    <Header />
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show" />
    我是根组件
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //派发action获||取商品分类的三级列表的数据
    this.$store.dispatch("categoryList");
  },
};
</script>



