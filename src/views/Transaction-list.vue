<template>
    <div class="transaction-list">
        <div class="top">
            <div class="marquee-wrapper">
                <span class="marquee-title">公告</span>
                <broadcast :data="topNotice" :icon="false"></broadcast>
            </div>
            <div class="oper-list clearfix">
                <div class="oper-item fl" v-for="(item, i) in operList" :key="i" @click="clickHandler(item)">
                    <div class="icon-cover">
                        <img :src="item.icon">
                        <!-- <span class="badge" v-if="i === 0">空闲中</span> -->
                    </div>
                    <p>{{item.label}}</p>
                </div>
            </div>
            <div class="banner">
                <img src="" alt="">
            </div>
        </div>
        <div class="tactic-list mt-10">
            <div class="list-header">
                <!-- <div class="left">全部分类</div> -->
                <!-- <div class="right">
                    <span><i></i>综合</span>
                    <span><i></i>筛选</span>
                </div> -->
            </div>
            <div class="list-content">
                <tactic-list :data="listData"></tactic-list>
            </div>
        </div>
    </div>
</template>

<script>
import TacticList from '@/components/transaction/list'
import Broadcast from '@/components/home/broadcast'
export default {
    components: {
        TacticList,
        Broadcast
    },
    data() {
        return {
            operList: [{
                label: '操作记录',
                routeName: 'OperRecord',
                params: { id: this.$route.params.id },
                icon: require('../assets/img/icon-oper-record.jpg')
            }, {
                label: 'API管理',
                routeName: 'ApiManager',
                icon: require('../assets/img/icon-api-import.jpg')
            }, {
                label: '帮助指南',
                routeName: 'Article',
                params: { id: 0 },
                icon: require('../assets/img/icon-guide.jpg')
            }],
            listData: [],
            topNotice: []
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.getTacticList()
            vm.getNotice()
        })
    },
    methods: {
        clickHandler(item) {
            if (item.routeName) {
                this.$router.push({ name: item.routeName, params: item.params || {} })
            }
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
                    let listData = []
                    data.forEach(item => {
                        if (item.type === Number(this.$route.params.id)) {
                            listData.push(item)
                        }
                    })
                    this.listData = [ ...listData ]
                }
            })
        },
        getNotice() {
            this.$axios({
                url: '/api/notice'
            }).then(res => {
                if (res.code === 0) {
                    const data = res.data || []
                    let topNotice = []
                    data.forEach(item => {
                        if (item.top === 1) {
                            topNotice.push(item)
                        }
                    })
                    this.topNotice = [ ...topNotice ]
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.transaction-list {
    .top {
        padding: 0.2rem 0.3rem;
        background-color: #fff;
        .marquee-wrapper {
            height: .6rem;
            line-height: .6rem;
            padding-left: .4rem;
            background-color: #f8f8f8;
            position: relative;
            .marquee-title {
                position: absolute;
                left: .1rem;
                color: #0a0a0a;
                margin-right: 0.2rem;
            }
            .broadcast-box {
                padding-top: 0.08rem;
            }
        }
        .oper-list {
            margin-top: .6rem;
            .oper-item {
                width: 33%;
                text-align: center;
                .icon-cover {
                    position: relative;
                    img {
                        height: .6rem;
                        margin-bottom: 0.2rem;
                    }
                    .badge {
                        position: absolute;
                        top: -2px;
                        right: -2px;
                        color: #fff;
                        font-size: 0.2rem;
                        border-radius: 20%;
                        padding: 0 2px;
                        display: inline-block;
                        transform: scale(0.6);
                        background-color: #08ab8e;
                    }
                }
                p {
                    font-size: 0.2rem;
                }
            }
        }
    }
    .tactic-list {
        height: 79%;
        padding: 0.2rem 0.3rem;
        background-color: #fff
    }
}
</style>
