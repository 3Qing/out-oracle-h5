<template>
    <card-box :opt="opt" class="trans-box">
        <ul class="clearfix">
            <li class="fl overflow" v-for="(item, i) in data" :key="i">
                <rate-card :data="item" @click.native="toPage(item)"></rate-card>
            </li>
        </ul>
    </card-box>
</template>

<script>
import CardBox from '@/components/card-box'
import RateCard from '@/components/rate-card'
export default {
    components: {
        CardBox,
        RateCard
    },
    props:  {
        opt: Object,
        data: {
            type: Array,
            default: () => ([])
        }
    },
    methods: {
        toPage(item) {
            this.$router.push({ name: 'TacticDetail', params: { id: item.id || 0 } })
        }
    }
}
</script>

<style scoped lang="less">
.trans-box {
    li {
        display: inline-block;
        width: 50%;
        padding: .3rem 0 .6rem;
        position: relative;
        &:first-child:after {
            content: '';
            display: block;
            width: 1px;
            position: absolute;
            right: 0;
            top: .6rem;
            bottom: 0.6rem;
            background-color: #f5f5f5;
        }
    }
}
</style>
