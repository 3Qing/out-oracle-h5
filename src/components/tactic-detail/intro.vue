<template>
    <div class="intro-wrapper pane-wrapper">
        <p class="wrapper-title">策略介绍</p>
        <div class="content" v-html="data.introduce">
        </div>
        <div>
            <div class="wrapper-title">策略推荐</div>
            <tactic-list :data="list"></tactic-list>
        </div>
        <div class="bottom" v-if="data.status">
            <a-button type="primary" @click="$emit('show')">开启合约量化</a-button>
        </div>
    </div>
</template>

<script>
import TacticList from '@/components/transaction/list'
export default {
    components: {
        TacticList
    },
    props: {
        data: {
            type: Object,
            default: () => ({
                status: 0
            })
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
