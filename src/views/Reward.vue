<template>
    <div class="earning-detail reward-wrapper">
        <div class="title">奖励总览</div>
        <div class="top">
            <p>总金额</p>
            <div>
                <span class="money">0</span>
                <span> CNY</span>
            </div>
        </div>
        <div class="table-wrapper">
            <div class="item-wrapper">
                <div class="th">
                    <span>日期时间</span>
                    <span>金额</span>
                </div>
                <div class="tr">
                    <span>2020-04-01 20:00:00</span>
                    <span>0.00</span>
                </div>
            </div>
            <div class="item-wrapper">
                <div class="th">
                    <span>日期时间</span>
                    <span>金额</span>
                </div>
                <div class="tr">
                    <span>2020-04-01 20:00:00</span>
                    <!-- <span>0</span> -->
                    <span>100.00</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="less">
.reward-wrapper {
    height: 100%;
    & > div {
        background-color: #fff;
    }
    .th {
        color: #1951a3 !important;
        font-size: .28rem !important;
    }
    .th, .tr {
        span {
            width: 50% !important;
            &:nth-child(2) {
                text-align: right;
            }
        }
    }
}
</style>
