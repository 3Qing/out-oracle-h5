<template>
    <div class="earnings-wrapper main-wrapper">
        <ul class="top earning-overview">
            <li>
                <money-box :value="incomeData.total" @click.native="toPage(1, 0)"></money-box>
            </li>
            <li>
                <money-box text="交易明细" :show-num="false" @click.native="toPage(2)"></money-box>
            </li>
        </ul>
        <ul class="middle earning-type">
            <li>
                <money-box text="今日收益" :value="incomeData.today" :show-line="false" :show-arrow="false"></money-box>
            </li>
            <li>
                <money-box text="昨日收益" :value="incomeData.yesterday" :show-line="false" :show-arrow="false"></money-box>
            </li>
            <li>
                <money-box text="年化收益" unit="%" :value="incomeData.years" :show-line="false" :show-arrow="false"></money-box>
            </li>
        </ul>
        <div class="ad-wrapper mt-10">
            <img src="../assets/img/banner.png" alt="广告">
        </div>
        <!-- <div class="data-container">
            <tactic-list :data="listData"></tactic-list>
        </div> -->
    </div>
</template>

<script>
import MoneyBox from '@/components/earnings/money'
// import TacticList from '@/components/transaction/list'
import TabMixin from '@/components/mixins/tab-mixin'
import { CHANGE_EARNDATA } from '@/store'
import { mapGetters } from 'vuex'
export default {
    components: {
        MoneyBox
        // TacticList
    },
    data() {
        return {
            data: {
                total: 0,
                listData: []
            }
        }
    },
    mixins: [ TabMixin ],
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (vm.EARN_DATA) {
                if (vm.EARN_DATA.incomeData) {
                    vm.incomeData = vm.EARN_DATA.incomeData
                }
                if (vm.EARN_DATA.listData) {
                    vm.listData = vm.EARN_DATA.listData
                }
            }
            vm.getIncomeData(() => {
                vm.$store.dispatch({
                    type: CHANGE_EARNDATA,
                    field: 'incomeData',
                    res: vm.incomeData
                })
            })
            vm.getTacticList(() => {
                vm.$store.dispatch({
                    type: CHANGE_EARNDATA,
                    field: 'listData',
                    res: vm.listData
                })
            })
        })
    },
    computed: {
        ...mapGetters(['EARN_DATA'])
    },
    methods: {
        toPage(type, id) {
            if (type === 1) {
                this.$router.push({ name: 'EarningOverview', params: { id } })
            } else {
                this.$router.push({ name: 'TransactionDetail' })
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
    .middle {
        margin-top: .4rem;
    }
}
</style>
