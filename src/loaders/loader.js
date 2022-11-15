// ./src/loaders/loader.js
module.exports = function (source) {
  const options = this.getOptions();
  const callback = this.async() // 异步处理需要借助async函数

  setTimeout(() => {
    const result = source.replace('xiong ling', options.name);
    callback(null, result)
    // return source.replace('xiong ling', options.name);
  }, 1000)
}