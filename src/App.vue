<template>
    <div class="container">
        <div class="header-wrapper">
            <span class="header-left" @click="goBack" v-if="!navName.includes($route.name)"><a-icon type="arrow-left" /></span>
            <img src="./assets/logo.jpg" v-if="hiddenLogo" />
            <a-icon class="header-right" type="setting" v-if="$route.name === 'My'" @click.native="toView"/>
        </div>
        <main :class="[navName.includes($route.name) || 'full-page']">
            <router-view></router-view>
        </main>
        <div class="nav-wrapper" v-show="navName.includes($route.name)">
            <div
                :class="[$route.name === item.routeName && 'is-active', 'nav-item']"
                v-for="item in navs"
                :key="item.label"
                @click="toPage(item)"
                :to="{ name: item.routeName }">
                <i :class="['iconfont', item.icon]"></i>
                <p>{{item.label}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { CHANGE_LOGIN } from '@/store'
export default {
    data() {
        return {
            curNav: {
                label: '首页'
            },
            navs: [{
                label: '首页',
                icon: 'icon-shouye',
                routeName: 'Home'
            }, {
                label: '交易',
                icon: 'icon-jiaoyisuo',
                routeName: 'Transaction'
            }, {
                label: '收益',
                icon: 'icon-jiaoyi',
                routeName: 'Earnings'
            }, {
                label: '推荐',
                icon: 'icon-icon_tuijiannor',
                routeName: 'Recommend',
                isLogin: true
            }, {
                label: '我的',
                icon: 'icon-gerenzhongxin',
                routeName: 'My',
                isLogin: true
            }]
        }
    },
    computed: {
        navName() {
            return this.navs.map(item => item.routeName)
        },
        hiddenLogo() {
            return !'Login,Register,ForgetPwd'.includes(this.$route.name)
        }
    },
    beforeMount() {
        if (this.$route.path === '/') {
            this.$router.push({ name: 'Home' })
        }
        if (sessionStorage.getItem('TK')) {
            this.$store.dispatch({
                type: CHANGE_LOGIN,
                res: true
            })
        }
    },
    methods: {
        toPage(item) {
            if (item.isLogin) {
                if (!sessionStorage.getItem('TK')) {
                    this.$router.push({ name: 'Login' })
                    return
                }
            }
            this.curNav = item
            this.$router.push({ name: item.routeName })
        },
        toView() {
            this.$router.push({ name: 'Set' })
        },
        goBack() {
            if (this.$route.name === 'Login') {
                if (sessionStorage.getItem('TK')) {
                    this.$router.push({ name: 'My' })
                } else {
                    this.$router.push({ name: 'Home' })
                }
            } else {
                this.$router.back()
            }
        }
    }
}
</script>

<style lang="less">
.container {
    width: 100%;
    height: 100%;
    position: relative;
    background: #f0f2f5;
    .header-wrapper {
        height: .96rem;
        line-height: .96rem;
        padding: 0 0.4rem;
        position: relative;
        background-color: #fff;
        img {
            height: 100%;
            margin-left: 50%;
            transform: translateX(-50%);
        }
        .header-right, .header-left {
            position: absolute;
            right: .4rem;
            top: 50%;
            font-size: .32rem;
            transform: translateY(-50%);
        }
        .header-left {
            left: .4rem;
            width: .8rem;
        }
    }
    main {
        overflow-y: auto;
        height: calc(100% - 1.96rem);
        &.full-page {
            height: calc(100% - 1rem);
            & > div {
                height: 100%;
            }
        }
    }
    .nav-wrapper {
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        height: 1rem;
        background-color: #fff;
        border-top: 1px solid #e9f0f8;
        div {
            width: 20%;
            height: 1rem;
            text-align: center;
            display: inline-block;
            color: #aebac6;
            &.is-active {
                color: #1951a3;
            }
            i {
                font-size: .48rem;
            }
            p {
                font-size: .24rem;
                position: relative;
                top: -0.1rem;
                transform: scale(0.9);
            }
        }
    }
}
</style>
