import Vue from 'vue'
import Vuex from 'vuex'

export const SET_MYDATA = 'SET_MYDATA'
export const FETCH_MYDATA = 'FETCH_MYDATA'
export const SET_LOGIN = 'SET_LOGIN'
export const CHANGE_LOGIN = 'CHANGE_LOGIN'
export const CHANGE_HOMEDATA = 'CHANGE_HOMEDATA'
export const SET_BANNER = 'SET_BANNER'
export const SET_HOMEDATA = 'SET_HOMEDATA'
export const CHANGE_TRANDATA = 'CHANGE_TRANDATA'
export const SET_TRANDATA = 'SET_TRANDATA'

Vue.use(Vuex)

const state = {
    isLogin: false,
    myData: null,
    homeData: null,
    banner: null,
    tranData: null
}

export default new Vuex.Store({
    state,
    mutations: {
        // 设置用户信息
        [SET_MYDATA](state, data) {
            if (state.myData) {
                state.myData = Object.assign(state.myData, data.res)
            } else {
                state.myData = data.res
            }
        },
        [SET_LOGIN](state, res) {
            state.isLogin = res
        },
        [SET_HOMEDATA](state, res) {
            state.homeData = res
        },
        [SET_BANNER](state, res) {
            state.banner = res
        },
        [SET_TRANDATA](state, res) {
            state.tranData = res
        },
    },
    actions: {
        // 获取用户信息
        [FETCH_MYDATA]({ commit }, payload) {
            commit(SET_MYDATA, payload)
        },
        [CHANGE_LOGIN]({ commit }, payload) {
            commit(SET_LOGIN, payload.res)
        },
        [CHANGE_HOMEDATA]({ commit }, payload) {
            if (payload.res) {
                commit(SET_HOMEDATA, payload.res)
            } else {
                commit(SET_BANNER, payload.data)
            }
        },
        [CHANGE_TRANDATA]({ commit }, payload) {
            commit(SET_TRANDATA, payload.res)
        }
    },
    getters: (state => {
        let getters = {};
        if (typeof state !== 'object' || state instanceof Array) return {};
        for (let key in state) {
            if (key in state) {
                const name = key.replace(/([A-Z])/g, '_$1').toUpperCase();
                getters[name] = state => state[key];
            }
        }
        return getters;
    })(state)
})
