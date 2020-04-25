<template>
    <a-spin :spinning="loading" tip="获取中..." class="earning-overview-wrapper earning-detail">
        <div class="title">{{pageTitle}}</div>
        <div class="top">
            <p>{{earningText}}</p>
            <div>
                <span class="money">{{total}}</span>
                <span> USDT</span>
                <!-- <span> &#8776; 0.00 BTC</span> -->
            </div>
        </div>
        <div class="list-filter-bar">
            <div class="filter-select">
                <a-select v-model="filter.coin" placeholder="货币">
                    <a-select-option v-for="(item, i) in coins" :value="item.value" :key="i">{{item.label}}</a-select-option>
                </a-select>
            </div>
        </div>
        <div class="list-wrapper">
            <div class="item-wrapper">
                <div class="th">
                    <span>时间日期</span>
                    <span class="text-right">收益</span>
                </div>
                <div class="tr" v-for="(item, i) in listData" :key="i">
                    <span>{{item.date}}</span>
                    <span class="text-right">{{item.gain}}</span>
                </div>
            </div>
        </div>
    </a-spin>
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            coins: [{
                label: 'ETH', value: 'eth'
            }],
            filter: {
                coin: 'eth'
            },
            listData: [],
            total: 0,
            gainTotal: 0,
            loading: false
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.getListData()
        })
    },
    computed: {
        pageTitle() {
            return this.formatType(0)
        },
        earningText() {
            return this.formatType(1)
        }
    },
    methods: {
        formatType(type = 0) {
            const id = Number(this.$route.params.id)
            switch (id) {
                case 0:
                    return type ? '总收益' : '收益总览'
                case 1:
                    return type ? '今日总收益' : '今日收益'
                case 2:
                    return type ? '昨日总收益' : '昨日收益'
                default:
                    return type ? '年化总收益' : '年化收益'
            }
        },
        getListData() {
            this.loading = true
            this.$axios({
                method: 'POST',
                url: '/api/order/income',
                params: {
                    sdate: moment(new Date('2020-04-18')).format('YYYY-MM-DD'),
                    edate: moment(new Date()).format('YYYY-MM-DD')
                },
                custom: {
                    vm: this
                }
            }).then(res => {
                this.loading = false
                if (res.code === 0) {
                    const data = res.data || {}
                    let total = 0
                    data.forEach(item => {
                        total += Number(item.gain)
                    })
                    this.listData = data
                    this.total = total.toFixed(6)
                }
            })
        }
    }
}
</script>

<style lang="less">
.earning-overview-wrapper {
    padding: 0 !important;
    display: block !important;
    .title {
        color: #000;
        font-size: .32rem;
        font-weight: bold;
        padding: 0 .4rem;
    }
    .top {
        padding: .3rem .4rem;
        font-size: .2rem;
        color: rgba(0, 0, 0, 0.35);
        p {
            margin-bottom: .1rem;
        }
        .money {
            font-size: .36rem;
            color: #000;
        }
    }
    .list-filter-bar {
        padding-top: .1rem !important;
    }
    .list-wrapper {
        .item-wrapper {
            padding-top: 0 !important;
            border-bottom: none !important;
            .th {
                color: #333;
                font-size: .24rem;
            }
            .th, .tr {
                height: .6rem;
                line-height: .6rem;
                border-bottom: 1px solid #f8f8f8;
                span {
                    width: 50%;
                }
            }
            .tr {
                color: #999;
            }
        }
    }
}
</style>
