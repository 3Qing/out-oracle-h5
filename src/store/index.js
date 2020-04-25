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
export const CHANGE_EARNDATA = 'CHANGE_EARNDATA'
export const SET_EARNDATA = 'SET_EARNDATA'
export const CHANGE_RECOMDATA = 'CHANGE_RECOMDATA'
export const SET_RECOMDATA = 'SET_RECOMDATA'

Vue.use(Vuex)

const state = {
    isLogin: false,
    myData: null,
    homeData: null,
    banner: null,
    tranData: null,
    earnData: null,
    recomData: null
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
        [SET_EARNDATA](state, data) {
            if (state.earnData) {
                state.earnData[data.field] = data.res
            } else {
                let obj = {}
                obj[data.field] = data.res
                state.earnData = obj
            }
        },
        [SET_RECOMDATA](state, data) {
            if (state.recomData) {
                state.recomData[data.field] = data.res
            } else {
                let obj = {}
                obj[data.field] = data.res
                state.recomData = obj
            }
            // if (state.recomData) {
            //     state.recomData = Object.assign(state.recomData, data.res)
            // } else {
            //     state.recomData = data.res
            // }
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
        },
        [CHANGE_EARNDATA]({ commit }, payload) {
            commit(SET_EARNDATA, payload)
        },
        [CHANGE_RECOMDATA]({ commit }, payload) {
            commit(SET_RECOMDATA, payload)
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
