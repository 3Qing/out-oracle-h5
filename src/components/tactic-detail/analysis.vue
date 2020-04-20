<template>
    <div class="analysis-wrapper pane-wrapper">
        <p class="wrapper-title">性能分析</p>
        <div class="row-item" v-for="(item, i) in allData" :key="i">
            <span class="item-label">{{item.label}}</span>
            <span>{{data[item.field] || 0}}{{item.unit}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            allData: [{
                label: '最低仓位',
                field: 'min',
                unit: 'ETH',
                value: '0.15 BTC'
            }, {
                label: '排队时间',
                unit: '天',
                value: '约7天'
            }, {
                label: '日均交易笔数',
                field: 'trade',
                unit: '笔',
                value: '2.1笔'
            }, {
                label: '止盈',
                unit: '%',
                value: '12%'
            }, {
                label: '止损',
                unit: '%',
                value: '15.7%'
            }, {
                label: '历史胜率',
                unit: '%',
                value: '54.24%'
            }, {
                label: '夏普比率',
                unit: '%',
                value: '1.25'
            }]
        }
    }
}
</script>

<style lang="less">
.analysis-wrapper {
    .row-item {
        height: .8rem;
        line-height: .8rem;
        .item-label {
            display: inline-block;
            width: 2.8rem;
            color: #999;
        }
    }
}
</style>
