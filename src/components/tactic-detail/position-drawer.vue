<template>
    <a-drawer
        title="选择仓位"
        placement="bottom"
        @close="close"
        :visible="visible">
        <div :class="[taskStatus === 0 ? 'top-tip' : 'top-tip-api ellipsis']" @click="toPage">
            {{taskStatus === 0 ? '开启自动交易前，请先绑定火币API' : `${data.name}：${data.akey}`}}
        </div>
        <div class="clearfix header">
            <span class="fl">参数设置</span>
            <span class="fr" @click="handleClick">AI自动填充</span>
        </div>
        <div class="trans-amount">
            <div class="amount-item clearfix">
                <span>投入总量：<a-input-number v-model="form.fund1" :min="0" :max="100"></a-input-number></span>
                <a-input class="fr" v-model="form.symbol1"></a-input>
            </div>
            <div class="amount-item clearfix">
                <span>投入总量：<a-input-number v-model="form.fund2" :min="0" :max="100"></a-input-number></span>
                <a-input class="fr" v-model="form.symbol2"></a-input>
            </div>
            <div class="amount-item clearfix">
                <span>价格间距：</span>
                <span class="fr"><a-input-number v-model="form.per1"></a-input-number>%</span>
            </div>
            <div class="amount-item clearfix">
                <span>每笔交易占比：</span>
                <span class="fr"><a-input-number v-model="form.ratio"></a-input-number>%</span>
            </div>
        </div>
        <div class="tip-wrapper">
            <p class="tip">温馨提示:</p>
            <p>交易进行中，请勿手动操作API</p>
        </div>
        <div class="btn-wrapper">
            <a-button type="primary" :disabled="taskStatus === 0" @click="beforeSubmit">{{btnText}}</a-button>
        </div>
    </a-drawer>
</template>

<script>
import { Modal } from 'ant-design-vue'
const modal = Modal
export default {
    data() {
        return {
            visible: false,
            taskStatus: 0,
            data: {},
            form: {
                symbol1: '',
                symbol2: '',
                fund1: '',
                fund2: '',
                per1: '',
                per2: '',
                ratio: '',
            }
        }
    },
    mounted() {
        this.$root.$off('SHOW_POSITION_DRAWER')
        this.$root.$on('SHOW_POSITION_DRAWER', ({ data = {}, taskStatus = 0 }) => {
            this.data = { ...data }
            if (Object.keys(data).length) {
                this.form = {
                    symbol1: this.data.symbol_1 || '',
                    symbol2: this.data.symbol_2 || '',
                    fund1: this.data.fund_1 || 0,
                    fund2: this.data.fund_2 || 0,
                    per1: this.data.per_1 || 0,
                    per2: this.data.per_1 || 0,
                    ratio: this.data.ratio || '0',
                }
            }
            this.taskStatus = taskStatus
            this.visible = true
        })
    },
    computed: {
        btnText() {
            return this.taskStatus === 0 ? '添加任务' : this.taskStatus === 1 ? '开始任务' : '结束任务'
        }
    },
    methods: {
        close() {
            this.visible = false
        },
        toPage() {
            if (this.taskStatus === 0) {
                this.$router.push({ name: 'ApiManager' })
            } else {
                this.$router.push({ name: 'ApiImport', params: { id: this.data.exchange } })
            }
        },
        handleClick() {
            if (!Object.keys(this.data).length) {
                this.form = {
                    symbol1: 'eth',
                    symbol2: 'btc',
                    fund1: 0,
                    fund2: 0,
                    per1: 0.25,
                    per2: 0.25,
                    ratio: 10,
                }
            }
        },
        startOrStopTask() {
            this.$axios({
                url: `/api/task/${this.taskStatus === 1 ? 'start' : 'stop'}`,
                params: {
                    task: this.data.id
                },
                custom: {
                    vm: this
                }
            }).then(res => {
                if (res.code === 0) {
                    this.$message.success(`已${this.btnText}`)
                }
            })
        },
        beforeSubmit() {
            const params = Object.assign({
                api: this.$route.params.id,
                exchange: 1,
            }, this.form)
            if (this.taskStatus === 0) {
                this.submit(params)
            } else {
                modal.confirm({
                    content: `是否${this.btnText}？`,
                    cancelText: '取消',
                    okText: '确定',
                    maskClosable: true,
                    onOk: () => {
                        this.startOrStopTask()
                    }
                })
            }
        },
        submit(params) {
            this.$axios({
                method: 'POST',
                url: '/api/task/add',
                params,
                custom: {
                    vm: this
                }
            }).then(res => {
                console.log(res)
                if (res.code === 0) {
                    this.$message.success('添加成功')
                }
            })
        }
    }
}
</script>

<style lang="less">
.ant-drawer-content-wrapper {
    height: auto !important;
    .ant-drawer-header {
        border: none;
        .ant-drawer-title {
            text-align: center;
        }
        .ant-drawer-close {
            color: #ccc;
        }
    }
    .header {
        height: .8rem;
        line-height: .8rem;
        .fr {
            color: #19458e;
        }
    }
    .ant-drawer-body {
        padding: 0;
        & > div {
            padding: 0 .4rem;
        }
        .top-tip {
            height: .6rem;
            line-height: .6rem;
            color: #d29b65;
            background-color: #fff6ef;
        }
        .top-tip-api {
            height: .6rem;
            line-height: .6rem;
            color: #fff;
            background-color: #19458e;
        }
        .top {
            height: .6rem;
            line-height: .6rem;
            .fr {
                color: #19458e;
            }
        }
        .trans-amount {
            color: #333;
            .amount-item {
                height: .8rem;
                line-height: .8rem;
                position: relative;
                input, .ant-input-number {
                    width: 1.4rem;
                    border: none;
                    border-radius: 0;
                    border-bottom: 1px solid #d8d8d8;
                    &:focus {
                        outline: none;
                        box-shadow: none;
                    }
                    &.ant-input-number-focused {
                        box-shadow: none;
                    }
                }
                .ant-input-number {
                    border: none;
                }
                .ant-input-number-handler-wrap {
                    display: none;
                }
                .fr {
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
        .tip-wrapper {
            padding: 0.4rem;
            font-size: .2rem;
            color: #8997a2;
        }
        .btn-wrapper {
            padding-bottom: .3rem;
            button {
                width: 100%;
                height: .8rem;
                line-height: .8rem;
                border-radius: 0;
                background: #19458e;
                border-color: #19458e;
            }
        }
    }
}
</style>
