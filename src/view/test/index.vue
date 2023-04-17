<template>
    <div>
        <text-amition></text-amition>
    </div>
</template>

<script>
import TextAmition from '@/components/textAmition'

export default {
    components:{
        TextAmition
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

