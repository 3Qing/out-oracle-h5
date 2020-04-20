<template>
    <a-spin :spinning="loading" :tip="tip" class="register-wrapper login-register">
        <div class="logo">
            <img src="../assets/logo.jpg" alt="神谕量化">
        </div>
        <a-form-model class="form-wrapper" :ref="form" :model="from" :rules="rules">
            <a-form-model-item class="form-item">
                <a-input placeholder="请输入手机号码" v-model="form.phone"></a-input>
            </a-form-model-item>
            <a-form-model-item class="form-item">
                <a-input-password placeholder="请输入密码" v-model="form.password"></a-input-password>
            </a-form-model-item>
            <a-form-model-item class="form-item">
                <a-input-password placeholder="确认密码" v-model="form.password2"></a-input-password>
            </a-form-model-item>
            <a-form-model-item class="form-item">
                <a-input placeholder="请输入验证码" v-model="vcode"></a-input>
                <span :class="[vcodeDisabled && 'disabled', 'code o-link']" @click="getCode">{{count ? `重新获取${count}s` : '获取'}}</span>
            </a-form-model-item>
            <a-form-model-item class="form-item">
                <a-input placeholder="请输入推广码" v-model="form.code"></a-input>
            </a-form-model-item>
            <!-- <div class="form-item">
                <a-input placeholder="请输入手机号码" v-model="form.phone"></a-input>
            </div>
            <div class="form-item">
                <a-input-password placeholder="请输入密码" v-model="form.password"></a-input-password>
            </div>
            <div class="form-item">
                <a-input-password placeholder="确认密码" v-model="form.password2"></a-input-password>
            </div>
            <div class="form-item">
                <a-input placeholder="请输入验证码" v-model="vcode"></a-input>
                <span :class="[vcodeDisabled && 'disabled', 'code o-link']" @click="getCode">{{count ? `重新获取${count}s` : '获取'}}</span>
            </div>
            <div class="form-item">
                <a-input placeholder="请输入推广码" v-model="form.code"></a-input>
            </div> -->
        </a-form-model>
        <div class="footer">
            <a-button @click="beforeSubmit" :disabled="disabled">注册</a-button>
            <p class="clearfix">
                已有账号？
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
                password: '',
                password2: '',
                code: ''
            },
            rules: {},
            tip: '注册中...',
            vcode: '',
            loading: false,
            lock: false,
            count: 0,
            timer: null,
            verify: false
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (to.query.code) {
                vm.form.code = to.query.code
            }
        })
    },
    computed: {
        disabled() {
            return !this.form.phone || !this.form.password || !this.form.password2 || !this.form.code || !this.vcode
        },
        vcodeDisabled() {
            return (!this.form.phone || !this.form.password || !this.form.password2) || this.lock
        }
    },
    methods: {
        toPage() {
            this.$router.push({ name: 'Login' })
        },
        beforeSubmit() {
            if (this.form.password !== this.form.password2) {
                this.$message.warning('两次密码不一致')
                return
            }
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.vcode) {
                        this.verifyCode()
                    }
                }
            })
            // if (!this.verify) {
            //     this.$message.warning('请进行验证码验证')
            //     return
            // }
        },
        submit() {
            // this.loading = true
            this.$axios({
                method: 'POST',
                url: '/register',
                params: this.form,
                custom: {
                    vm: this
                }
            }).then(res => {
                this.loading = false
                if (res.code === 0) {
                    this.$message.success('注册成功，请登录')
                    this.$router.push({ name: 'Login' })
                }
            })
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
            this.tip = '注册中...'
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
                console.log(res)
                if (res.code === 0) {
                    this.verify = true
                    clearInterval(this.timer)
                    this.count = 0
                    this.lock = false
                    this.submit()
                } else {
                    this.loading = false
                }
            })
        }
    }
}
</script>

<style lang="less">
.register-wrapper {
    .form-item {
        margin-bottom: .2rem;
        position: relative;
    }
}
</style>

