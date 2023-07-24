<template>
    <div class="goods-item" @click="toPage">
        <img :src="item.url" alt="">
        <div class="detail">
            <div>{{ item.name }}</div>
            <div>￥{{ item.price }}</div>
        </div>
    </div>
</template>

<script setup>

defineProps({
    item: {
        default: ()=>{},
        type: Object
    }
})
const emit = defineEmits(["toOther"])

const toPage = ()=>{
    emit("toOther",{data: 111})
}
</script>

<style lang="scss" scoped>
.goods-item {
    display: flex;
    margin-top: 10px;
    padding: 10px;
    img {
        width: 100px;
        height: 100px;
        border-radius: 4px;
        margin-right: 6px;
    }
}
</style>