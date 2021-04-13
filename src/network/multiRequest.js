import axios from "axios";
import store from '../store/index'

  const service = axios.create({
    // 设置baseUr地址,如果通过proxy跨域可直接填写base地址
    baseURL: store.state.baseUrl,
    // baseURL: "http://106.91.70.116:8860",
    // 定义统一的请求头部
    headers: {
      token:store.state.userInfo.token,
      
    },
    // 配置请求超时时间
    timeout: 10000,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
  });
  export default function multiRequest(url,params){
    return new Promise((resolve, reject) => {
      let data = params
      service({
        url,
        method:"post",
        data,
      })
      .then((res) => {
        console.log(res);
        alert(res.data.message)
        if (res.data.code == 200) {
          resolve(res.data.body);
        } else {
          // 通过配置可关闭错误提示
          if (res.data.message) alert(res.data.message);
          // reject(res);
        }
      })
      .catch((error) => {
        // alert(error.message)
      })
      .finally(() => {
        // loadingInstance.close();
      })
    
    })  
  }