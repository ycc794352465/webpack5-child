<template>
  <div class="home">
    <Header></Header>
    <h1 @click="updateGlobalState">vue1应用的Home界面</h1>
    <my-tab></my-tab>
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
  }
}

</script>