<template>
    <div class="card-box">
        <div class="card-header" name="card-header" v-if="opt.title">
            <span class="title">{{opt.title}}</span>
            <span class="header-right" v-if="opt.more" @click="toPage">
                {{opt.moreLabel || ''}}<a-icon type="right" />
            </span>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        opt: {
            type: Object,
            default: () => ({
                title: '',
                more: false
            })
        }
    },
    methods: {
        toPage() {
            this.$router.push({ name: this.opt.routeName })
        }
    }
}
</script>

<style scoped lang="less">
.card-box {
    padding-top:  0.3rem;
    .card-header {
        font-size: .32rem;
        font-weight: 500;
        color: #213f59;
        position: relative;
        .header-right {
            position: absolute;
            right: 0;
            top: 50%;
            color: #b2b9bf;
            font-weight: 400;
            font-size: .24rem;
            transform: translateY(-50%);
            &:active {
                opacity: 0.5;
            }
        }
    }
}
</style>
