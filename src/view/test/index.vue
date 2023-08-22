<template>
  <div class="test-page">
    <my-tab :data="list" @custom-change='tabChange'></my-tab>
    <keep-alive>
      <component :is="activeComponent" />
    </keep-alive>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TextAmition from "@/components/textAmition";
import myTab from "../../components/myTab.vue";
import CssVirtralList from "@/components/cssVirtralList.vue";
// fetch('https://www.baidu.com').then(res=>{
//     console.log(11111111111)
// })
console.log("setup");
let activeComponent = ref(TextAmition) 
const list = ['标签一','标签二']
const script = document.createElement("script");
script.src = `https://api-uat1.wsfmall.com/api/mobile/categorybyparentid?parentId=0`; // 你的url
document.body.appendChild(script);
script.onload = () => {
  document.body.removeChild(script);
};
const compS = [TextAmition, CssVirtralList]
const tabChange =(e)=>{
    console.log(e)
    activeComponent.value = compS[e]
}
</script>

<style lang="scss" scoped>
.test-page {
  // height: 100vh;
  // display: flex;
  // flex-direction: column;
  // .srcoll-container {
  //     flex: 1;
  // }
}
</style>
