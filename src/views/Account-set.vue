<template>
    <a-spin :spinning="loading" :tip="tip" class="account-set">
        <div class="set-item" v-for="(item, i) in listData" :key="i">
            <span class="item-label">{{item.label}}</span>
            <div class="item-oper" @click="toPage(item)">
                <img v-if="item.avatar" :src="item.avatar" alt="头像">
                <span>{{item.value}}</span>
                <a-icon type="right" v-if="item.showIcon"></a-icon>
            </div>
        </div>
        <a-button class="btn-login" @click="logout">退出登录</a-button>
    </a-spin>
</template>

<script>
export default {
    data() {
        return {
            listData: [{
                label: '头像',
                avatar: require('../assets/img/banner.png'),
                showIcon: true
            }, {
                label: '昵称',
                routeName: 'SetDetail',
                params: { id: 1 },
                value: '昵称',
                showIcon: true,
            }, {
                label: '密码',
                routeName: 'SetDetail',
                params: { id: 2 },
                value: '密码',
                showIcon: true
            }],
            loading: false,
            tip: '登出中...'
        }
    },
    methods: {
        logout() {
            this.loading = true
            this.$axios({
                url: '/api/user/logout',
                custom: {
                    vm: this
                }
            }).then(res => {
                this.loading = false
                if (res.code === 0) {
                    this.$message.info('已登出')
                    sessionStorage.removeItem('TK')
                    this.$router.push({ name: 'Login' })
                }
            })
        },
        toPage(data) {
            if (data.routeName) {
                this.$router.push({ name: data.routeName, params: data.params || {} })
            }
        }
    }
}
</script>

<style scoped lang="less">
.account-set {
    height: 100% !important;
    padding: 0 !important;
    background-color: #fff;
    position: relative;
    .set-item {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #f8f8f8;
        img {
            width: .6rem;
            height: .6rem;
            overflow: hidden;
            border-radius: 100%;
        }
        .anticon-right {
            margin-left: .1rem;
        }
    }
    .btn-login {
        width: calc(100% - .8rem);
        height: .8rem;
        line-height: .8rem;
        color: #fff;
        border-radius: 0;
        border-color: #193d93;
        background-color: #193d93;
        position: fixed;
        left: .4rem;
        bottom: .4rem;
    }
}
</style>
