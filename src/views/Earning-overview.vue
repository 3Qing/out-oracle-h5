<template>
    <div class="earning-overview-wrapper earning-detail">
        <div class="title">交易总览</div>
        <div class="top">
            <p>总资产</p>
            <div>
                <span class="money">0</span>
                <span> &#8776; 0.00 BTC</span>
            </div>
        </div>
        <div class="table-wrapper">
            <div class="item-wrapper">
                <div class="item-header">
                    <span>昨日收益</span>
                </div>
                <div class="th">
                    <span>可用(FOT)</span>
                    <span>冻结(FOT)</span>
                    <span>折合(CNY)</span>
                </div>
                <div class="tr">
                    <span>0</span>
                    <span>0</span>
                    <span>0.00</span>
                </div>
            </div>
            <div class="item-wrapper">
                <div class="item-header">
                    <span>30天收益</span>
                </div>
                <div class="th">
                    <span>可用(FOT)</span>
                    <span>冻结(FOT)</span>
                    <span>折合(CNY)</span>
                </div>
                <div class="tr">
                    <span>0</span>
                    <span>0</span>
                    <span>0.00</span>
                </div>
            </div>
            <div class="item-wrapper">
                <div class="item-header">
                    <span>年化收益</span>
                </div>
                <div class="th">
                    <span>可用(FOT)</span>
                    <span>冻结(FOT)</span>
                    <span>折合(CNY)</span>
                </div>
                <div class="tr">
                    <span>0</span>
                    <span>0</span>
                    <span>0.00</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="less">
.earning-overview-wrapper {
    padding: 0 !important;
    display: block !important;
    & > div {
        padding: 0 .4rem;
        background: #fff;
    }
    .title {
        color: #000;
        font-size: .32rem;
        font-weight: bold;
        padding: 0 .4rem;
    }
    .top {
        padding: .3rem .4rem;
        font-size: .2rem;
        color: rgba(0, 0, 0, 0.35);
        p {
            margin-bottom: .1rem;
        }
        .money {
            font-size: .36rem;
            color: #000;
        }
    }
    .table-wrapper {
        .item-wrapper {
            .item-header {
                span:nth-child(1) {
                    color: #1951a3 !important;
                }
            }
        }
    }
}
</style>
