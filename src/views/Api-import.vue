<template>
    <a-spin :spinning="loading" :tip="tip" class="api-import">
        <!-- <p>API导入</p> -->
        <div class="top">
            <img src="../assets/img/icon-api_huobi@x3.jpg">
            <p class="top-title">火币全球贴(houbipro)</p>
            <a :href="`https://${info.host}` || 'javascript:;'">查看获取API教程</a>
        </div>
        <div class="form-wrapper">
            <div class="form-item">
                <p class="label">API key</p>
                <div class="input-wrapper">
                    <a-input placeholder="请粘贴或输入API key" v-model="form.akey"></a-input>
                    <!-- <span class="paste">粘贴</span> -->
                </div>
            </div>
            <div class="form-item">
                <p class="label">SECRET key</p>
                <div class="input-wrapper">
                    <a-input placeholder="请粘贴或输入Secret key" v-model="form.skey"></a-input>
                    <!-- <span class="paste">粘贴</span> -->
                </div>
            </div>
            <div class="form-item" v-if="info.mfee">
                <p class="label">接口费率</p>
                <div class="input-wrapper">
                    <a-input disabled v-model="info.mfee"></a-input>
                    <!-- <span class="paste">粘贴</span> -->
                </div>
            </div>
        </div>
        <div class="bottom">
            <p class="tip">温馨提示：</p>
            <p class="tip-content">交易所提供的API key和Secret key非常重要，请小心保管，不要通过QQ、微信等软件进行传输，不要保存在云端，确保资金安全！</p>
            <a-button type="primary" :disabled="disabled" @click="beforeSubmit">{{edit ? '修改' : '导入'}}</a-button>
        </div>
    </a-spin>
</template>

<script>
export default {
    data() {
        return {
            form: {
                akey: '',
                skey: '',
            },
            edit: false,
            info: {},
            loading: false,
            tip: '导入API中...'
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (to.params.id && Number(to.params.id)) {
                vm.getAllData()
            }
        })
    },
    computed: {
        disabled() {
            return !this.form.akey || !this.form.skey
        }
    },
    methods: {
        getAllData() {
            const api = [
                '/api/exchange/get',
                '/api/exchange/fee'
            ]
            const params = api.map(item => this.$axios({
                url: item,
                params: {
                    exchange: this.$route.params.id
                },
                custom: {
                    vm: this
                }
            }))
            Promise.all(params).then(res => {
                console.log(res)
                let info = {}
                this.edit = true
                res.forEach(item => {
                    if (item) {
                        if (item.code === 0) {
                            const data = item.data || {}
                            const form = {}
                            if (data.access_key || data.secret_key) {
                                form.akey = data.access_key || ''
                                form.skey = data.secret_key || ''
                                this.form = { ...form }
                            }
                            info = Object.assign(info, { ...data })
                        }
                    }
                })
                this.info = { ...info }
                console.log(this.info)
            })
        },
        getData() {
            this.$axios({
                url: '/api/exchange/get',
                params: {
                    exchange: Number(this.$route.params.id)
                },
                custom: {
                    vm: this
                }
            }).then(res => {
                if (res.code === 0) {
                    const data = res.data || {}
                    this.info = Object.assign(this.info, data)
                }
            })
        },
        getFee() {
            this.$axios({
                url: '/api/exchange/fee',
                params: {
                    exchange: this.$route.params.id
                },
                custom: {
                    vm: this
                }
            }).then(res => {
                if (res.code === 0) {
                    const data = res.data || {}
                    this.info = { ...data }
                }
            })
        },
        beforeSubmit() {
            let params = {
                exchange: this.$route.params.id
            }
            if (this.edit) {
                params = Object.assign(params, this.form, {
                    id: this.info.id
                })
            } else {
                    params = Object.assign(params, this.form)
            }
            this.submit(params, this.edit)
        },
        submit(params, edit) {
            this.loading = true
            this.$axios({
                method: 'POST',
                url: `/api/exchange/${edit ? 'edit' : 'add'}`,
                params,
                custom: {
                    vm: this
                }
            }).then(res => {
                this.loading = false
                if (res.code === 0) {
                    this.$message.success(`${edit ? '修改' : '导入'}成功`)
                    this.getAllData()
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.api-import {
    height: 100%;
    background-color: #fff;
    .top {
        text-align: center;
        img {
            height: 2rem;
        }
        .top-title {
            margin-top: .2rem;
            color: #00223c;
        }
        a {
            color: #2f83fd;
            font-size: .24rem;
        }
    }
    .form-wrapper {
        margin-top: .8rem;
        padding: 0 .4rem;
        .label {
            color: #00223c;
        }
        .form-item {
            margin-bottom: .3rem;
        }
        .input-wrapper {
            position: relative;
            font-size: .24rem;
            .ant-input {
                border: none;
                padding: .4rem 0;
                border-bottom: 1px solid #f8f8f8;
                &:focus {
                    box-shadow: none;
                    border-color: #d5dce2;
                }
            }
            .paste {
                position: absolute;
                right: 0;
                top: 50%;
                color: #00223c;
                transform: translateY(-50%);
            }
        }
    }
    .bottom {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 9;
        width: 100%;
        padding: 0.2rem 0.3rem;
        background-color: #fff;
        .tip {
            color: #00233d;
            font-size: .2rem;
        }
        .tip-content {
            color: #8997a2;
            font-size: .2rem;
            margin-bottom: .4rem;
        }
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
