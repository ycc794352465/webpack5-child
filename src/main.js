import { createApp } from 'vue'
import App from './App.vue'
import { routes } from './router'

import { createRouter, createWebHistory } from 'vue-router'

import vantComp from './common/ui.js'
console.log(vantComp,11111)

const componName = Object.keys(vantComp)

import 'vant/lib/index.css';
import "./public-path";
const APP_NAME = require('../package.json').name;
console.log('xiong ling');
let app;
function render(props = {}) {
  const router = createRouter({
    history: createWebHistory(`/${APP_NAME}/`),
    routes
  })
  console.log(process.env)
  const { container } = props
  app = createApp(App)
  componName.forEach(item=>{
    app.use(vantComp[item])
  })
  // 在Vue原型上挂载 props
  // ！不可以app.createApp(App)后去挂载props,会报错，找不到config
  app.config.globalProperties.$mainProps = props
  // 限制查找范围，可能会命中其他微应用的 #app
  app.use(router).mount(container ? container.querySelector('#webpack5') : '#webpack5')
}

// 未接入qiankun 直接渲染
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}
/**
 * bootstrap 只会在微应用初始化的时候调用一次，
 * 下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  //监听qiankun全局的state
  props.onGlobalStateChange((state) => {
    console.log('微应用监听global数据变化', state)
  }, true);
  console.log(props)
  render(props)
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
  // app = null;
  const { container } = props
  app.unmount(container ? container.querySelector('#app') : '#app')

}