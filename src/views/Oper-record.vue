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
                    <span>{{item.name || item.task_id}}</span>
                    <span class="text-center">{{item.created_at}}</span>
                    <span :class="[item.action === '开始任务' ? 'start' : 'stop', 'text-right']">{{item.action}}</span>
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
            this.loading = true
            this.$axios({
                url: '/api/task/log',
                custom: {
                    vm: this
                }
            }).then(res => {
                this.loading = false
                if (res.code === 0) {
                    this.listData = res.data || []
                }
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
        .item-wrapper {
            border-bottom: none !important;
        }
        padding: 0 !important;
        .th {
            color: #333 !important;
        }
        .th, .tr {
            align-items: center;
            padding-bottom: .06rem;
            border-bottom: 1px solid #f8f8f8 !important;
            span:nth-child(2) {
                width: 40% !important;
            }
            .start {
                color: #45BE87;
            }
            .stop {
                color: rgba(255, 77, 79, 0.8);
            }
        }
    }
}
</style>
