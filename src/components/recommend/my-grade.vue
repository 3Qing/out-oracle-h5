<template>
    <div class="my-grade">
        <div class="rule-wrapper">
            <p class="grade">Lv{{data.level}}</p>
            <p class="text">当前等级</p>
            <p class="number">{{levels[data.level].ratio}}</p>
            <p class="text">分佣比例</p>
            <p class="text rule-tip">达标后在周期结束后自动升级</p>
            <div class="next-grade">
                升级至Lv{{maxLevel}}可享受{{levels[maxLevel].ratio}}分佣比例
            </div>
        </div>
        <div class="grow-wrapper mt-10">
            <p class="title">本期等级成长进度</p>
            <div class="progress-wrapper">
                <a-progress :percent="percent"></a-progress>
                <span class="current text-center" :style="style">{{curNumber}}人</span>
                <span class="target text-center" v-if="maxLevel < 6">Lv{{maxLevel}}目标:{{levels[maxLevel].number}}人</span>
            </div>
            <p class="grade-tip text-center">已达标Lv{{data.level}}等级要求，继续Lv{{maxLevel}}冲刺</p>
            <div class="tran-number text-center">
                本期有效交易人数<span>{{curNumber}}</span>人
            </div>
            <!-- <div class="ps">
                <p>Lv1等级目标：有效交易0人</p>
                <p>Lv2等级目标：有效交易10人</p>
            </div> -->
        </div>
        <div class="footer mt-10">
            <p class="title">其他说明</p>
            <p>1.等级越高享有的好友手续费分佣比例越高。</p>
            <p>2.升级方式：每个等级皆有等级目标，达到更高级别的等级目标，即可升级。</p>
            <p>3.等级下降：连续6个周期未达标当前等级的等级目标，将予以降级。</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => ({
                level: 1,
                referrer_count: 0
            })
        }
    },
    data() {
        return {
            levels: {
                0: { number: 0, ratio: '0%' },
                1: { number: 2, ratio: '10%' },
                2: { number: 4, ratio: '15%' },
                3: { number: 8, ratio: '20%' },
                4: { number: 16, ratio: '25%' },
                5: { number: 32, ratio: '30%' },
                6: { number: 64, ratio: '40%' }
            }
        }
    },
    computed: {
        maxLevel() {
            return this.data.level + 1 >= 6 ? 6 : this.data.level + 1
        },
        curNumber() {
            if (this.data.referrer_count === 0) {
                return 0
            } else {
                return this.data.referrer_count - this.levels[this.data.level].number
            }
        },
        percent() {
            if ((this.curNumber / this.levels[this.maxLevel].number) >= 1) {
                return 100
            } else {
                return parseInt(this.curNumber / this.levels[this.maxLevel].number)
            }
        },
        style() {
            return { left: `${this.percent}%` }
        }
    }
}
</script>

<style lang="less">
.my-grade {
    & > div {
        padding: .2rem .4rem;
        background-color: #fff;
    }
    .rule-wrapper {
        color: @primary-color;
        .grade {
            font-size: .36rem;
        }
        .text {
            color: #ccc;
            font-size: .2rem;
            padding: .1rem 0;
        }
        .rule-tip {
            color: @primary-color;
            padding: 0 0 .1rem;
        }
        .next-grade {
            color: #ccc;
            font-size: .2rem;
            padding-top: .2rem;
            border-top: 1px solid #f8f8f8;
        }
    }
    .grow-wrapper {
        .title {
            color: #333;
            font-size: .32rem;
        }
        .expire-time {
            color: #aaa;
            padding: .1rem 0 .2rem;
        }
        .progress-wrapper {
            margin: .6rem  0 .8rem;
            position: relative;
            .ant-progress-outer {
                margin: 0;
                padding: 0;
                .ant-progress-bg {
                    background-color: @primary-color;
                }
            }
            .ant-progress-text {
                display: none;
            }
            .current, .target {
                position: absolute;
                height: .4rem;
                font-size: .2rem;
                line-height: .4rem;
                display: inline-block;
                color: #fff;
                border-radius: 4px;
                &::after {
                    content: '';
                    display: block;
                    width: 0;
                    height: 0;
                    position: absolute;
                }
            }
            .current {
                left: 0;
                top: -.5rem;
                width: .6rem;
                background-color: @primary-color;
                &::after {
                    border: .1rem solid transparent;
                    border-top-color: @primary-color;
                    left: 50%;
                    bottom: -.18rem;
                    transform: translateX(-50%);
                }
            }
            .target {
                bottom: -.5rem;
                right: 0;
                width: 2rem;
                color: @primary-color;
                background-color: #f0f5fb;
                &::after {
                    border: .1rem solid transparent;
                    border-bottom-color: #f0f5fb;
                    right: 0;
                    top: -.18rem;
                }
            }
        }
        .grade-tip {
            width: 80%;
            padding: .15rem 0;
            margin: 1rem auto .5rem;
            border-radius: 4px;
            background-color: #f8f8f8;
        }
        .tran-number {
            color: #333;
            padding: 0 0 .4rem;
            border-bottom: 1px solid #f8f8f8;
            span {
                font-size: .32rem;
                color: @primary-color;
            }
        }
        .ps {
            padding-top: .2rem;
            color: #aaa;
            font-size: .24rem;
        }
    }
    .footer {
        .title {
            color: #333;
            font-size: .32rem;
            margin-bottom: .1rem;
        }
        p {
            color: #aaa;
            font-size: .24rem;
        }
    }
}
</style>
