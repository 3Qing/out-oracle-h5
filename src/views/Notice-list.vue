<template>
    <div class="notice-wrapper">
        <notice-list :opt="opt"></notice-list>
    </div>
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
                title: '公告中心'
            }
        }
    }
}
</script>

<style lang="less">
.notice-wrapper {
    height: 100%;
    padding: 0 .4rem;
    background-color: #fff;
    .notice-list {
        padding-top: 0;
        .card-header {
            font-size: .40rem;
        }
    }
}
</style>
