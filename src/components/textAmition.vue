<template>
    <div class="my-parap">
        <span>
            这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本
        </span>
        <van-field v-model="value" label="文本" placeholder="请输入用户名" />
    </div>
</template>
<script setup>
import { ref } from 'vue';
const value = ref('');
</script>
<style lang="scss" scoped>
.my-parap {
    line-height: 28px;
    color: #333;
    span {
        color: #333;
        background: linear-gradient(45deg,blue,red,green) no-repeat;
        background-position: bottom left;
        background-size: 0 2px;
        transition: 1s;
        &:hover{
            background-size: 100% 2px;
        }
    }
}
</style>

