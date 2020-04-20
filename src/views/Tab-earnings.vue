<template>
    <div class="earnings-wrapper main-wrapper">
        <ul class="top earning-overview">
            <li>
                <money-box @click.native="toPage(1)"></money-box>
            </li>
            <li>
                <money-box text="交易明细" :show-num="false" @click.native="toPage(2)"></money-box>
            </li>
        </ul>
        <ul class="middle earning-type">
            <li>
                <money-box text="昨日收益" :show-line="false" @click.native="toPage"></money-box>
            </li>
            <li>
                <money-box text="30天收益" :show-line="false" @click.native="toPage"></money-box>
            </li>
            <li>
                <money-box text="年化收益" :show-line="false" @click.native="toPage"></money-box>
            </li>
        </ul>
        <div class="ad-wrapper mt-10">
            <img src="../assets/img/banner.png" alt="广告">
        </div>
        <div class="mt-10 list-wrapper">
            <tactic-list></tactic-list>
        </div>
    </div>
</template>

<script>
import MoneyBox from '@/components/earnings/money'
import TacticList from '@/components/transaction/list'
export default {
    components: {
        MoneyBox,
        TacticList
    },
    methods: {
        toPage(type) {
            if (type === 1) {
                this.$router.push({ name: 'EarningOverview' })
            } else if (type === 2) {
                this.$router.push({ name: 'TransactionDetail' })
            } else {
                this.$router.push({ name: 'EarningDetail' })
            }
        }
    }
} 
</script>

<style lang="less">
.earnings-wrapper {
    height: 100%;
    background-color: #fff;
    .ad-wrapper {
        width: 100%;
        height: 2.4rem;
        margin-top: .4rem;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .list-wrapper {
        padding-top: 0.1rem;
    }
}
</style>
