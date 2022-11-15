<template>
  <div class="home">
    <h1 @click="updateGlobalState">vue1应用的Home界面</h1>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'

export default {
  name: 'HomeView',
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