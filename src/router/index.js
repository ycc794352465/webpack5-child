
export const routes = [
  {
    path: '/home',
    name: 'home',
    component: ()=> import(/* webpackChunkName: "about" */'../view/home-view/index.vue')
  },
  // {
  //   path: '/vue1/about',
  //   name: 'about',
  //   component: ()=>import('../views/AboutView.vue')
  // }
]
