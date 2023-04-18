<template>
    <div class="srcoll-container">
        <div v-for="(item,index) in list" :key='index'>{{ item.text }}</div>
    </div>
</template>


<script>

</script>

<script setup>
import {ref} from 'vue'

const list = ref([])
for(let i = 0;i<10000;i++){
    list.value.push({
        text: i+1
    })
}
</script>

<style lang="scss" scoped>
.srcoll-container {
    content-visibility: auto;
}
</style>


