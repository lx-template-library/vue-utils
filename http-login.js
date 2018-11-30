import axios from 'axios'
// import store from '../store'
// import * as types from '../types'
// import router from '../router'


// axios.defaults.baseURL = '/api';
axios.defaults.timeout = 10000;

axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      // config.headers = {
      //   'Content-Type': 'application/x-www-form-urlencoded',
      //   'authorization': `token ${store.state.token}`
      // }
    }
    return config
  },
  err => {
    return Promise.reject(err)
  },
)

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
  return response;
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求'
        break;
        case 401:
          // 401 清除token信息并跳转到登录页面
          // store.commit(types.LOGOUT)
          // // 只有在当前路由不是登录页面才跳转
          // router.currentRoute.path !== 'login' &&
          //   router.replace({
          //     path: 'login',
          //     query: { redirect: router.currentRoute.path },
          //   })
        break;
      case 403:
        err.message = '拒绝访问'
        break;
      case 404:
        err.message = '请求错误,未找到该资源'
        break;
      case 405:
        err.message = '请求方法未允许'
        break;
      case 408:
        err.message = '请求超时'
        break;
      case 500:
        err.message = '服务器端出错'
        break;
      case 501:
        err.message = '网络未实现'
        break;
      case 502:
        err.message = '网络错误'
        break;
      case 503:
        err.message = '服务不可用'
        break;
      case 504:
        err.message = '网络超时'
        break;
      case 505:
        err.message = 'http版本不支持该请求'
        break;
      default:
        err.message = `连接错误${err.response.status}`
    }
  } else {
    err.message = "连接到服务器失败"
  };
  return Promise.resolve(err.response);
})
export default axios;
