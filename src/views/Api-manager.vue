<template>
    <a-spin :spinning="loading" class="api-manager">
        <div class="api-list">
            <div class="list-item item-wrapper clearfix" v-for="(item, i) in apiList" :key="i" @click="toPage(item)">
                <img :src="item.icon" v-if="item.icon">
                <span class="item-title">{{item.label}}</span>
                <span class="import-api fr"><i></i>导入API</span>
            </div>
        </div>
        <div class="mt-10 await-wrapper">
            <p class="await-header">待开通交易所</p>
            <div class="await-item item-wrapper clearfix" v-for="(item, i) in delayList" :key="i">
                <img :src="item.icon" v-if="item.icon">
                <span class="await-label">{{item.label}}</span>
                <span class="soon fr">即将开放</span>
            </div>
        </div>
    </a-spin>
</template>

<script>
export default {
    data() {
        return {
            /**
             * {
                icon: require('../assets/img/icon-api_huobi.jpg'),
                label: '火币全球贴',
                id: 1
            }, {
                icon: require('../assets/img/icon-api_bian.jpg'),
                label: '币安'
            }, {
                icon: require('../assets/img/icon-api_huobi.jpg'),
                label: '火币合约贴'
            }
             */
            apiList: [],
            delayList: [{
                icon: require('../assets/img/icon-api_zb.jpg'),
                label: 'okex'
            }, {
                icon: require('../assets/img/icon-api_zb.jpg'),
                label: 'ZB'
            }, {
                icon: require('../assets/img/icon-api_zb.jpg'),
                label: 'Bitmex'
            }, {
                icon: require('../assets/img/icon-api_zb.jpg'),
                label: 'Bittrex'
            }, {
                icon: require('../assets/img/icon-api_zb.jpg'),
                label: 'fcoin'
            }],
            loading: false
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.getListData()
        })
    },
    methods: {
        toPage(item) {
            this.$router.push({ name: 'ApiImport', params: { id: item.id } })
        },
        getListData() {
            this.$axios({
                url: '/api/exchange/list',
                custom: {
                    vm: this
                }
            }).then(res => {
                if (res.code === 0) {
                    const data = res.data || []
                    this.apiList = []
                    const apiList = []
                    data.forEach(item => {
                        apiList.push({
                            label: item.name,
                            id: item.id,
                            icon: item.type === 1 ? require('../assets/img/icon-api_huobi.jpg') : require('../assets/img/icon-api_bian.jpg')
                        })
                    })
                    this.apiList = [ ...apiList ]
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.api-manager {
    & > div {
        padding: 0 .4rem;
        background-color: #fff;
    }
    .item-wrapper {
        height: 1.4rem;
        line-height: 1.4rem;
        border-bottom: 1px solid #f8f8f8;
        img {
            height: .6rem;
            margin-right: .4rem;
            vertical-align: middle;
        }
        .item-title {
            color: #00243e;
        }
        .import-api {
            color: #00243c;
            font-size: .2rem;
        }
    }
    .await-wrapper {
        height: 70%;
        .await-header {
            padding-top: .4rem;
            color: #00243e;
        }
        .await-label {
            color: #8997a2;
        }
        .soon {
            color: #aebac6;
            font-size: .2rem;
        }
    }
}
</style>
