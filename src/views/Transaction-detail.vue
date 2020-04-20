<template>
    <a-spin :spinning="loading" :tip="tip" class="transaction-detail earning-detail">
        <div class="title">{{$route.name !== 'TransactionDetail' ? '昨日收益' : '交易明细'}}</div>
        <div class="top" v-if="$route.name !== 'TransactionDetail'">
            <div>
                <span class="money">0</span>
                <span> &#8776; 0.00 BTC</span>
            </div>
        </div>
        <div class="filter-bar">
            <div class="filter-select">
                <a-select v-model="filter.type" placeholder="全部" @change="changeHandle" allowClear>
                    <a-select-option v-for="item in limits" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
                </a-select>
            </div>
            <div class="filter-select">
                <a-select v-model="filter.status" placeholder="全部" @change="changeHandle" allowClear>
                    <a-select-option v-for="item in statusOpt" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
                </a-select>
            </div>
            <div class="filter-date">
                <a-locale-provider :locale="locale">
                    <a-date-picker v-model="filter.date" @change="changeHandle" placeholder="交易创建时间"></a-date-picker>
                </a-locale-provider>
            </div>
        </div>
        <div class="table-wrapper mt-10" ref="tableWrapper">
            <p v-if="listData.length === 0" class="no-data">暂无数据</p>
            <div class="item-wrapper" v-for="(item, i) in listData" :key="i">
                <div class="item-header">
                    <span :class="[formatContext(item, 1) === '卖出' && 'danger']">{{formatContext(item, 1)}}</span>
                    <span>{{item.symbol || 'eth'}}</span>
                    <span>{{item.created_at}}</span>
                    <span class="button">{{formatContext(item, 2)}}</span>
                </div>
                <div class="th">
                    <span>价格({{item.symbol || 'eth'}})</span>
                    <span>数量({{item.symbol || 'eth'}})</span>
                    <span>实际成交(btc)</span>
                </div>
                <div class="tr">
                    <span>{{(item.price || 0.00).toFixed(6)}}</span>
                    <span>{{(item.amount || 0).toFixed(6)}}</span>
                    <span>{{formatNum(item)}}</span>
                </div>
            </div>
        </div>
    </a-spin>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
export default {
    data() {
        return {
            locale: zh_CN,
            pageNo: 1,
            size: 10,
            type: '',
            status: '',
            date: '',
            loading: false,
            tip: '获取数据中...',
            filter: {},
            listData: [],
            noData: false,
            limits: [{
                label: '买入', value: 'buy-limit'
            }, {
                label: '卖出', value: 'sell-limit'
            }],
            statusOpt: [{
                label: '撤销', value: 'cancellation'
            }, {
                label: '交易', value: 'trade'
            }, {
                label: '新建', value: 'creation'
            }]
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.getListData()
        })
    },
    mounted() {
        const tableWrapper = this.$refs.tableWrapper
        const tHeight = tableWrapper.clientHeight
        const itemHeight = 108
        tableWrapper.onscroll = () => {
            const scrollHeigh = tableWrapper.scrollHeight
            const scrollTop = tableWrapper.scrollTop
            if (scrollHeigh - scrollTop - tHeight <= itemHeight * 2) {
                console.log('加载')
                if (!this.lock && !this.noData) {
                    this.lock = true
                    this.pageNo += 1
                    this.getListData()
                }
            }
        }
    },
    methods: {
        getListData() {
            this.loading = true
            this.$axios({
                url: '/api/order/list',
                params: {
                    pageNo: this.pageNo || 1,
                    size: this.size,
                    type: this.filter.type,
                    status: this.filter.status,
                    date: this.filter.date ? moment(this.filter.date).format('YYYY-MM-DD') : ''
                },
                custom: {
                    vm: this
                }
            }).then(res => {
                this.loading = false
                if (res.code === 0) {
                    const result = res.data || {}
                    const data = result.data || []
                    if (this.listData.length) {
                        if (data.length) {
                            this.listData = [ ...this.listData, ...data ]
                        } else {
                            this.noData = true
                        }
                        this.lock = false
                    } else {
                        this.listData = [ ...data ]
                    }
                }
            })
        },
        changeHandle() {
            this.listData = []
            this.pageNo = 1
            this.getListData()
        },
        formatContext(data, type) {
            let temp = [], field = ''
            if (type === 1) {
                temp = this.limits
                field = 'type'
            } else if (type === 2) {
                temp = this.statusOpt
                field = 'status'
            }
            for (let item of temp) {
                if (data[field] === item.value) {
                    return item.label
                }
            }
        },
        formatNum(item) {
            return (item.price * item.amount).toFixed(6)
        }
    }
}
</script>

<style lang="less">
.transaction-detail {
    & > div {
        background: #fff;
    }
    .title {
        color: #000;
        font-size: .32rem;
        font-weight: bold;
        padding: .2rem .4rem !important;
    }
    .filter-bar {
        display: flex;
        padding: 0 .4rem;
        justify-content: space-between;
        & > div {
            width: 25%;
            &.filter-date {
                width: 40%;
            }
            .ant-select {
                width: 100%;
            }
            .ant-select-selection, .ant-input {
                border: none;
                &:focus, &:active, &:hover {
                    outline: none;
                    box-shadow: none;
                }
            }
        }
    }
    .table-wrapper {
        padding: 0 .4rem .3rem;
        height: calc(100% - 0.32rem - 0.64rem - 0.2rem - 0.5rem - 4px) !important;
        overflow-y: auto;
        .item-wrapper {
            padding: .3rem 0;
            border-bottom: 1px solid #f8f8f8;
        }
        .th, .tr {
            width: 100%;
            display: flex;
            justify-content: space-between;
            font-size: .2rem;
            margin-bottom: .1rem;
            span {
                width: calc(100% / 3);
                &:nth-child(3) {
                    text-align: right;
                }
            }
        }
        .th {
            color: rgba(0, 0, 0, 0.35);
        }
    }
}
</style>
