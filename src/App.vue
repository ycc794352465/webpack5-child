<template>
  <div>Hello Webpack!</div>
  <router-view></router-view>
</template>

<script>
export default {
    data(){}
}
</script>

<style lang="scss">
#webpack5{
    div{
        color: purple;
        // display: inline-block;
        // animation: rotating 6s linear infinite;
    }
}
@keyframes rotating{
    from{
        transform: rotate(0);
    }
    to{
        transform: rotate(360deg);
    }
}
</style>