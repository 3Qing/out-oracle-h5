<template>
    <a-spin :spinning="spinning" tip="登录中..." class="login-wrapper login-register">
        <div class="logo">
            <img src="../assets/logo.jpg" alt="神谕量化">
        </div>
        <div class="form-wrapper">
            <div class="form-item">
                <a-input placeholder="手机号码或邮箱" v-model="form.phone"></a-input>
            </div>
            <div class="form-item">
                <a-input-password placeholder="密码" v-model="form.password"></a-input-password>
            </div>
            <div class="form-item">
                <span class="o-link" @click="toPage(1)">忘记密码？</span>
            </div>
        </div>
        <div class="footer">
            <a-button @click="submit" :disabled="!form.phone || !form.password">确认</a-button>
            <p>还有账号？<span class="o-link" @click="toPage">注册</span></p>
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
            spinning: false
        }
    },
    methods: {
        toPage(type) {
            if (type === 1) {
                this.$router.push({ name: 'ForgetPwd' })
            } else {
                this.$router.push({ name: 'Register' })
            }
        },
        submit() {
            this.spinning = true
            this.$axios({
                method: 'POST',
                url: '/login',
                params: this.form,
                custom: {
                    vm: this
                }
            }).then(res => {
                this.spinning = false
                if (res.code === 0) {
                    this.$message.success('登录成功')
                    const data = res.data || {}
                    sessionStorage.setItem('TK', data.token)
                    this.$router.push({ name: 'My' })
                }
            })
        }
    }
}
</script>

