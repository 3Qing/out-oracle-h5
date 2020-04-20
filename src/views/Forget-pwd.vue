<template>
    <a-spin :spinning="loading" :tip="tip" class="register-wrapper login-register">
        <div class="logo">
            <img src="../assets/logo.jpg" alt="神谕量化">
        </div>
        <div class="form-wrapper">
            <div class="form-item">
                <a-input placeholder="请输入手机号码" v-model="form.phone"></a-input>
            </div>
            <div class="form-item">
                <a-input placeholder="请输入验证码" v-model="vcode" @blur="verifyCode"></a-input>
                <span :class="[vcodeDisabled && 'disabled', 'code o-link']" @click="getCode">{{count ? `重新获取${count}s` : '获取'}}</span>
            </div>
            <div class="form-item" v-if="verify">
                <a-input-password placeholder="请输入新密码" v-model="form.password"></a-input-password>
            </div>
        </div>
        <div class="footer">
            <a-button @click="beforeSubmit" :disabled="!verify || !this.form.password">确认</a-button>
            <p class="clearfix">
                <span class="o-link" @click="toPage">登录</span>
            </p>
        </div>
    </a-spin>
</template>

<script>
export default {
    data() {
        return {
            form: {
                phone: '',
                password: ''
            },
            vcode: '',
            loading: false,
            tip: '',
            count: 0,
            lock: false,
            verify: false,
            timer: null
        }
    },
    computed: {
        vcodeDisabled() {
            return !this.form.phone || this.lock
        }
    },
    methods: {
        toPage() {
            this.$router.push({ name: 'Login' })
        },
        getCode() {
            if (!this.vcodeDisabled) {
                this.loading = true
                this.tip = '获取验证码中...'
                this.$axios({
                    method: 'POST',
                    url: '/api/message',
                    params: {
                        phone: this.form.phone
                    }
                }).then(res => {
                    this.loading = false
                    if (res.code === 0) {
                        this.count = 60
                        this.lock = true
                        this.timer = setInterval(() => {
                            this.count--
                            if (this.count === 0) {
                                clearInterval(this.timer)
                                this.count = 0
                                this.lock = false
                            }
                        }, 1000)
                    }
                })
            }
        },
        verifyCode() {
            this.loading = true
            this.tip = '验证中...'
            this.$axios({
                method: 'POST',
                url: '/verifysms',
                params: {
                    phone: this.form.phone,
                    vcode: this.vcode
                },
                custom: {
                    vm: this
                }
            }).then(res => {
                this.loading = false
                if (res.code === 0) {
                    this.verify = true
                    clearInterval(this.timer)
                    this.count = 0
                    this.lock = false
                }
            })
        },
        beforeSubmit() {
            if (this.verify && this.form.phone) {
                const params = {
                    phone: this.form.phone,
                    password: this.form.password,
                    password2: this.form.password
                }
                this.submit(params)
            }
        },
        submit(params) {
            this.loading = true
            this.tip = '数据提交中...'
            this.$axios({
                url: '/retrieve',
                params,
                custom: {
                    vm: this
                }
            }).then(res => {
                if (res.code === 0) {
                    this.$message.success('请用新密码登录')
                    this.$router.push({ name: 'Login' })
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
