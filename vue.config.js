const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './' // 為 repo 名稱for gitgub page,給本地端只要./
    : '/'  //偵測為是否是打包狀態//
}