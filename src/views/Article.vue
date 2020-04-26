<template>
    <div class="main-wrapper article-wrapper">
        <div>{{content}}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            content: ''
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.getNoticeData()
        })
    },
    methods: {
        getNoticeData() {
            this.$axios({
                url: '/api/notice'
            }).then(res => {
                if (res.code === 0) {
                    const data = res.data || []
                    data.forEach(item => {
                        if (item.id === Number(this.$route.params.id)) {
                            this.content = item.text
                        }
                    })
                }
            })
        }
    }
}
</script>

<style lang="less">
.article-wrapper {
    background-color: #fff;
}
</style>
