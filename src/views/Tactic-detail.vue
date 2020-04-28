<template>
    <a-spin :spinning="loading" :tip="tip" class="tactic-detail">
        <div class="top">
            <div class="title-wrapper">
                <p class="title" :class="[info.name && 'title-icon']"><i v-if="info.name"></i>{{info.name || '标题'}}</p>
                <p>{{info.short || '短标题'}}</p>
                <div><span>{{info.price || 0}}</span>ETH</div>
            </div>
            <div class="rate-wrapper">
                <div class="clearfix">
                    <rate-card :data="info" class="fl" :rate-type="false"></rate-card>
                    <div class="fl right">
                        <p><span>{{info.suggest}}</span><span v-if="Number(info.suggest)">天</span></p>
                        <p class="suggest">建议持有天数</p>
                    </div>
                </div>
            </div>
            <div class="desc-wrapper">
                <div class="clearfix">
                    <div class="fl" v-for="(item, i) in tags" :key="i">
                        <span>{{item}}</span>
                    </div>
                </div>
            </div>
            <p class="warning-tip">以上数据来自于大数据统计仅供参考，不代表实际数据。</p>
        </div>
        <div class="tabs-wrapper mt-10">
            <a-tabs :defaultActiveKey="tabName" @change="changeTab">
                <a-tab-pane tab="策略介绍" key="1">
                    <intro-box :data="info"></intro-box>
                </a-tab-pane>
                <a-tab-pane tab="性能分析" key="2">
                    <analysis-box :data="info"></analysis-box>
                </a-tab-pane>
                <a-tab-pane tab="关于策略" key="3">
                    <about-box :data="info"></about-box>
                </a-tab-pane>
            </a-tabs>
        </div>
        <div class="bottom" v-if="info.status">
            <a-button type="primary" @click="showDrawer">开启合约量化</a-button>
        </div>
        <position-drawer @update="updateData"></position-drawer>
        <a-modal
            width="80%"
            v-model="visible"
            cancelText="取消"
            okText="购买"
            @ok="handleBuy"
            title="购买策略"
            wrapClassName="buy-modal">
            <div class="clearfix item-row">
                <span class="fl">策略价格：</span>
                <span class="fr">{{info.price || 0}} ETH</span>
            </div>
            <div class="clearfix item-row">
                <span class="fl">钱包余额：</span>
                <span class="fr">{{userInfo.balance || 0}} ETH</span>
            </div>
            <div class="clearfix balance item-row">
                <span class="fl">结算：</span>
                <span class="fr">{{(userInfo.balance || 0) - (info.price || 0)}} ETH</span>
            </div>
        </a-modal>
    </a-spin>
</template>

<script>
import RateCard from '@/components/rate-card'
import IntroBox from '@/components/tactic-detail/intro'
import AnalysisBox from '@/components/tactic-detail/analysis'
import AboutBox from '@/components/tactic-detail/about'
import PositionDrawer from '@/components/tactic-detail/position-drawer'
export default {
    components: {
        RateCard,
        IntroBox,
        AnalysisBox,
        AboutBox,
        PositionDrawer
    },
    data() {
        return {
            userInfo: {},
            info: {},
            form: {},
            tabName: '1',
            loading: false,
            tip: '',
            taskStatus: 0,
            akey: '',
            visible: false,
            amount: 0,
            apiAmount: {}
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.getAllData()
        })
    },
    computed: {
        tags() {
            if (this.info.tags) {
                return this.info.tags.split('|')
            }
            return []
        }
    },
    methods: {
        getAllData() {
            const arr = [
                this.$axios({
                    url: '/api/user/info',
                    custom: {
                        vm: this
                    }
                }),
                this.$axios({
                    url: '/api/tactics/detail',
                    params: {
                        id: this.$route.params.id
                    },
                    custom: {
                        vm: this
                    }
                })
            ]
            this.tip = '获取策略信息中...'
            this.loading = true
            Promise.all(arr).then(res => {
                this.loading = false
                if (res && res.length) {
                    const [ res1, res2 ] = res
                    if (res1.code === 0) {
                        const data = res1.data || {}
                        this.userInfo = { ...data }
                    }
                    if (res2.code === 0) {
                        this.info = res2.data || {}
                        this.form = {
                            symbol_1: this.info.symbol_1,
                            symbol_2: this.info.symbol_2
                        }
                        if (this.info.exchange) {
                            this.getTaskDetail()
                            this.getApi()
                            this.getBalance()
                        }
                    }
                }
            })
        },
        getApi() {
            this.$axios({
                url: '/api/exchange/get',
                params: {
                    exchange: this.info.exchange
                },
                custom: {
                    vm: this
                }
            }).then(res => {
                if (res.code === 0) {
                    const data = res.data || {}
                    this.akey = data.access_key || ''
                    this.updateHandler()
                }
            })
        },
        getTaskDetail() {
            this.$axios({
                url: '/api/task/detail',
                params: {
                    exchange: this.info.exchange
                }
            }).then(res => {
                if (res.code === 0) {
                    const data = res.data || {}
                    this.form = Object.assign(this.form, data)
                    this.updateHandler()
                    this.getTaskStatus()
                } else {
                    this.taskStatus = -1
                }
            })
        },
        getTaskStatus() {
            this.$axios({
                url: '/api/task/status',
                params: {
                    task: this.form.id
                }
            }).then(res => {
                if (res.code === 0) {
                    if (res.data) {
                        this.taskStatus = res.data.status
                    }
                } else {
                    this.taskStatus = -1
                }
                this.updateHandler()
            })
        },
        formatTag() {
            if (this.info.tag) {
                let tag = this.info.tag || ''
                return tag.split('|')
            }
            return []
        },
        changeTab(key) {
            this.tabName = key
        },
        // 开启合约量化
        showDrawer() {
            const tactic = this.userInfo.tactics.substring(1, this.userInfo.tactics.length - 1).split('|')
            if (tactic.includes(String(this.info.id))) {
                this.$root.$emit('SHOW_POSITION_DRAWER', {
                    data: { ...this.form, akey: this.akey, name: this.info.name, ...this.apiAmount } || {},
                    taskStatus: this.taskStatus
                })
            } else {
                if (this.userInfo.balance < this.info.price) {
                    this.$message.warning('当前余额不足，请先充值')
                    if (sessionStorage.getItem('TK')) {
                        // 弹出充值 弹窗
                        const timer = setTimeout(() => {
                            clearTimeout(timer)
                            this.$router.push({ name: 'WalletDetail' })
                        }, 1000)
                    } else {
                        this.$rotuer.push({ name: 'Login' })
                    }
                } else {
                    this.visible = true
                }
            }
        },
        // 购买策略
        handleBuy() {
            this.tip = '购买处理中...'
            this.loading = true
            this.$axios({
                url: '/api/user/pay',
                params: {
                    task: this.info.id
                },
                custom: {
                    vm: this
                }
            }).then(res => {
                this.loading = false
                if (res.code === 0) {
                    this.visible = false
                    this.$message.success('购买成功')
                    this.getAllData()
                }
            })
        },
        getBalance() {
            this.$axios({
                url: '/api/exchange/balance',
                params: {
                    exchange: this.info.exchange,
                    symbol1: 'eth',
                    symbol2: 'btc'
                }
            }).then(res => {
                if (res && res.code === 0) {
                    this.apiAmount = res.data || {}
                    this.updateHandler()
                }
            })
        },
        updateHandler() {
            this.$root.$emit('UPDATE_POSITION_DATA', {
                data: { ...this.form, akey: this.akey, name: this.info.name, ...this.apiAmount } || {},
                taskStatus: this.taskStatus
            })
        },
        updateData() {
            this.getAllData()
        }
    }
}
</script>

<style lang="less">
.tactic-detail {
    position: relative;
    .top {
        background-color: #fff;
        padding-bottom: .2rem !important;
        .title-wrapper {
            padding-bottom: .06rem;
            border-bottom: 1px solid #f8f8f8;
            position: relative;
            .title {
                color: #00152a;
                font-weight: 600;
                position: relative;
                &.title-icon {
                    padding-left: .4rem;
                }
                i {
                    position: absolute;
                    left: 0;
                    top: 50%;
                    width: 0.4rem;
                    height: 0.4rem;
                    display: inline-block;
                    transform: translateY(-50%);
                    background: url('../assets/img/icon-huobi-x1.jpg') no-repeat;
                    background-size: contain;
                    background-position: left;
                }
            }
            p:nth-child(2) {
                color: #00152a;
                font-size: .24rem;
                margin-top: .1rem;
                transform: scale(0.9);
                transform-origin: top left;
            }
            div {
                position: absolute;
                right: .4rem;
                top: 0;
                span {
                    font-size: .48rem;
                    font-weight: bold;
                }
            }
        }
        .rate-wrapper, .desc-wrapper {
            .clearfix {
                .fl {
                    width: 50%;
                }
            }
        }
        .rate-wrapper {
            padding-top: .3rem;
            .rate-card {
                .ratio {
                    font-size: .24rem;
                    span {
                        font-size: .42rem;
                    }
                }
            }
            .right {
                p {
                    color: #012640;
                    line-height: 1.4;
                    font-size: 0.24rem;
                    span:first-child {
                        font-size: 0.42rem;
                    }
                }
                .suggest {
                    color: rgba(0, 0, 0, .35);
                    font-size: 0.2rem;
                    transform: scale(0.8);
                    transform-origin: left;
                }
            }
        }
        .desc-wrapper {
            color: #212a2f;
            padding-bottom: .3rem;
            span {
                display: inline-block;
                font-size: .2rem;
                transform: scale(.9);
                transform-origin: top left;
            }
        }
        .warning-tip {
            height: .6rem;
            color: #d29b65;
            font-size: .2rem;
            line-height: .6rem;
            padding: 0 .2rem;
            background-color: #fff6ef;
        }
    }
    .bottom {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 9;
        width: 100%;
        padding: .2rem .4rem !important;
        background-color: #fff;
        button {
            width: 100%;
            height: .8rem;
            border-radius: 0;
            border-color: #19458e;
            background-color: #19458e;
        }
    }
}
.buy-modal {
    .item-row {
        height: .7rem;
        line-height: .7rem;
    }
    .balance {
        border-top: 1px solid #f8f8f8;
    }
}
</style>
