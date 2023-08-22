<template>
  <van-tabs v-model:active="active" @change='tabChange'>
      <van-tab v-for="(item,index) in data" :key='index' :title="item">
        <slot></slot>
      </van-tab>
  </van-tabs>
</template>

<script setup>
import { ref, toRefs } from 'vue';
const props = defineProps({
  data: {
    type: ()=>[],
    default: []
  }
})
const emit = defineEmits(['customChange'])
const { data } = toRefs(props)
let active = ref('')
const tabChange =(event)=>{
  emit('customChange', event)
}
</script>