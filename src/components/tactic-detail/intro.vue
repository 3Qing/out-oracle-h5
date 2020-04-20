<template>
    <div class="intro-wrapper pane-wrapper">
        <p class="wrapper-title">策略介绍</p>
        <div class="content" v-html="data.introduce">
            <!-- <p>策略：高频合约量化策略</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut fugiat possimus ducimus quo dicta quasi tempore cupiditate quos mollitia consequatur. Necessitatibus porro possimus veniam voluptatem id dolorem eius asperiores libero!</p> -->
        </div>
        <div>
            <div class="wrapper-title">策略推荐</div>
            <tactic-list :data="list"></tactic-list>
        </div>
        <div class="bottom">
            <a-button type="primary">开启合约量化</a-button>
        </div>
    </div>
</template>

<script>
// import CardBox from '@/components/card-box'
// import RateCard from '@/components/rate-card'
import TacticList from '@/components/transaction/list'
export default {
    components: {
        // CardBox,
        // RateCard,
        TacticList
    },
    props: {
        data: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            opt: {
                title: '策略推荐'
            },
            list: []
        }
    },
    beforeMount() {
        this.getTacList()
    },
    methods: {
        getTacList() {
            this.$axios({
                url: '/api/tactics/list',
                custom: {
                    vm: this
                }
            }).then(res => {
                if (res.code === 0) {
                    this.list = res.data || []
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
</style>
