<template>
    <div class="money-box">
        <p v-if="showNum" class="money">
            {{value}}<span v-if="unit">{{unit}}</span>
        </p>
        <p class="money-desc clearfix">{{text}}<a-icon v-if="showArrow" class="fr" type="right" /></p>
        <div class="line-bar" v-if="showLine"></div>
    </div>
</template>

<script>
export default {
    props: {
        showNum: {
            type: Boolean,
            default: true
        },
        showLine: {
            type: Boolean,
            default: true
        },
        showArrow: {
            type: Boolean,
            default: true
        },
        text: {
            type: String,
            default: '收益总览'
        },
        value: {
            type: Number,
            default: 0
        },
        unit: {
            type: String,
            default: 'USDT'
        }
    }
}
</script>

<style scoped lang="less">
.money-box {
    .money {
        color: #00233d;
        font-size: .56rem;
        span {
            margin-left: .1rem;
            font-size: .24rem;
        }
    }
    .money-desc {
        color: #000;
        font-size: .24rem;
        position: relative;
        .anticon-right {
            color: #999;
            font-size: .2rem;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
        }
    }
    .line-bar {
        width: 100%;
        height: 1px;
        margin-top: .4rem;
        position: relative;
        background-color: #dfe4e8;
        &:after {
            content: '';
            width: 20%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
            background-color: #aebbc4;
        }
    }
}
</style>
