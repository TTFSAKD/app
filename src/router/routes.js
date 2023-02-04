// 引入一级路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
/* 当打包构建应用时，JavaScript包会变得非常大，影响页面加载。
加果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。 */

// 路由配置信息
export default [{
    path: '/home',
    component: Home,
    meta: { show: true }
},
{
    path: '/login',
    component: Login,
    meta: { show: false }
},
{
    path: '/search/:keyword?',
    component: Search,
    meta: { show: true },
    name: "search"
},
{
    path: '/register',
    component: Register,
    meta: { show: false }
},
{
    path: '/detail/:skuid',
    component: Detail,
    meta: { show: true }
},
{
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: AddCartSuccess,
    meta: { show: true }
},
{
    path: '/shopcart',
    component: ShopCart,
    meta: { show: true }
},
{
    path: '/trade',
    component: Trade,
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
        //去交易页面,必须是从购物车而来
        if (from.path == '/shopcart') {
            next();
        } else {
            //其他的路由组件而来，停留在当前
            next(false)
        }
    }
},
{
    path: '/pay',
    component: Pay,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
        if (from.path == '/trade') {
            next();
        } else {
            next(false)
        }
    }
},
{
    path: '/paysuccess',
    component: PaySuccess,
    meta: { show: true }
},
{
    path: '/center',
    component: Center,
    meta: { show: true },
    // 二级路由组件
    children: [
        {
            path: 'myorder',
            component: MyOrder
        },
        {
            path: 'grouporder',
            component: GroupOrder
        },
        {
            path: '/center',
            redirect: '/center/myorder'
        }
    ]
},
// 重定向，在项目跑起来的时候，访问/，立马让它定向到首页
{
    path: '*',
    redirect: "/home"
}
]