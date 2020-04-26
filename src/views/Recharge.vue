<template>
    <a-spin :spinning="loading" tip="获取中" class="earning-detail reward-wrapper">
        <div class="title">充值记录</div>
        <div class="top">
            <p>总充值金额</p>
            <div>
                <span class="money">{{total || 0}}</span>
                <span> ETH</span>
            </div>
        </div>
        <div class="list-wrapper">
            <div class="item-wrapper">
                <div class="th">
                    <span>日期时间</span>
                    <span>金额(ETH)</span>
                </div>
                <p class="no-data" v-if="!listData.length">暂无数据</p>
                <div class="tr"  v-for="item in listData" :key="item.id">
                    <span>{{item.created_at || '-'}}</span>
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
            total: 0,
            loading: false,
            listData: []
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
                url: '/api/withdraw/list'
            }).then(res => {
                this.loading = false
                if (res.code === 0) {
                    const data = res.data || []
                    let total = 0
                    data.forEach(item => {
                        total += item.amount
                    })
                    this.listData = [ ...data ]
                    this.total = Number(total).toFixed(6)
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
