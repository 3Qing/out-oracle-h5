<template>
    <a-spin :spinning="loading" tip="获取中..." class="wallet-detail main-wrapper">
        <p class="ellipsis">账户余额：{{Number(info.balance).toFixed(6)}} ETH</p>    
        <div id="qrCode"></div>
        <p class="wallet o-link">{{info.wallet}}</p>
        <div class="btn-group text-center">
            <a-button
                v-clipboard:copy="info.wallet"
                v-clipboard:success="copy">复制钱包地址</a-button>
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
    </a-spin>
</template>

<script>
import QRCode from 'qrcodejs2'
import tabMixin from '@/components/mixins/tab-mixin'
export default {
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.getData()
        })
    },
    data() {
        return {
            info: {},
            loading: false
        }
    },
    mixins: [ tabMixin ],
    methods: {
        getData() {
            this.loading = true
            this.$axios({
                url: '/api/user/info',
                custom: {
                    vm: this
                }
            }).then(res => {
                if (res.code === 0) {
                    const data = res.data || {}
                    this.info = { ...data }
                    this.getPay()
                } else {
                    this.loading = false
                }
            })
        },
        getPay() {
            this.loading = false
            this.$nextTick(() => {
                const ele = document.getElementById('qrCode')
                if (!this.qrcode) {
                    this.qrcode = new QRCode(ele, {
                        width: ele.clientWidth,
                        height: ele.clientWidth
                    })
                    this.qrcode.clear()
                    this.qrcode.makeCode(this.info.wallet)
                }
            })
        },
        handleWallet() {
            this.loading = true
            this.$axios({
                url: '/api/user/deposit'
            }).then(res => {
                this.loading = false
                if (res.code === 0 || res.code === 1) {
                    this.$message.success(res.msg)
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
.wallet-detail {
    #qrCode {
        width: 80%;
        margin: .2rem auto;
        img {
            width: 100%;
        }
    }
    .wallet {
        border-top: 1px solid #f8f8f8;
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
        padding: 0.2rem 0 !important;
        border-bottom: 1px solid #f8f8f8;
        button:nth-child(1) {
            margin-right: .4rem;
        }
    }
    ul {
        padding-top: .2rem;
        font-size: .2rem;
    }
}
</style>
