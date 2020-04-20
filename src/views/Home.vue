<template>
    <div class="home-wrapper main-wrapper">
        <swiper-wrapper :data="banner"></swiper-wrapper>
        <broadcast></broadcast>
        <!-- <transaction class="mt-10" :opt="shortOpt"></transaction>
        <transaction class="mt-10" :opt="longOpt"></transaction>
        <notice-list class="mt-10" :opt="noticeOpt"></notice-list> -->
        <component v-for="(item, i) in comps" :key="i" :is="item.is" :data="item.data" class="mt-10" :opt="item.opt"></component>
    </div>
</template>

<script>
import SwiperWrapper from '@/components/home/swiper'
import Broadcast from '@/components/home/broadcast'
import Transaction from '@/components/home/transaction'
import NoticeList from '@/components/home/notice-list'
import { CHANGE_HOMEDATA } from '@/store'
import { mapGetters } from 'vuex'
export default {
    components: {
        SwiperWrapper,
        Broadcast,
        Transaction,
        NoticeList
    },
    data() {
        return {
            // shortOpt: {
            //     title: '短线交易策略'
            // },
            // longOpt: {
            //     title: '长线交易策略'
            // },
            comps: [{
                is: Transaction,
                type: 1,
                opt: {
                    title: '短线交易策略'
                },
                data: [{
                    type: 1
                }, {
                    type: 1
                }]
            }, {
                is: Transaction,
                type: 2,
                opt: {
                    title: '长线交易策略 '
                },
                data: [{
                    type: 2
                }, {
                    type: 2
                }]
            }, {
                is: NoticeList,
                opt: {
                    title: '公告中心',
                    more: true,
                    moreLabel: '更多',
                    routeName: 'NoticeList'
                },
                data: []
            }],
            banner: [{
                url: require('../assets/img/banner.png')
            }, {
                url: require('../assets/img/banner.png')
            }]
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (vm.HOME_DATA) {
                vm.comps = [ ...vm.HOME_DATA ]
            }
            if (vm.BANNER) {
                vm.banner = [ ...vm.BANNER ]
            }
            vm.getTacticList()
            vm.getNotice()
            vm.getBanner()
        })
    },
    computed: {
        ...mapGetters([ 'HOME_DATA', 'BANNER' ])
    },
    methods: {
        getBanner() {
            this.$axios({
                url: '/api/banner'
            }).then(res => {
                console.log(res)
                if (res.code === 0) {
                    this.banner = res.data || []
                    this.$store.dispatch({
                        type: CHANGE_HOMEDATA,
                        data: this.banner
                    })
                }
            })
        },
        getTacticList() {
            this.$axios({
                url: '/api/tactics/list',
                custom: {
                    vm: this
                }
            }).then(res => {
                if (res.code === 0) {
                    const data = res.data || []
                    const shortData = []
                    const longData = []
                    data.forEach(item => {
                        if (item.type === 1) {
                            item.title = '短线交易'
                            shortData.push(item)
                        } else if (item.type === 2) {
                            item.title = '长线交易'
                            longData.push(item)
                        }
                    })
                    const comps = [ ...this.comps ]
                    comps.forEach(item => {
                        if (item.type === 1) {
                            item.data = [ ...shortData, {}, {} ].splice(0, 2)
                        } else if (item.type === 2) {
                            item.data = [ ...longData, {}, {} ].splice(0, 2)
                        }
                    })
                    this.$store.dispatch({
                        type: CHANGE_HOMEDATA,
                        res: comps
                    })
                    this.comps = [ ...comps ]
                }
            })
        },
        getNotice() {
            this.$axios({
                url: '/api/notice'
            }).then(res => {
                console.log(res)
                if (res.code === 0) {
                    const comps = [ ...this.comps ]
                    comps[2].data = res.data || []
                    this.comps = [ ...comps ]
                    this.$store.dispatch({
                        type: CHANGE_HOMEDATA,
                        res: comps
                    })
                }
            })
        }
    }
}
</script>

<style lang="less">
.home-wrapper {
    font-size: 0;
    .mt-10 {
        margin-top: 0.2rem;
    }
}
</style>
