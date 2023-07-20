const routes = []
const files = require.context("../view", true, /\.vue$/).keys()
files.forEach(item => {
  const partArr = item.split('/')
  const path = partArr.reduce((cur,item,index)=>{
    if(index!=0 && index != partArr.length-1) {
      return cur+'/'+item
    } else {
      return cur
    }
  }, '')
  const name = partArr.reduce((cur,item,index)=>{
    if(index!=0 && index != partArr.length-1) {
      let capitalized = index != 1 ? (item.charAt(0).toUpperCase() + item.slice(1)) : item
      return cur+capitalized
    } else {
      return cur
    }
  }, '')
  routes.push({
    path,
    name,
    component: ()=>import(`../view${item.substring(1)}`)
  })
})

export {
  routes
}


