<template>
    <div class="rate-card">
        <div v-if="rateType" class="rate-text-content">
            <p class="trans-type">{{data.title || '交易类型'}}</p>
            <p class="tatic-type"><span>{{data.name}}</span> 高频策略</p>
            <p class="ratio"><span>{{data.annual || '0.00'}}</span>%</p>
            <p class="time">近一月年化回报率</p>
        </div>
        <div v-else class="rate-content">
            <p class="ratio"><span>{{data.annual || '0.00'}}</span>%</p>
            <p class="time"><span>近一月年化率</span></p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        rateType: {
            type: Boolean,
            default: true // true 有文案 false 没有文案
        },
        data: {
            type: Object,
            default: () => ({})
        }
    }
}
</script>

<style scoped lang="less">
.rate-card {
    &:active {
        opacity: 0.75;
    }
    .trans-type  {
        font-size: 0.24rem;
        color: #000;
    }
    .tatic-type {
        font-size: 0.24rem;
        color: #000;
        span {
            color: rgba(255, 77, 79, 0.8);
        }
    }
    .ratio {
        color: #db3934;
        font-size: 0.42rem;
        line-height: 1.4;
    }
    .time {
        color: rgba(0, 0, 0, .35);
        font-size: 0.2rem;
        transform: scale(0.8);
        transform-origin: inherit;
    }
    .rate-text-content {
        text-align: center;
    }
    .rate-content {
        .ratio {
            font-size: 0.36rem;
        }
        .time {
            transform-origin: left;
        }
    }
}
</style>
