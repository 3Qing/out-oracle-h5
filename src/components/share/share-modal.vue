<template>
    <a-drawer
        placement="bottom"
        wrapClassName="share-modal"
        :closable="false"
        @close="close"
        :visible="visible">
        <ul class="share-list">
            <li>
                <i class="iconfont icon-weixin"></i>
                <p>微信</p>
            </li>
            <li>
                <i class="iconfont icon-pengyouquan-copy"></i>
                <p>朋友圈</p>
            </li>
        </ul>
        <div class="footer text-center" @click="close">取消</div>
    </a-drawer>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // visible: false
        }
    },
    methods: {
        close() {
            this.$emit('close')
        }
    }
}
</script>

<style lang="less">
.share-modal {
    .ant-drawer-wrapper-body {
        .ant-drawer-body {
            padding: .2rem .4rem 0;
        }
    }
    .share-list {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 0;
        li {
            width: 33%;
            text-align: center;
            .iconfont {
                color: #04BE02;
                font-size: .72rem;
            }
            p {
                font-size: .2rem;
            }
        }
    }
    .footer {
        height: 1rem;
        line-height: 1rem;
        margin-top: .2rem;
        border-top: 1px solid #f8f8f8;
    }
}
</style>
