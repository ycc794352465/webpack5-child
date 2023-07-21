<template>
    <div class="shop-page">
        <div class="srcoll-wrapper">
            <div class="item" v-for="(item,index) in list" :key='index'>
                <img :src="item.url" alt="">
                <div class="right-content">
                    <div class="title">{{ item.name }}</div>
                    <div class="desc">{{ item.desc }}</div>
                    <div class="money">
                        <span class="one-price">￥{{ item.price }}💴</span>
                        <van-stepper v-model="item.chooseNum" :min='0' />
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <span>总数：{{ totalChooseNum }}</span>
            <span>总价：{{ totalPrice.toFixed(2) }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
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
const totalChooseNum = computed(()=>{
    return list.value.reduce((cur,item)=>{
        return item.chooseNum + cur
    },0)
})

const totalPrice = computed(()=>{
    return list.value.reduce((cur,item)=>{
        return item.chooseNum*item.price + cur
    },0)
})
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
            font-size: 14px;
            align-items: center;
            img {
                width: 80px;
                height: 80px;
                margin-right: 6px;
                border-radius: 4px;
            }
            .right-content {
                flex: 1;
                .title {
                    font-weight: bold;
                    color: #000;
                    font-size: 16px;
                }
                .desc {
                    color: #666;
                    margin-top: 8px;
                    margin-bottom: 8px;
                }
                .money {
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                    align-items: center;
                    .one-price {
                        font-weight: bold;
                        color: #191919;
                    }
                }
            }
            
        }
    }
    .footer {
        height: 60px;
        background: skyblue;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;
    }
}
</style>
