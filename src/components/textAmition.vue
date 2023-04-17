<template>
    <div class="my-parap">
        <span>
            这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本
        </span>
    </div>
</template>

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

