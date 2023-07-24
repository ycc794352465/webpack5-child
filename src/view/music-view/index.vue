<template>
    <div class="container">
        <audio ref="myAudio" :src="require('@/view/music-view/yequ.mp3')" controls></audio>
        <div ref="scrollWrapper" class="scroll-wrapper">
            <ul ref="scrollUl" :style="uIStyle">
                <li v-for="(item,index) in ltrArr" :key='index' :class="{'active': item.active}">{{item.words}}</li>
            </ul>
        </div>
        
    </div>
</template>

<script setup>
import {  getCurrentInstance, onMounted, ref } from 'vue';
import LtrData from './data.js'
/**
 * 获取歌词数组
 * @return 格式{words:'fsfa',time: 3232,active: false}
 */
function getLtrArr() {
    const partArr = LtrData.split('\n')
    const ltrArr = partArr.map(item=>{
        const arr = item.split(']')
            return {
                words: arr[1],
                time: getTimeNumber(arr[0].substring(1)),
                active: false
            }
    }) 
    return ltrArr
}

/**
 * 处理时间字符为转为秒级数字
 * @return 返回一个时间数字（秒单位）
 */
function getTimeNumber(str) {
    const arr =str.split(':')
    let result = 0
    if(+arr[0]>0) {
        result = +arr[0] * 60 + (+arr[1])
    } else {
        result = +arr[1]
    }
    return result
}

const ltrArr = ref(getLtrArr())
const uIStyle = ref('')
// const myAudio = ref(null)
// const scrollUl = ref(null)
// const scrollWrapper = ref(null)

onMounted(()=>{
    const { myAudio, scrollUl, scrollWrapper} = getCurrentInstance().refs
   
    console.log(myAudio)
    
    myAudio.addEventListener('timeupdate',(e)=>{
        const val = ltrArr.value
        let i = 0;
        val.forEach(item=>{item.active = false})
        while(i<val.length && val[i].time<=e.target.currentTime) {
            i++;
        }
        val[i-1].active = true

        let moveY = 0
        const srollHeight = scrollWrapper.clientHeight
        const item = scrollUl.children[i-1]
        const halfHeight = srollHeight/2 - item.clientHeight/2
        if(halfHeight<item.offsetTop) {
            moveY = item.offsetTop - halfHeight
        } else {
            moveY = 0
        }
        uIStyle.value = `transform:translateY(-${moveY}px);`
    })
})


</script>

<style lang="scss" scoped>

.container {
    background: #000;
    min-height: 100vh;
    text-align: center;
    audio {
        width: 80%;
        margin: 30px 0;
    }
    .scroll-wrapper {
        height: 420px;
        overflow: hidden;
        font-size: 14px;
        ul {
            transition: 0.5s;
            li {
                height: 30px;
                line-height: 30px;
                color: #666;
                transition: 0.5s;
                &.active {
                    color: #fff;
                    // transform: scale(1.2);
                }
            }
        }
    }
}

</style>

