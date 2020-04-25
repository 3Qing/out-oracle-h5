<template>
    <card-box class="trans-list list-wrapper" :opt="opt">
        <p class="no-data" v-if="!data.length">暂无数据</p>
        <div class="list-item" @click="toPage(item)" v-for="(item, i) in data" :key="i">
            <span class="subscript" v-if="item.status === 0">即将上线</span>
            <div class="left">
                <rate-card :data="item" :rate-type="false"></rate-card>
            </div>
            <div class="right">
                <p class="right-title">{{item.name || '标题'}}</p>
                <div class="right-desc">
                    <i class="icon"></i>
                    <span>{{item.short || ''}}</span>
                    <!-- <span>火币</span>
                    <span>{{item.price || 0}} U起</span>
                    <span> 头寸0.5%~10%</span> -->
                </div>
                <div class="tag-list tag-type-border" v-if="item.tag">
                    <span v-for="(cell, i) in formatTag(item)" :key="i">{{cell}}</span>
                </div>
            </div>
        </div>
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
    props: {
        opt: Object,
        data: {
            type: Array,
            default: () => ([])
        }
    },
    methods: {
        toPage(item) {
            this.$router.push({ name: 'TacticDetail', params: { id: item.id } })
        },
        formatTag(data) {
            return data.tag.split('|')
        }
    }
}
</script>

<style scoped lang="less">
.trans-list {
    .list-item {
        display: flex;
        padding: 0.2rem 0;
        border-bottom: 1px solid #f5f5f5;
        position: relative;
        overflow: hidden;
        .subscript {
            color: #fff;
            height: .5rem;
            width: 1.3rem;
            position: absolute;
            right: -.4rem;
            top: 0;
            text-align: center;
            line-height: .5rem;
            font-size: .2rem;
            background-color: @primary-color;
            -moz-transform: rotate(45deg) scale(.8);
            -webkit-transform: rotate(45deg) scale(.8);
            -o-transform: rotate(45deg) scale(.8);
            -ms-transform: rotate(45deg) scale(.8);
            transform: rotate(45deg) scale(.8);
        }
        &:active {
            opacity: 0.5;
        }
        .left {
            width: 30%;
            padding-right: 5%;
            position: relative;
            display: flex;
            align-items: center;
            &:after {
                content: '';
                width: 1px;
                height: 50%;
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
                background-color: #f8f8f8;
            }
        }
        .right {
            width: 70%;
            padding-left: 5%;
            .right-title {
                color: #02223b;
                font-size: 0.24rem;
            }
            .right-desc {
                font-size: 0.2rem;
                padding: 0.06rem 0 0;
                transform: scale(0.9);
                transform-origin: top left;
                color: #8a979f;
                .icon {
                    display: inline-block;
                    width: .26rem;
                    height: .4rem;
                    margin-right: 0.1rem;
                    vertical-align: top;
                    background: url('../../assets/img/icon-huobi-x1.jpg') no-repeat;
                    background-size: 80% 80%;
                }
            }
            .tag-list {
                &.tag-type-border {
                    span {
                        color: #d29b65;
                        border: 1px solid #d29b65;
                    }
                }
                &.tag-type-bg {
                    span {
                        color: #0565f7;
                        background-color: #f0f5fb;
                    }
                }
                span {
                    padding: 0 2px;
                    font-size: 0.2rem;
                    display: inline-block;
                    transform: scale(0.8);
                    transform-origin: top left;
                }
            }
        }
    }
}
</style>
