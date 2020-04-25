export default {
    data() {
        return {
            vcode: '',
            loading: false,
            tip: '',
            count: 0,
            lock: false,
            timer: null
        }
    },
    methods: {
        validatePhone(rule, value, callback) {
            if (value === '') {
                callback(new Error('请输入手机号码'))
            } else {
                let _regPhone = /^[1][3,4,5,7,8][0-9]{9}$/
                if (this.form.phone !== '' && _regPhone.test(value)) {
                    this.$refs.form.validateField('phone')
                    callback()
                } else {
                    callback(new Error('请输入正确的手机号码'))
                }
            }
        },
        validatePass(rule, value, callback) {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                let _regPass = /^[0-9a-zA-Z]*$/g
                if (this.form.password !== '' && _regPass.test(value)) {
                    this.$refs.form.validateField('checkPass')
                    callback()
                } else {
                    callback(new Error('密码应为数字或字母'))
                }
            }
        },
        validatePass2(rule, value, callback) {
            if (value === '') {
                callback(new Error('请确认密码'))
            } else if (value !== this.form.password) {
                callback(new Error("两次密码不一致"))
            } else {
                callback()
            }
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
            if (this.$route.name === 'Register') {
                this.tip = '注册中...'
            } else {
                this.tip = '修改密码中...'
            }
            this.loading = true
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
                if (res.code === 0) {
                    clearInterval(this.timer)
                    this.count = 0
                    this.lock = false
                    let params
                    if (this.$route.name === 'Register') {
                        params = { ...this.form, vcode: this.vcode }
                    } else {
                        params = {
                            phone: this.form.phone,
                            password: this.form.password,
                            password2: this.form.password
                        }
                    }
                    this.submit(params)
                } else {
                    this.loading = false
                }
            })
        },
        submit(params) {
            this.$axios({
                method: 'POST',
                url: this.$route.name === 'Register' ? '/register' : '/retrieve',
                params,
                custom: {
                    vm: this
                }
            }).then(res => {
                this.loading = false
                if (res.code === 0) {
                    if (this.$route.name === 'Register') {
                        this.$message.success('注册成功，请登录')
                        this.$router.push({ name: 'Login' })
                    } else {
                        this.$message.success('请用新密码登录')
                        this.$router.push({ name: 'Login' })
                    }
                }
            })
        }
    }
}