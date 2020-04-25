import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Tab-home.vue'
import Transaction from '@/views/Tab-transaction.vue'
import TacticDetail from '@/views/Tactic-detail'
import ApiManager from '@/views/Api-manager'
import ApiImport from '@/views/Api-import'
import TransactionList from '@/views/Transaction-list'
import Earnings from '@/views/Tab-earnings'
import TransactionDetail from '@/views/Transaction-detail'
import NoticeList from '@/views/Notice-list'
import Recommend from '@/views/Tab-recommend'
import RecommendDetail from '@/views/Recommend-detail'
import Reward from '@/views/Reward'
import My from '@/views/Tab-my'
import AccountSet from '@/views/Account-set'
import Login from '@/views/Login'
import Register from '@/views/Register'
import ForgetPwd from '@/views/Forget-pwd'
import Set from '@/views/Set'
import SetDetail from '@/views/Set-detail'
import EarningOverview from '@/views/Earning-overview'
import Article from '@/views/Article'
import OperRecord from '@/views/Oper-record'

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'Home',
        meta: {
            title: '首页'
        },
        component: Home
    }, {
        path: '/transaction',
        name: 'Transaction',
        meta: {
            title: '交易'
        },
        component: Transaction
    }, {
        path: '/transactionlist/:id',
        name: 'TransactionList',
        component: TransactionList
    }, {
        path: '/tacticdetail/:id',
        name: 'TacticDetail',
        component: TacticDetail
    }, {
        path: '/apimanager',
        name: 'ApiManager',
        component: ApiManager
    }, {
        path: '/apiimport/:id',
        name: 'ApiImport',
        component: ApiImport
    }, {
        path: '/earnings',
        name: 'Earnings',
        meta: {
            title: '收益'
        },
        component: Earnings
    }, {
        path: '/noticelist',
        name: 'NoticeList',
        component: NoticeList
    }, {
        path: '/recommend',
        name: 'Recommend',
        meta: {
            title: '推荐'
        },
        component: Recommend
    }, {
        path: '/recommendetail',
        name: 'RecommendDetail',
        component: RecommendDetail
    }, {
        path: '/reward',
        name: 'Reward',
        component: Reward
    }, {
        path: '/my',
        name: 'My',
        meta: {
            title: '我的'
        },
        component: My
    }, {
        path: '/accountset',
        name: 'AccountSet',
        component: AccountSet
    }, {
        path: '/set',
        name: 'Set',
        component: Set
    }, {
        path: '/setdetail/:id',
        name: 'SetDetail',
        component: SetDetail
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/register',
        name: 'Register',
        component: Register
    }, {
        path: '/forgetpwd',
        name: 'ForgetPwd',
        component: ForgetPwd
    }, {
        path: '/transactiondetail',
        name: 'TransactionDetail',
        component: TransactionDetail
    }, {
        path: '/earningdetail',
        name: 'EarningDetail',
        component: TransactionDetail
    }, {
        path: '/earningoverview/:id',
        name: 'EarningOverview',
        component: EarningOverview
    }, {
        path: '/article/:id',
        name: 'Article',
        component: Article
    }, {
        path: '/operecord/:id',
        name: 'OperRecord',
        component: OperRecord
    }
]

// 复写push方法 修复导航错误
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
    mode: 'hash',
    routes
})

export default router
