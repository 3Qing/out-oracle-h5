<template>
    <div class="main-wrapper recommend-detail">
        <div class="tabs-wrapper">
            <a-tabs :defaultActiveKey="tabName" @change="changeTab">
                <a-tab-pane tab="我的邀请" key="1">
                    <my-invite :data="info"></my-invite>
                </a-tab-pane>
                <a-tab-pane tab="我的等级" key="2">
                    <my-grade :data="info"></my-grade>
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script>
import MyInvite from '@/components/recommend/my-invite'
import MyGrade from '@/components/recommend/my-grade'
import { mapGetters } from 'vuex'
import { FETCH_MYDATA } from '@/store'
export default {
    components: {
        MyInvite,
        MyGrade
    },
    data() {
        return {
            tabName: '1',
            info: {
                level: 1,
                referrer: [],
                referrer_count: 0
            }
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.getData()
        })
    },
    computed: {
        ...mapGetters([ 'MY_DATA' ])
    },
    methods: {
        changeTab(key) {
            this.tabName = key
        },
        getData() {
            this.$axios({
                url: '/api/user/info',
                custom: {
                    vm: this
                }
            }).then(res => {
                if (res.code === 0) {
                    const data = res.data || {}
                    if (data.level === 0) {
                        data.level = 1
                    }
                    this.info = { ...data }
                    this.$store.dispatch({
                        type: FETCH_MYDATA,
                        res: {
                            info: this.info
                        }
                    })
                }
            })
        }
    }
}
</script>

<style lang="less">
.recommend-detail {
    .tabs-wrapper {
        background-color: transparent !important;
        .ant-tabs-bar {
            border-color: #f8f8f8;
            background-color: #fff;
            margin-bottom: 0 !important;
            .ant-tabs-nav {
                .ant-tabs-tab {
                    width: 50% !important;
                }
                .ant-tabs-ink-bar {
                    margin-left: 1.6rem !important;
                }
            }
        }
    }
}
</style>
