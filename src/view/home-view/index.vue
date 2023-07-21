<template>
  <div class="home">
    <Header></Header>
    <h1 @click="updateGlobalState">vue1应用的Home界面</h1>
    <my-tab></my-tab>
    <img class="test-img" src="@/assets/images/bg-desk-top.png" alt="">
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import Header from '@/components/header'
import MyTab from '@/components/MyTab'

export default {
  name: 'HomeView',
  components:{
    Header,
    MyTab
  },
  setup () {
    // 获取Vue原型上的 qiankun传来的 props
    // const { proxy } = getCurrentInstance()
    // const updateGlobalState = () => {
    //   proxy.$mainProps.setGlobalState({
    //     name: 'no Elvin'
    //   })
    // }
    // return {
    //   updateGlobalState,
    // }
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
    // stopTime()
    // alert(1)
  }
}

</script>

<style lang="scss" scoped>
.test-img{
  width: 100%;
}
</style>
