<template>
    <a-spin :spinning="loading" :tip="tip" class="register-wrapper login-register">
        <div class="logo">
            <img src="../assets/logo.jpg" alt="神谕量化">
        </div>
        <p class="text-center register-title">{{nextForm ? '注册' : '欢迎注册'}}</p>
        <p class="form-tip text-center" v-show="count">验证码已发送至 {{form.phone}}</p>
        <a-form-model class="form-wrapper" ref="form" :model="form" :rules="rules">
            <a-form-model-item class="form-item" prop="phone" v-show="!nextForm">
                <a-input placeholder="请输入手机号码" v-model="form.phone"></a-input>
            </a-form-model-item>
            <a-form-model-item class="form-item" v-show="nextForm">
                <a-input placeholder="请输入验证码" v-model="vcode"></a-input>
                <span :class="[vcodeDisabled && 'disabled', 'code o-link']" @click="getCode">{{count ? `${count}s` : '获取'}}</span>
            </a-form-model-item>
            <a-form-model-item class="form-item" prop="password" v-show="nextForm">
                <a-input-password placeholder="请输入密码" v-model="form.password"></a-input-password>
            </a-form-model-item>
            <!-- <a-form-model-item class="form-item" prop="password2">
                <a-input-password placeholder="确认密码" v-model="form.password2"></a-input-password>
            </a-form-model-item> -->
            <a-form-model-item class="form-item" v-show="nextForm">
                <a-input placeholder="请输入推广码" v-model="form.code"></a-input>
            </a-form-model-item>
        </a-form-model>
        <div class="footer">
            <a-button @click="beforeSubmit" :disabled="disabled" v-show="nextForm">注册</a-button>
            <a-button @click="handleClick" :disabled="!phonePass">{{nextForm ? '上一步' : '下一步'}}</a-button>
            <p class="clearfix">
                已有账号？
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
                password: '',
                password2: '',
                code: ''
            },
            rules: {
                phone: [
                    { validator: this.validatePhone, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '密码长度至少6位', trigger: 'blur' },
                    { validator: this.validatePass, trigger: 'blur' }
                ],
                password2: [
                    { validator: this.validatePass2, trigger: 'change' }
                ],
            },
            nextForm: false
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (to.query.code) {
                vm.form.code = to.query.code
            }
        })
    },
    mixins: [ PWD ],
    computed: {
        disabled() {
            return !this.form.password || !this.form.code || !this.vcode
        },
        vcodeDisabled() {
            return this.lock
            // return (!this.form.phone || !this.form.password || !this.form.password2) || this.lock
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
        },
        handleClick() {
            this.nextForm = !this.nextForm
        }
    }
}
</script>

<style lang="less">
.register-wrapper {
    .form-wrapper {
        padding: 0 0.4rem !important;
    }
    .register-title {
        color: #333;
        font-size: .38rem;
    }
    .form-tip {
        color: #aaa;
        margin-top: .7rem;
        font-size: .32rem;
    }
}
</style>


