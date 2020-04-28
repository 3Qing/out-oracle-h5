<template>
    <a-spin :spinning="loading" tip="获取中" class="earning-detail reward-wrapper">
        <div class="title">奖励总览</div>
        <div class="top">
            <p>总金额</p>
            <div>
                <span class="money">{{total || 0}}</span>
                <span> ETH</span>
            </div>
        </div>
        <div class="list-wrapper">
            <div class="item-wrapper">
                <div class="th">
                    <span>日期时间</span>
                    <span>奖励比例</span>
                    <span>金额</span>
                </div>
                <p class="no-data" v-if="!listData.length">暂无数据</p>
                <div class="tr"  v-for="item in listData" :key="item.id">
                    <span>{{item.created_at || '-'}}</span>
                    <span>{{item.per || 0}}%</span>
                    <span>{{Number(item.amount).toFixed(6) || 0}}</span>
                </div>
            </div>
        </div>
    </a-spin>
</template>

<script>
export default {
    data() {
        return {
            listData: [],
            total: 0,
            loading: false
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.getData()
        })
    },
    methods: {
        getData() {
            this.loading = true
            this.$axios({
                url: '/api/user/reward',
                custom: {
                    vm:  this
                }
            }).then(res => {
                this.loading = false
                if (res.code === 0) {
                    const data = res.data || []
                    let total = 0
                    data.forEach(item => {
                        total += Number(item.amount)
                    })
                    this.total = total.toFixed(2)
                    this.listData = [ ...data ]
                }
            })
        }
    }
}
</script>

<style lang="less">
.reward-wrapper {
    height: 100%;
    & > div {
        background-color: #fff;
    }
    .item-wrapper {
        border-bottom: none !important;
    }
    .th {
        color: #1951a3 !important;
        font-size: .28rem !important;
    }
    .th, .tr {
        height: .7rem;
        line-height: .7rem;
        border-bottom: 1px solid #f8f8f8;
        span {
            width: 30% !important;
            &:nth-child(1) {
                width: 40% !important;
            }
            &:nth-child(2) {
                text-align: right;
            }
        }
    }
}
</style>
