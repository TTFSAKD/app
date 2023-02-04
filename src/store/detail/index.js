import { reqGoodsInfo, reqAddOrUpdataShopCart } from "@/api"
//封装游客身份模块uuid--->生成一个随机字符串（不能在变了)
import { getUUID } from '@/utils/uuid_token.js'
const state = {
    goodInfo: {},
    // 游客临时身份
    uuid_token: getUUID()

}
const actions = {
    // 获取产品信息的action
    async getGoodInfo({ commit }, skuid) {
        let result = await reqGoodsInfo(skuid)
        if (result.code == 200) {
            commit('GETGOODSINFO', result.data)
        }

    },
    //加入购物车的||修改某一个产品的个数
    async addOrUpdataShopCart({ commit }, { skuId, skuNum }) {
        //发请求:前端带一些参数给服务器【需要存储这些数据】，存储成功了，没有给返回数据
        //不需要在三连环（仓库存储数据了)
        //往意:async函数执行返回的结果一定是一个promise【要么成功,要么失败】

        let result = await reqAddOrUpdataShopCart(skuId, skuNum)
        //代表服务器加入购物车成功
        if (result.code == 200) {
            return 'ok'
        } else {
            //代表服务器加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETGOODSINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const getters = {
    // 路径导航简化的数据
    categoryView(state) {
        //比如:state.goodInfo初始状态空对象，空对象的categoryvView属性值undefined
        //当前计算出的categoryView属性值至少是一个空对象，假的报错不会有了。
        return state.goodInfo.categoryView || {}
    },
    // 简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default {
    state, actions, mutations, getters
}