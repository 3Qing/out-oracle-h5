<template>
    <a-spin :spinning="loading" tip="获取中" class="main-wrapper oper-record">
        <p class="title">操作记录</p>
        <div class="list-wrapper">
            <div class="item-wrapper">
                <div class="th">
                    <span>策略标题</span>
                    <span class="text-center">时间</span>
                    <span class="text-right">操作</span>
                </div>
                <p class="no-data" v-if="!listData.length">暂无数据</p>
                <div class="tr" v-for="(item, i) in listData" :key="i">
                    <span>{{item.date}}</span>
                    <span class="text-center">{{item.gain}}</span>
                    <span class="text-right">{{item.gain}}</span>
                </div>
            </div>
        </div>
    </a-spin>
</template>

<script>
export default {
    data() {
        return {
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
            this.$axios({
                url: '/api/task/log',
                params: {
                    task: this.$route.params.id
                },
                custom: {
                    vm: this
                }
            }).then(res => {
                console.log(res)
            })
        }
    }
}
</script>

<style lang="less">
.oper-record {
    .title {
        color: #000;
        font-size: 0.32rem;
        font-weight: bold;
    }
    .list-wrapper {
        padding: 0 !important;
        .th {
            color: #333 !important;
        }
    }
}
</style>
