<template>
    <div class="test-page">
        <text-amition></text-amition>
        <css-virtral-list></css-virtral-list>
    </div>
</template>

<script>
import TextAmition from '@/components/textAmition'
import CssVirtralList from '@/components/cssVirtralList.vue'
export default {
    components:{
        TextAmition,
        CssVirtralList
    },
    beforeCreate() {
        console.log('beforeCreate')
    },
    created(){
        console.log('created')
    },
    setup() {
        // fetch('https://www.baidu.com').then(res=>{
        //     console.log(11111111111)
        // })
        console.log('setup')
     
        const script=document.createElement('script');
        script.src=`https://api-uat1.wsfmall.com/api/mobile/categorybyparentid?parentId=0`; // 你的url
        document.body.appendChild(script)
        script.onload=()=>{
            document.body.removeChild(script);
        }
        
    }
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


