import instance from "./interceptor";
import store from "../store/index"
import router from '../router/index'
/**
 * 核心函数，可通过它处理一切请求数据，并做横向扩展
 * @param {url} 请求地址
 * @param {params} 请求参数
 * @param {options} 请求配置，针对当前本次请求；
 * @param loading 是否显示loading
 * @param mock 本次是否请求mock而非线上
 * @param error 本次是否显示错误
 */
function request(
  url,
  params,
  method,
  options = { loading: true, mock: false, error: true }
) {
  // let loadingInstance;
  // 请求前loading
  // if(options.loading)loadingInstance=Loading.service();
  return new Promise((resolve, reject) => {
    let data = {
      body: params,
      header: {
        lang:"",
        phone: "",
        token:(store.state.userInfo.token || ''),
      },
    };
    // console.log(data.header.token)

    // get请求使用params字段
    // if(method =='get')data = {params}
    // post请求使用data字段
    // if(method =='post')data = {data}
    // 通过mock平台可对局部接口进行mock设置
    // if(options.mock)url='http://www.mock.com/mock/xxxx/api';
    instance({
      url,
      method,
      data,
    })
      .then((res) => {
        // 此处作用很大，可以扩展很多功能。
        // 比如对接多个后台，数据结构不一致，可做接口适配器
        // 也可对返回日期/金额/数字等统一做集中处理
        console.log(res);
        if (res.code == 200) {
          resolve(res.body);
        }
        else if (res.code==401 || res.code==403){
          store.commit('logout')
          router.replace('/login').then()
          alert(res.message)
        } 
        else {
          // 通过配置可关闭错误提示
          if (options.error) alert(res.message);
          reject(res);
        }
      })
      .catch((error) => {
        // alert(error.message)
      })
      .finally(() => {
        // loadingInstance.close();
      });
  });
}
// 封装GET请求
function get(url, params) {
  return request(url, params, "get");
}
// 封装POST请求
function post(url, params) {
  return request(url, params, "post");
}
export default {
  get,
  post,
};
