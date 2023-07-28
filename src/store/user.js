import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    // 为了完整类型推理，推荐使用箭头函数
    state: () => {
        return {
            name: '尹聪聪',
            age: 26,
            money: 100
        }
    },
    getters: {
        getBasic(state) {
            console.log(state,222222)
            return `${this.name}--${state.age}`
        }
    },
    actions: {
        changeMoney() {
            this.money++
        }
    }
})