<template>
    <a-spin :spinning="loading" tip="获取公告中..." class="notice-wrapper data-container">
        <p class="no-data" v-if="!listData.length">暂无公告</p>
        <notice-list :opt="opt" :data="listData" v-if="listData.length"></notice-list>
    </a-spin>
</template>

<script>
import NoticeList from '@/components/home/notice-list'
export default {
    components: {
        NoticeList
    },
    data() {
        return {
            opt: {
                title: '公告列表'
            },
            listData: [],
            loading: false
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.getNotice()
        })
    },
    methods: {
        getNotice() {
            this.loading = true
            this.$axios({
                url: '/api/notice',
                custom: {
                    vm: this
                }
            }).then(res => {
                this.loading = false
                console.log(res)
                if (res.code === 0) {
                    const data = res.data  || []
                    this.listData = [ ...data ]
                }
            })
        }
    }
}
</script>

<style lang="less">
.notice-wrapper {
    height: 100%;
    // padding: 0 .4rem;
    background-color: #fff;
    .notice-list {
        padding-top: 0;
        .card-header {
            font-size: .40rem;
        }
    }
}
</style>
