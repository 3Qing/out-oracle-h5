<template>
    <div class="set-wrapper">
        <div class="set-item" v-for="(item, i) in listData" :key="i">
            <span class="item-label">{{item.label}}</span>
            <div class="item-oper">
                <img v-if="item.avatar" :src="item.avatar" alt="头像">
                <span>{{item.value}}</span>
                <a-icon type="right" v-if="item.showIcon"></a-icon>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            listData: [{
                label: '切换语言',
                value: '简体中文',
                showIcon: true
            }, {
                label: '帮助与反馈',
                showIcon: true
            }, {
                label: '当前版本',
                value: '1.0.0',
                showIcon: false
            }]
        }
    }
}
</script>

<style scoped>

</style>
