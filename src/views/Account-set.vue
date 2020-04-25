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
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            listData: [{
                label: '头像',
                avatar: require('../assets/img/banner.png'),
                showIcon: false
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
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (vm.MY_DATA) {
                if (vm.MY_DATA.info && vm.MY_DATA.info.avatar) {
                    const listData = [ ...vm.listData ]
                    listData[0].avatar = vm.MY_DATA.info.avatar
                    vm.listData = [ ...listData ]
                }
            }
        })
    },
    computed: {
        ...mapGetters([ 'MY_DATA' ])
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
