<template>
    <div class="recommend-wrapper">
        <div class="rule-wrapper">
            <p class="rule-title"><i></i><span>奖励规则</span><i></i></p>
            <div class="rule-content">
                <div class="th">
                    <span>等级</span>
                    <span>邀请人数</span>
                    <span>返佣比例</span>
                </div>
                <div class="tr" v-for="(row, i) in ruleText" :key="i">
                    <span v-for="cell in row" :key="cell">{{cell}}</span>
                </div>
                <p>备注：充值消费满4个ETH，算一个有效客户</p>
            </div>
        </div>
        <div class="rule-overview">
            <p class="rule-title"><i></i><span>我的奖励概况</span><i></i></p>
            <div class="overview-wrapper">
                <div class="invite-code clearfix">
                    <span>您的邀请码</span>
                    <span class="code">{{info.invite_code}}</span>
                    <a-button
                        size="small"
                        class="fr"
                        v-clipboard:copy="info.invite_code"
                        v-clipboard:success="copy">复制</a-button>
                </div>
                <a-button class="code-recom" @click="showModal">二维码邀请</a-button>
                <ul class="reward-wrapper">
                    <li>
                        <money-box text="奖励总览" :value="total" unit="ETH" :show-line="false" @click.native="toPage(1)"></money-box>
                    </li>
                    <li>
                        <money-box text="邀请明细" :show-line="false" :show-num="false" @click.native="toPage(2)"></money-box>
                    </li>
                    <li>
                        <a-button @click="show = true;">提现</a-button>
                    </li>
                </ul>
            </div>
        </div>
        <a-modal
            width="80%"
            v-model="visible"
            :footer="null"
            title="邀请码">
            <div id="qrCode"></div>
        </a-modal>
        <a-modal
            width="80%"
            v-model="show"
            cancelText="取消"
            okText="提交申请"
            @ok="handleOk"
            title="提现申请"
            wrapClassName="balance-modal">
            <a-input-number placeholder="提现金额" v-model="amount"></a-input-number>
        </a-modal>
    </div>
</template>

<script>
import MoneyBox from '@/components/earnings/money'
import { mapGetters } from 'vuex'
import { FETCH_MYDATA, CHANGE_RECOMDATA } from '@/store'
import QRCode from 'qrcodejs2'
export default {
    components: {
        MoneyBox
    },
    data() {
        return {
            ruleText: [
                [ 'VP1', '2', '10%' ],
                [ 'VP2', '4', '15%' ],
                [ 'VP3', '8', '20%' ],
                [ 'VP4', '16', '25%' ],
                [ 'VP5', '32', '30%' ],
                [ 'VP6', '64', '40%' ],
            ],
            info: {},
            href: '',
            visible: false,
            qrcode: null,
            show: false,
            amount: 0,
            total: 0
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (vm.MY_DATA) {
                vm.info = { ...vm.MY_DATA.info }
            }
            console.log(vm.RECOM_DATA)
            if (vm.RECOM_DATA) {
                vm.total = vm.RECOM_DATA.total || 0
            }
            vm.getRewardData()
            vm.getData()
            vm.getHost()
        })
    },
    computed: {
        ...mapGetters([ 'MY_DATA', 'RECOM_DATA' ])
    },
    methods: {
        getData() {
            this.$axios({
                url: '/api/user/info',
                custom: {
                    vm: this
                }
            }).then(res => {
                if (res.code === 0) {
                    const data = res.data || {}
                    this.info = { ...data }
                    this.$store.dispatch({
                        type: FETCH_MYDATA,
                        res: {
                            info: this.info
                        }
                    })
                }
            })
        },
        getRewardData() {
            this.$axios({
                url: '/api/user/reward',
                custom: {
                    vm:  this
                }
            }).then(res => {
                if (res.code === 0) {
                    const data = res.data || []
                    let total = 0
                    data.forEach(item => {
                        total += Number(item.amount)
                    })
                    this.total = Number(total.toFixed(2))
                    this.$store.dispatch({
                        type: CHANGE_RECOMDATA,
                        field: 'total',
                        res: this.total
                    })
                }
            })
        },
        getHost() {
            this.$axios({
                url: '/host'
            }).then(res => {
                if (res.code === 0)  {
                    this.href = res.data || window.location.origin
                }
            })
        },
        toPage(type) {
            if (type === 1) {
                this.$router.push({ name: 'Reward' })
            } else {
                this.$router.push({ name: 'RecommendDetail' })
            }
        },
        showModal() {
            this.visible = true
            this.$nextTick(() => {
                const ele = document.getElementById('qrCode')
                if (!this.qrcode) {
                    this.qrcode = new QRCode(ele, {
                        width: ele.clientWidth,
                        height: ele.clientWidth
                    })
                    this.qrcode.clear()
                    this.qrcode.makeCode(`${this.href}?code=${this.invite_code}`)
                }
            })
        },
        handleOk() {
            this.$axios({
                method: 'POST',
                url: '/api/withdraw/add',
                params: {
                    amount: this.amount || 0
                }
            }).then(res => {
                if (res.code === 0) {
                    this.$message.success('提现已申请')
                    this.show = false
                }
            })
        },
        copy() {
            this.$message.success('复制成功')
        }
    }
}
</script>

<style lang="less">
.recommend-wrapper {
    height: 100%;
    color: #fff;
    overflow-y: auto;
    background-color: #1951a3;
    & > div {
        padding: 0 .4rem;
    }
    .rule-title {
        padding: .4rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
            height: 1px;
            width: 1.2rem;
            display: inline-block;
            background-color: #fff;
            transform: scale(0.8);
        }
        span {
            margin: 0 .3rem;
        }
    }
    .rule-content {
        color: #333;
        padding: .2rem;
        font-size: .24rem;
        line-height: 2;
        border-radius: .2rem;
        background-color: #fff;
        .th, .tr {
            &.th {
                font-weight: bold;
            }
            display: flex;
            text-align: center;
            justify-content: space-between;
            span {
                width: calc(100% / 3);
            }
        }
        p {
            margin-top: .1rem;
            font-size: .2rem;
        }
    }
    .rule-overview {
        padding-bottom: .4rem;
        .overview-wrapper {
            padding: .2rem;
            border-radius: .2rem;
            background-color: #fff;
        }
        .invite-code {
            color: #999;
            padding: 0 .2rem;
            height: .8rem;
            line-height: .8rem;
            font-size: .24rem;
            border-radius: .1rem;
            position: relative;
            box-shadow: 0 0 2px #0565f7;
            button {
                position: absolute;
                top: 50%;
                right: 0.2rem;
                padding: 0 .2rem;
                border-radius: .4rem;
                border-color: #0565f7;
                transform: translateY(-50%);
            }
            .code {
                color: #0565f7;
                font-size: .32rem;
                margin-left: .1rem;
                vertical-align: top;
                line-height: .8rem;
                display: inline-block;
            }
        }
        .code-recom {
            width: 100%;
            color: #fff;
            margin: .4rem 0 .2rem;
            height: .7rem;
            line-height: .7rem;
            border-radius: .5rem;
            border-color: #1951a3;
            background-color: #1951a3;
        }
        .reward-wrapper {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            li {
                width: 25%;
                .money {
                    color: #333;
                }
                .money-desc {
                    color: #333;
                }
                button {
                    border-color: #0565f7;
                }
            }
        }
    }
}
</style>
