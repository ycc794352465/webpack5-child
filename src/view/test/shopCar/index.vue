<template>
    <div class="shop-page">
        <div class="srcoll-wrapper">
            <div class="item" v-for="(item,index) in list" :key='index'>
                <img :src="item.url" alt="">
                <div>
                    <div>{{ item.name }}</div>
                </div>
            </div>
        </div>
        <div class="footer">底部</div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { getShopList } from '@/common/api.js'
const list = ref([])

getShopList().then(res=>{
    if(res.code == 1) {
        list.value = res.data.map(item=>{
            return {
                ...item,
                chooseNum: 0 
            }
        })
    }
})
const increase = (index)=>{
    list.value[index].chooseNum++
}
const decrease = (index)=>{
    list.value[index].chooseNum--
}
</script>


<style lang="scss" scoped>
.shop-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    .srcoll-wrapper {
        flex: 1;
        .item {
            display: flex;
            padding: 10px;
            margin-bottom: 12px;
            color: #111;
            font-size: 16px;
            img {
                width: 80px;
                height: 80px;
                margin-right: 6px;
                border-radius: 4px;
            }
        }
    }
    .footer {
        height: 60px;
        background: skyblue;
    }
}
</style>
