<template>
    <a-spin :spinning="loading" :tip="data.tip" class="set-detail login-register">
        <p class="title">{{data.title}}</p>
        <div class="form-wrapper">
            <div class="form-item" v-for="(item, i) in data.items" :key="i">
                <a-input-password v-if="data.title === '修改密码'" :placeholder="item.placeholder" v-model="data.form[item.field]"></a-input-password>
                <a-input v-else :placeholder="item.placeholder" v-model="data.form[item.field]"></a-input>
            </div>
        </div>
        <div class="footer">
            <a-button @click="beforeSubmit">确认</a-button>
        </div>
    </a-spin>
</template>

<script>
export default {
    data() {
        return {
            eles: {
                1: {
                    api: '',
                    title: '修改昵称',
                    form: {
                        value: ''
                    },
                    items: [{
                        field: 'value',
                        placeholder: '请输入1-10位字符昵称'
                    }]
                },
                2: {
                    api: '/api/user/changepassword',
                    title: '修改密码',
                    tip: '修改密码中...',
                    form: {
                        password: '',
                        npassword: '',
                        npassword2: ''
                    },
                    items: [{
                        field: 'password',
                        placeholder: '旧密码'
                    }, {
                        field: 'npassword',
                        placeholder: '新密码'
                    }, {
                        field: 'npassword2',
                        placeholder: '确认密码'
                    }]
                }
            },
            loading: false
        }
    },
    computed: {
        data() {
            return this.eles[Number(this.$route.params.id)]
        }
    },
    methods: {
        beforeSubmit() {
            if (this.data.api) {
                this.submit()
            }
        },
        submit() {
            this.loading = true
            for (let key in this.data.form) {
                if (!this.data.form[key]) {
                    this.$message.warning('请填写内容')
                    return
                }
            }
            this.$axios({
                url: this.data.api,
                params: this.data.form,
                custom: {
                    vm: this
                }
            }).then(res => {
                this.loading = false
                if (res.code === 0) {
                    if (this.data.title === '修改密码') {
                        this.$message.success('密码修改成功，请重新登录')
                        sessionStorage.removeItem('TK')
                        this.$router.push({ name: 'Login' })
                    }
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.set-detail {
    .title {
        color: #000;
        font-size: .36rem;
        margin-bottom: .2rem;
    }
}
</style>
