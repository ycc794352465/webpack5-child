<template>
  <div class="home">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <good-item v-for="item in list" :key="item.id" :item='item' @toOther='toOther'></good-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { recommendCommodity } from '@/common/api.js'
import GoodItem from "@/components/indexItem.vue"

const list = ref([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const apiParam = {
  "orderCode":"",
  "skuId":"",
  "pageType":1,
  "pageNum":0,
  "pageSize":10
}

//定义路由
const router = useRouter()

const onLoad = ()=>{
  recommendCommodity(apiParam).then(res=>{
    if (refreshing.value) {
      list.value = [];
      refreshing.value = false;
    }
    const data = res.data.map(item=>item)
    list.value = list.value.concat(data)
    loading.value = false;
    apiParam.pageNum++

    if (data.length < apiParam.pageSize) {
      finished.value = true;
    }
  })
  
}
const onRefresh=()=>{
   // 清空列表数据
   finished.value = false;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  apiParam.pageNum = 0
  onLoad()
}

const toOther = (data)=>{
  router.push({
    path: '/music-view'
  })
}

/**
 * 让程序卡顿S秒
 */
function stopTime(s) {
  const stratTime = new Date().getTime()
  console.log(stratTime)
  while(stratTime + 3*1000 > new Date().getTime()) {
    console.log(stratTime)
    console.log(new Date().getTime())
  }
}

</script>

<style lang="scss" scoped>
.test-img{
  width: 100%;
}
</style>
