<template>
    <div class="broadcast-box">
        <i class="iconfont icon-V"></i>
        <swiper :options="options">
            <swiper-slide v-for="item in data" :key="item.id" @click.native="toPage(item)">{{item.name}}</swiper-slide>
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
        data: Array
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
        toPage(item) {
            if (item.link) {
                window.location.href = item.link
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
    margin-top: .1rem;
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
