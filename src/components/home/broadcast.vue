<template>
    <div class="broadcast-box">
        <i class="iconfont icon-V"></i>
        <swiper :options="options">
            <swiper-slide>公告1</swiper-slide>
            <swiper-slide>公告2</swiper-slide>
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
    data() {
        return {
            options: {
                direction: 'vertical',
                autoplay: true,
                loop: true
                // height: 0.48 * Number(window.document.documentElement.style.fontSize)
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
        left: 0.4rem;
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
