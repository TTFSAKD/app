<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派/事件代理 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入方式：把lodash全部功能函数引入
import _ from "lodash";

export default {
  name: "TypeNav",
  data() {
    return {
      //当前这个属性决定了到底那个h3身上有类名
      currentIndex: -1,
      show: true,
    };
  },
  //发请求经常在mounted生命周期函数中进行
  //组件挂载完毕，就可以向服务器发请求
  mounted() {
    //当组件挂载完毕，让show属性变为false
    //如果不是Home路由组件,将typeNav进行隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      //右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      //注入一个参数state，其实即为大仓库中的数据
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex属性
    // changeIndex(index) {
    //   //index:鼠标移上某一个一级分类的元素的索引值
    //   this.currentIndex = index;
    // },
    changeIndex: _.throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    // 当鼠标移入的时候，让商品分类显示
    enterShow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
      this.show = true;
    },
    // 一级分类鼠标移出的时间回调
    leaveIndex() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },

    // 进行路由跳转的方法
    goSearch(event) {
      let element = event.target;
      //注意这里categoryname不能用驼峰，因为在浏览器中自动将驼峰小写
      // 通过解构赋值将对象中相应的值拿出来
      // 只有a标签有自定义属性categoryname
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //一级分类、二级分类、三级分类的a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //判断:如果路由跳转的时候，带有params参数，捎带脚传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
          // 动态给location配置对象添加query属性
          location.query = query;
          //  路由跳转
          this.$router.push(location);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background: skyblue;
        }
      }
    }
    // 过度动画样式
    // 过度动画开始状态（进入）
    .sort-enter {
      height: 0px;
    }
    // 过度动画结束状态（退出）
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>