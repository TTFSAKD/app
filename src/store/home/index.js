// home模块化的小仓库
import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api'
//state中数据默认初始值别瞎写，服务器返回对象，服务器返回数组。【根据接口返回值初始化的】
const state = {
    //home仓库中存储三级菜单的数据
    categoryList: [],
    //轮播图的数据
    bannerList: [],
    // floor组件的数据
    floorList: []
}
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }
    },
    // 获取首页轮播图
    async getBannerList({ commit }) {
        console.log('在向服务器发起ajax请求，获取轮播图数据');
        let result = await reqGetBannerList()
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data)
        }
    },
    // 获取floor数据
    async getFloorList({ commit }) {
        let result = await reqFloorList()
        if (result.code == 200) {
            //提交mutation
            commit("GETFLOORLIST", result.data)
        }
    }
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
        console.log("在修该仓库中的bannerList数据");
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}
const getters = {}

export default {
    actions, mutations, state, getters
}