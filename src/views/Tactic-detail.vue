<template>
    <a-spin :spinning="loading" :tip="tip" class="tactic-detail">
        <div class="top">
            <div class="title-wrapper">
                <p class="title"><i></i>ETH-季度合约</p>
                <p>距离交割还有87天</p>
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
                    <div class="fl">
                        <span>中低风险</span>
                        <!-- <span>最大回撤16.7%</span> -->
                    </div>
                    <div class="fl">
                        <span>2 ETH起</span>
                        <!-- <span>头寸1%-20%</span> -->
                    </div>
                </div>
            </div>
            <p class="warning-tip">以上数据来自于大数据统计仅供参考，不代表实际数据。</p>
        </div>
        <div class="content-wrapper mt-10">
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
            <div class="bottom">
                <a-button type="primary" @click="showDrawer">开启合约量化</a-button>
            </div>
        </div>
        <position-drawer></position-drawer>
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
            info: {},
            form: {},
            tabName: '1',
            loading: false,
            tip: '',
            taskStatus: 0,
            akey: ''
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.getData()
        })
    },
    methods: {
        getData() {
            this.loading = true
            this.tip = '获取策略信息中...'
            this.$axios({
                url: '/api/tactics/detail',
                params: {
                    id: this.$route.params.id
                },
                custom: {
                    vm: this
                }
            }).then(res => {
                this.loading = false
                if (res.code === 0) {
                    this.info = res.data || {}
                    if (this.info.exchange) {
                        this.getTaskDetail()
                        this.getTaskStatus()
                        this.getApi()
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
                    console.log(res)
                    const data = res.data || {}
                    this.akey = data.access_key || ''
                }
            })
        },
        getTaskDetail() {
            this.$axios({
                url: '/api/task/detail',
                params: {
                    exchange: this.info.exchange
                },
                custom: {
                    vm: this
                }
            }).then(res => {
                if (res.code === 0) {
                    this.form = res.data || {}
                }
            })
        },
        getTaskStatus() {
            this.$axios({
                url: '/api/task/status',
                custom: {
                    vm: this
                }
            }).then(res => {
                if (res.code === 0) {
                    this.taskStatus = 1
                }
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
        showDrawer() {
            this.$root.$emit('SHOW_POSITION_DRAWER', {
                data: { ...this.form, akey: this.akey, name: this.info.name } || {},
                taskStatus: this.taskStatus
            })
        }
    }
}
</script>

<style lang="less">
.tactic-detail {
    position: relative;
    .top {
        padding: 0.2rem 0.3rem;
        background-color: #fff;
        .title-wrapper {
            padding-bottom: .06rem;
            border-bottom: 1px solid #f8f8f8;
            position: relative;
            .title {
                color: #00152a;
                font-weight: 600;
                position: relative;
                padding-left: .4rem;
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
    .content-wrapper {
        padding: 0 !important;
        height: 100%;
        background-color: #fff;
        .ant-tabs-bar {
            margin-bottom: 0.4rem;
            .ant-tabs-nav {
                width: 100%;
                .ant-tabs-tab {
                    margin: 0;
                    padding: 0.2rem 0;
                    text-align: center;
                    width: calc(100% / 3);
                }
                .ant-tabs-ink-bar {
                    width: 0.6rem !important;
                    margin-left: .95rem;
                }
            }
        }
        .pane-wrapper {
            padding: 0 .3rem .3rem;
            height: 100%;
            .wrapper-title {
                color: #1d262d;
                padding-bottom: .2rem;
            }
            .content {
                color: #999;
                font-size: .24rem;
                padding-bottom: .6rem;
            }
            .card-box {
                padding-top: 0;
            }
        }
    }
    .bottom {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 9;
        width: 100%;
        padding: .2rem .3rem .3rem;
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
</style>
