<template>
    <div class="swiper-box banner-wrapper">
        <!-- <a-carousel autoplay dotPosition="bottom">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
        </a-carousel> -->
        <swiper :options="options">
            <swiper-slide @click.native="toPage(item)" v-for="(item, i) in data" :key="i"><img :src="item.url"></swiper-slide>
        </swiper>
        <div class="swiper-pagination" slot="pagination"></div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
    components: {
        Swiper,
        SwiperSlide
    },
    props: {
        data: {
            type: Array
        }
    },
    data() {
        return {
            options: {
                loop: true,
                autoplay: true,
                pagination: {
                    el: '.swiper-pagination'
                }
            }
        }
    },
    methods: {
        toPage(item) {
            if (item.link) {
                if (/^http(s)?:\/\//.test(item.link)) {
                    window.location.href = `${item.link.replace(/^http(s)?:\/\//, 'http://')}${item.link}`
                } else {
                    window.location.href = `http://${item.link}`
                }
            }
        }
    }
}
</script>

<style scope lang="less">
.swiper-box {
    box-sizing: border-box;
    font-size: .24rem;
    position: relative;
    img {
        width: 100%;
        height: 100%;
    }
    .swiper-pagination {
        width: 100%;
        bottom: 0;
        left: 0;
        .swiper-pagination-bullet {
            margin-right: .1rem;
            background-color: #fff;
        }
    }
}
</style>
