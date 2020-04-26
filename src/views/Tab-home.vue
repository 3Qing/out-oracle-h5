<template>
    <div class="home-wrapper main-wrapper">
        <swiper-wrapper :data="banner"></swiper-wrapper>
        <div style="padding-top: .1rem;">
            <broadcast :data="topNotice"></broadcast>
        </div>
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
import tabMixin from '@/components/mixins/tab-mixin'
export default {
    components: {
        SwiperWrapper,
        Broadcast,
        Transaction,
        NoticeList
    },
    data() {
        return {
            comps: [{
                is: Transaction,
                type: 1,
                opt: {
                    title: '币本位交易'
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
                    title: '现货策略'
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
            }],
            topNotice: []
        }
    },
    mixins: [ tabMixin ],
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (vm.HOME_DATA) {
                vm.comps = [ ...vm.HOME_DATA ]
            }
            if (vm.BANNER) {
                vm.banner = [ ...vm.BANNER ]
            }
            if (vm.TOP_NOTICE) {
                vm.topNotice = [ ...vm.TOP_NOTICE ]
            }
            vm.getTacticList()
            vm.getNotice()
            vm.getBanner()
        })
    },
    computed: {
        ...mapGetters([ 'HOME_DATA', 'BANNER', 'TOP_NOTICE' ])
    },
    methods: {
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
                if (res.code === 0) {
                    const comps = [ ...this.comps ]
                    const data = res.data || []
                    let topNotice = []
                    let noticeList = []
                    data.forEach(item => {
                        if (item.top === 0) {
                            noticeList.push(item)
                        } else if (item.top === 1) {
                            topNotice.push(item)
                        }
                    })
                    this.topNotice = topNotice
                    comps[2].data = noticeList
                    this.comps = [ ...comps ]
                    this.$store.dispatch({
                        type: CHANGE_HOMEDATA,
                        res: comps,
                        topNotice: topNotice
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
