<template>
    <a-spin :spinning="loading" :tip="tip" class="register-wrapper login-register">
        <div class="logo">
            <img src="../assets/logo.jpg" alt="神谕量化">
        </div>
        <a-form-model class="form-wrapper" ref="form" :model="form" :rules="rules">
            <a-form-model-item class="form-item" prop="phone">
                <a-input placeholder="请输入手机号码" v-model="form.phone"></a-input>
            </a-form-model-item>
            <a-form-model-item class="form-item">
                <a-input placeholder="请输入验证码" v-model="vcode"></a-input>
                <span :class="[vcodeDisabled && 'disabled', 'code o-link']" @click="getCode">{{count ? `重新获取${count}s` : '获取'}}</span>
            </a-form-model-item>
            <a-form-model-item class="form-item" prop="password">
                <a-input-password placeholder="请输入新密码" v-model="form.password"></a-input-password>
            </a-form-model-item>
        </a-form-model>
        <div class="footer">
            <a-button @click="beforeSubmit" :disabled="disabled">确认</a-button>
            <p class="clearfix">
                <span class="o-link" @click="toPage">登录</span>
            </p>
        </div>
    </a-spin>
</template>

<script>
import PWD from '@/components/mixins/pwd'
export default {
    data() {
        return {
            form: {
                phone: '',
                password: ''
            },
            rules: {
                phone: [
                    { validator: this.validatePhone, trigger: 'change' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '密码长度至少6位', trigger: 'blur' },
                    { validator: this.validatePass, trigger: 'change' }
                ]
            }
        }
    },
    mixins: [ PWD ],
    computed: {
        disabled() {
            return !this.form.phone || !this.form.password || !this.vcode
        },
        vcodeDisabled() {
            return !this.form.phone || this.lock
        }
    },
    methods: {
        toPage() {
            this.$router.push({ name: 'Login' })
        },
        beforeSubmit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.vcode) {
                        this.verifyCode()
                    } else {
                        this.$message.warning('请输入验证码')
                        return
                    }
                } else {
                    this.$message.warning('请正确填写表单内容')
                    return
                }
            })
        }
    }
}
</script>

