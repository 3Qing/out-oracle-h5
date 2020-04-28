<template>
    <div class="about-wrapper pane-wrapper">
        <p class="wrapper-title">流程说明</p>
        <div class="list-item">
            <i></i>
            <div class="item-content" v-html="data.procedure"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => ({})
        }
    }
}
</script>

<style lang="less">
.about-wrapper {
    .item-title {
        font-size: .2rem;
        color: #1d262d;
    }
    .item-textt {
        color: #999;
        font-size: .2rem;
        margin-top: 0.1rem;
    }
}
</style>
