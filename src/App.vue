<template>
  <!-- <div>Hello Webpack!</div> -->
  <router-view></router-view>
</template>

<script>
export default {
    data(){}
}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    list-style: none;
}
body {
    margin: 0;
    padding: 0;
}
#webpack5{
    font-size: 18px;
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