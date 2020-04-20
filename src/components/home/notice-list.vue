<template>
    <card-box class="notice-list" :opt="opt">
        <div class="notice-item clearfix" v-for="(item, i) in listData" :key="i" @click="toPage(item)">
            <div class="item-left fl">
                <p class="item-title">{{item.name}}</p>
                <p class="ellipsis tx-2">{{item.context || '-'}}</p>
                <div class="item-level" v-if="item.level"><span>公告级别:</span>
                    <a-rate :count="item.level" :defaultValue="item.level" disabled></a-rate>
                </div>
                <div class="item-time" v-if="item.created_at"><span>最新热点</span><span>{{item.created_at}}</span></div>
            </div>
            <div class="item-right fr">
                <img :src="item.cover" v-if="item.cover">
            </div>
        </div>
    </card-box>
</template>

<script>
import CardBox from '@/components/card-box'
export default {
    components: {
        CardBox
    },
    props: {
        opt: Object,
        data: {
            type: Array,
            default: () => ([])
        }
    },
    computed: {
        listData() {
            return this.data
        }
    },
    methods: {
        toPage(item) {
            if (item.link) {
                window.location.href = item.link
            }
        }
    }
}
</script>

<style lang="less">
.notice-list {
    font-size: .24rem;
    &.card-box {
        padding-bottom: 0.6rem;
    }
    .notice-item {
        padding: 0.2rem 0;
        border-bottom: 1px solid #f8f8f8;
        &:active {
            opacity: 0.5;
        }
        .item-left {
            width: calc(100% - 2.92rem);
            height: 1.6rem;
            position: relative;
            .item-title {
                color: #00223b;
            }
            .item-level {
                color: #b0bac3;
                font-size: .2rem;
                position: relative;
                span {
                    display: inline-block;
                    transform: scale(0.9);
                    transform-origin: top left;
                }
            }
            .item-time {
                position: absolute;
                left: 0;
                bottom: 0;
                span:first-child {
                    padding: 0 0.1rem;
                    color: #25447a;
                    transform: scale(0.9);
                    margin-right: 0.04rem;
                    display: inline-block;
                    border: 1px solid #bbc7dd;
                    transform-origin: top left;
                }
                span:last-child {
                    color: #b0bac4;
                    font-size: 0.2rem;
                    display: inline-block;
                    transform: scale(0.8);
                    transform-origin: top left;
                }
            }
            .ant-rate {
                font-size: 0.2rem;
                margin-left: 0;
                position: relative;
                top: -0.032rem;
                .ant-rate-star {
                    margin-right: 0.01rem;
                }
            }
        }
        .item-right {
            width: 2.52rem;
            height: 1.6rem;
            border-radius: 4px;
            background-color: #f8f8f8;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
