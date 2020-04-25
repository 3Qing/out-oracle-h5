<template>
    <a-spin :spinning="loading" :tip="tip" class="my-wrapper main-wrapper">
        <div class="user-box" @click="login">
            <div class="avatar">
                <img :src="info.avatar || require('../assets/img/banner.png')" alt="头像">
            </div>
            <div class="user-wrapper">
                <div class="top">
                    <span class="account">{{info.phone || '手机号'}}</span>
                    <span class="community" v-if="false">{{info.referrer}}</span>
                </div>
                <div class="uid">
                    <p>UID:{{info.id || '-'}}</p>
                    <i></i>
                </div>
            </div>
            <div class="icon-arrow-right" @click="toPage">
                <a-icon type="right"></a-icon>
            </div>
        </div>
        <ul class="earning-overview money-wrapper">
            <li>
                <money-box :value="incomeData.total" @click.native="toPage(1, 0)"></money-box>
            </li>
        </ul>
        <ul class="earning-type">
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
        <div class="oper-list clearfix">
            <div class="oper-item fl" v-for="(item, i) in operList" :key="i" @click="clickHandler(item)">
                <div class="icon-cover">
                    <img :src="item.icon">
                </div>
                <p>{{item.label}}</p>
            </div>
        </div>
        <ul class="earning-overview" style="margin-top: .3rem">
            <li>
                <span>资金：{{info.balance || 0}} ETH</span>
            </li>
            <li class="text-right">
                <a-button size="small" type="primary" @click="getPay">充值</a-button>
            </li>
        </ul>
        <div class="ad-wrapper">
            <img :src="banner.url">
        </div>
        <div class="list-wrapper">
            <tactic-list :data="listData"></tactic-list>
        </div>
        <a-modal
            width="80%"
            v-model="visible"
            @ok="handleOk"
            cancelText="取消"
            okText="确定"
            :title="title">
            <p>{{this.content}}</p>
        </a-modal>
        <a-modal 
            width="80%"
            v-model="show"
            wrapClassName="wallet-modal"
            :closable="false"
            :footer="null">
            <p class="ellipsis">账户余额：{{Number(this.info.balance).toFixed(6)}} ETH</p>    
            <div id="qrCode"></div>
            <p class="wallet o-link">{{this.info.wallet}}</p>
            <div class="btn-group text-center">
                <a-button @click="show = false">取消</a-button>
                <a-button type="primary" @click="handleWallet">已充值</a-button>
            </div>
            <ul>
                <li>注意事项：</li>
                <li>充值前请认真核实您的推荐人是否正确</li>
                <li>请勿充值任何非以太坊ETH数字资产</li>
                <li>每次最小充值金额：0.01 ETH</li>
                <li>充值成功后六次网络确认后（3-5分钟）到账</li>
                <li>充值地址追踪按钮可以查看区块链到账情况</li>
            </ul>
        </a-modal>
    </a-spin>
</template>

<script>
import TacticList from '@/components/transaction/list'
import MoneyBox from '@/components/earnings/money'
import { mapGetters } from 'vuex'
import { FETCH_MYDATA } from '@/store'
import tabMixin from '@/components/mixins/tab-mixin'
import QRCode from 'qrcodejs2'
export default {
    components: {
        MoneyBox,
        TacticList
    },
    data() {
        return {
            info: {
                id: '',
                phone: '',
                referrer: ''
            },
            listData: [],
            show: false,
            visible: false,
            loading: false,
            tip: '',
            title: '',
            content: '',
            banner: {
                url: require('../assets/img/banner.png')
            },
            operList: [{
                label: '操作记录',
                routeName: 'OperRecord',
                params: { id: 0 },
                icon: require('../assets/img/icon-oper-record.jpg')
            }, {
                label: 'API管理',
                routeName: 'ApiManager',
                icon: require('../assets/img/icon-api-import.jpg')
            }]
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (vm.MY_DATA) {
                vm.info = { ...(vm.MY_DATA.info || {}) }
                vm.listData = [ ...(vm.MY_DATA.listData || []) ]
            }
            if (vm.BANNER) {
                vm.banner = [ ...vm.BANNER ][0]
            }
            vm.getData()
            vm.getBanner()
            vm.getTacticList()
            vm.getIncomeData()
        })
    },
    mixins: [ tabMixin ],
    computed: {
        ...mapGetters([ 'MY_DATA', 'BANNER' ]),
        balance() {
            if (this.info.balance) {
                return Number(this.info.balance).toFixed(6)
            }
            return 0
        }
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
                    if (this.$route.query.ob) {
                        this.getPay()
                    }
                    this.$store.dispatch({
                        type: FETCH_MYDATA,
                        res: {
                            info: this.info
                        }
                    })
                }
            })
        },
        getPay() {
            this.show = true
            this.$nextTick(() => {
                const ele = document.getElementById('qrCode')
                if (!this.qrcode) {
                    this.qrcode = new QRCode(ele, {
                        width: ele.clientWidth,
                        height: ele.clientWidth
                    })
                    this.qrcode.clear()
                    // this.qrcode.makeCode(`${this.href}?code=${this.invite_code}`)
                    this.qrcode.makeCode(this.info.wallet)
                }
            })
        },
        getBalance() {
            this.loading = true
            this.tip = '查询余额中...'
            this.$axios({
                url: '/api/user/balance',
                custom: {
                    vm: this
                }
            }).then(res => {
                this.loading = false
                this.title = '余额'
                if (res.code === 0) {
                    const data = res.data || ''
                    this.content = `ETH：${data.eth}`
                    this.visible = true
                }
            })
        },
        toPage(type, id) {
            if (type === 1) {
                this.$router.push({ name: 'EarningOverview', params: { id } })
            } else if (type === 2) {
                this.$router.push({ name: 'ApiManager' })
            } else {
                this.$router.push({ name: 'AccountSet' })
            }
        },
        login() {
            if (!this.MY_DATA) {
                this.$router.push({ name: 'Login' })
            }
        },
        handleOk() {
            this.visible = false
        },
        clickHandler(item) {
            if (item.routeName) {
                this.$router.push({ name: item.routeName, params: item.params || {} })
            }
        },
        handleWallet() {
            this.loading = true
            this.$axios({
                url: '/api/user/deposit'
            }).then(res => {
                this.loading = false
                if (res.code === 0 || res.code === 1) {
                    this.$message.success(res.msg)
                    this.show = false
                }
            })
        }
    }
}
</script>

<style lang="less">
.my-wrapper {
    height: auto;
    padding-bottom: .4rem;
    background-color: #fff;
    .user-box {
        position: relative;
        display: flex;
        align-items: center;
        // margin: 0 .4rem;
        padding: .2rem 0 .4rem;
        border-bottom: 1px solid #f8f8f8;
        .avatar {
            display: inline-block;
            width: 1rem;
            height: 1rem;
            overflow: hidden;
            border-radius: 50%;
            margin-right: .2rem;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .user-wrapper {
            width: 50%;
            display: inline-block;
            .top {
                color: #3e3a51;
                font-size: .32rem;
                .account {
                    font-weight: 700;
                }
                .community {
                    color: #fff;
                    padding: .06rem .12rem;
                    font-size: .2rem;
                    vertical-align: top;
                    transform: scale(.8);
                    display: inline-block;
                    background-color: #193d93;
                }
            }
            .uid {
                font-size: .2rem;
            }
        }
        .icon-arrow-right {
            position: absolute;
            right: .4rem;
            color: #999;
            width: .8rem;
            height: .8rem;
            line-height: .8rem;
            text-align: right;
        }
    }
    .earning-type {
        padding-top: 0.2rem;
    }
    .oper-list {
        margin-top: .6rem;
        margin-left: -.4rem;
        margin-right: -.4rem;
        .oper-item {
            width: 25%;
            text-align: center;
            .icon-cover {
                position: relative;
                img {
                    height: .6rem;
                    margin-bottom: 0.2rem;
                }
                .badge {
                    position: absolute;
                    top: -2px;
                    right: -2px;
                    color: #fff;
                    font-size: 0.2rem;
                    border-radius: 20%;
                    padding: 0 2px;
                    display: inline-block;
                    transform: scale(0.6);
                    background-color: #08ab8e;
                }
            }
            p {
                font-size: 0.2rem;
            }
        }
    }
    .earning-overview {
        button {
            width: 1.2rem;
            height: .6rem;
            border-radius: 0;
        }
        .ant-btn-primary {
            border-color: @primary-color;
            background-color: @primary-color;
        }
        li {
            width: 50% !important;
        }
        &.money-wrapper {
            li {
                width: 25% !important;
            }
        }
    }
    .ad-wrapper {
        width: 100%;
        height: 3rem;
        margin: .4rem 0;
        img {
            height: 100%;
            width: 100%;
        }
    }
}
.wallet-modal {
    #qrCode {
        width: 80%;
        margin: .2rem auto;
    }
    .ant-modal {
        top: 10%;
        margin: 0 auto;
    }
    p {
        padding: .1rem 0;
        &:last-child {
            border-top: 1px solid #f8f8f8;
        }
        &:first-child {
            border-bottom: 1px solid #f8f8f8;
        }
        &.wallet {
            font-size: .2rem;
        }
    }
    .btn-group {
        padding: 0.2rem 0;
        border-bottom: 1px solid #f8f8f8;
        button:nth-child(1) {
            margin-right: .4rem;
        }
    }
    ul {
        padding-top: .1rem;
        font-size: .2rem;
    }
}
</style>
