const path = require('path')

module.exports = {
  
  alias: {
    '/@/': path.resolve(__dirname, 'src')
  },
  open: true, // 浏览器自动打开
  https: false, // 是否开启 https
  ssr: false, // 服务端渲染
  // cssPreprocessOptions: {
  //   scss: {
  //     additionalData: '@import "./src/assets/scss/all.scss";' // 添加公共样式
  //   }
  // }  
  
}
