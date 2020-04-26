<template>
    <div class="trans-wrapper main-wrapper">
        <div class="top">
            <div class="banner-wrapper">
                <img src="../assets/img/banner.png">
            </div>
            <div class="clearfix nav-list">
                <router-link class="fl" :to="{ name: 'TransactionList', params: {id: 1} }">
                    <img src="../assets/img/icon-coin.jpg">
                    <p>币本位交易</p>
                </router-link>
                <router-link class="fl" :to="{ name: 'TransactionList', params: {id: 2} }">
                    <img src="../assets/img/icon-goods.jpg">
                    <p>现货交易</p>
                </router-link>
                <router-link class="fl" :to="{ name: 'TransactionList', params: {id: 4} }">
                    <img src="../assets/img/icon-contract.jpg">
                    <p>合约交易</p>
                </router-link>
                <router-link class="fl" :to="{ name: 'Article', params: { id: 1 } }">
                    <img src="../assets/img/icon-about.jpg">
                    <p>关于交易</p>
                </router-link>
            </div>
        </div>
        <div class="tactic-list-wrapper mt-10">
            <component v-for="(item, i) in comps" :is="item.is" :key="i" :data="item.data" :opt="item.opt"></component>
        </div>
    </div>
</template>

<script>
import ListWrapper from '@/components/transaction/list'
import { CHANGE_TRANDATA } from '@/store'
import { mapGetters } from 'vuex'
export default {
    components: {
        ListWrapper
    },
    data() {
        return {
            comps: [{
                is: ListWrapper,
                type: 1,
                opt: {
                    title: '币本位交易',
                    more: true,
                    routeName: 'TransactionList',
                    params: { id: 1 }
                },
                data: [{}]
            }, {
                is: ListWrapper,
                type: 2,
                opt: {
                    title: '现货交易',
                    more: true,
                    routeName: 'TransactionList',
                    params: { id: 2 }
                },
                data: [{}]
            }, {
                is: ListWrapper,
                type: 3,
                opt: {
                    title: '合约交易',
                    more: true,
                    routeName: 'TransactionList',
                    params: { id: 3 }
                },
                data: [{}]
            }]
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (vm.TRAN_DATA) {
                vm.comps = [ ...vm.TRAN_DATA ]
            }
            vm.getTranList()
        })
    },
    computed: {
        ...mapGetters([ 'TRAN_DATA' ])
    },
    methods: {
        getTranList() {
            this.$axios({
                url: '/api/tactics/list',
                custom: {
                    vm: this
                }
            }).then(res => {
                if (res.code === 0) {
                    const data = res.data || []
                    const comps = [ ...this.comps ]

                    const list = {
                        1: [],
                        2: [],
                        3: []
                    }
                    data.forEach(item => {
                        if (item.type) {
                            list[item.type].push(item)
                        }
                    })
                    comps.forEach(item => {
                        if (item.type) {
                            item.data = list[item.type].length ? list[item.type] : [{}]
                        }
                    })
                    this.$store.dispatch({
                        type: CHANGE_TRANDATA,
                        res: [ ...comps ]
                    })
                    this.comps = [ ...comps ]
                }
            })
        }
    }
}
</script>

<style lang="less">
.trans-wrapper {
    .top {
        .top-cover {
            width: 100%;
            height: 2.6rem;
        }
        .nav-list {
            padding: .6rem 0 .4rem;
            a {
                width: 25%;
                color: #00223b;
                font-size: 0.20rem;
                text-align: center;
                &:active {
                    opacity: 0.5;
                }
                img {
                    height: 0.6rem;
                    margin-bottom: 0.2rem;
                }
            }
        }
    }
    .mt-10 {
        margin-top: 0.2rem;
    }
    .tactic-list-wrapper {
        padding-bottom: 0.4rem;
    }
}
</style>
