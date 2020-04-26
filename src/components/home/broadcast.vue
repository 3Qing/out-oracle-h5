<template>
    <div class="broadcast-box">
        <i class="iconfont icon-V" v-if="icon"></i>
        <swiper :options="options" @click-slide="toPage">
            <swiper-slide v-for="item in data" :key="item.id">{{item.name}}</swiper-slide>
        </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from  'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
    components: {
        Swiper,
        SwiperSlide
    },
    props: {
        data: Array,
        icon: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            options: {
                direction: 'vertical',
                autoplay: true,
                loop: true
            }
        }
    },
    methods: {
        toPage(index, realIndex) {
            if (this.data[realIndex].link) {
                window.location.href = this.data[realIndex].link
            }
        }
    }
}
</script>

<style scoped lang="less">
.broadcast-box {
    height: .48rem;
    line-height: .48rem;
    overflow: hidden;
    font-size: .24rem;
    position: relative;
    .iconfont {
        position: absolute;
        left: 0;
        top: 0;
        color: #00233d;
        font-size: 0.32rem;
    }
    .swiper-container {
        padding-left: 0.4rem;
        height: inherit !important;
    }
}
</style>
