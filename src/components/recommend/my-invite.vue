<template>
    <div class="my-invite">
        <div class="top">
            <!-- <div class="top-header text-center">
                <span :class="[active === 1 && 'active']" @click="swtichHandle(1)">今日预估</span>
                <span :class="[active === 2 && 'active']" @click="swtichHandle(2)">昨日</span>
            </div> -->
            <ul class="top-content">
                <li>
                    <p class="number">{{count}}</p>
                    <p class="text">新增邀请人数</p>
                </li>
                <li>
                    <p class="number">{{total}} ETH</p>
                    <p class="text">交易额</p>
                </li>
            </ul>
            <div class="top-total-wrapper text-center">
                总邀请人数：<span>{{data.referrer_count}}</span>
            </div>
        </div>
        <div class="footer mt-10">
            <p>邀请记录</p>
            <div class="list-wrapper">
                <div class="item-wrapper" >
                    <div class="th">
                        <span>被邀请人账号</span>
                        <span>邀请时间</span>
                    </div>
                    <p v-if="data.referrer.length === 0" class="no-data">暂无数据</p>
                    <div class="tr" v-for="(item, i) in data.referrer" :key="i">
                        <span>{{item.phone || '-'}}</span>
                        <span>{{item.created_at || '-'}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    props: {
        data: {
            type: Object,
            default: () => ({
                referrer: [],
                referrer_count: 0
            })
        }
    },
    data() {
        return {
            total: 0,
            count: 0,
            active: 1,
            listData: [{}]
        }
    },
    watch: {
        data: {
            handler: function(val) {
                const curTime = moment(new Date()).format('YYYY-MM-DD')
                val.referrer.forEach(item => {
                    if (item.created_at && item.created_at.includes(curTime)) {
                        this.count += 1
                    }
                })
            },
            deep: true
        }
    },
    mounted() {
        this.getRewardData()
    },
    methods: {
        swtichHandle(val) {
            this.active = val
        },
        getRewardData() {
            this.$axios({
                url: '/api/user/reward',
                custom: {
                    vm:  this
                }
            }).then(res => {
                if (res.code === 0) {
                    const data = res.data || []
                    let total = 0
                    data.forEach(item => {
                        total += Number(item.amount)
                    })
                    this.total = Number(total.toFixed(2))
                }
            })
        },
    }
}
</script>

<style lang="less">
.my-invite {
    & > div {
        padding: .2rem .4rem;
        background-color: #fff;
    }
    .top {
        .top-header {
            padding: .2rem 0  .4rem;
            span {
                display: inline-block;
                width: 2rem;
                height: .8rem;
                line-height: .8rem;
                background-color: #f8f8f8;
                &.active {
                    color: #fff;
                    background-color: @primary-color;
                }
                &:first-child {
                    border-top-left-radius: .1rem;
                    border-bottom-left-radius: .1rem;
                }
                &:last-child {
                    border-top-right-radius: .1rem;
                    border-bottom-right-radius: .1rem;
                }
            }
        }
        .top-content {
            display: flex;
            width: 100%;
            flex-flow: wrap;
            justify-content: space-between;
            margin-top: .4rem;
            li {
                width: 50%;
                text-align: center;
                p.number {
                    font-size: .36rem;
                    color: @primary-color;
                }
                .text {
                    color: #ccc;
                    font-size: .22rem;
                }
            }
        }
        .top-total-wrapper {
            color: #333;
            padding-top: .2rem;
            border-top: 1px solid #f8f8f8;
            span {
                font-size: .36rem;
                color: @primary-color;
            }
        }
    }
    .footer {
        .list-wrapper {
            padding: 0 0 .3rem;
            .item-wrapper {
                border-bottom: none !important;
                .th, .tr {
                    height: .7rem;
                    line-height: .7rem;
                    border-bottom: 1px solid #f8f8f8;
                    span {
                        width: 50%;
                    }
                }
            }
        }
    }
}
</style>
