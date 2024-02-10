import { useMemberStore } from '@/stores'

/**
 *添加拦截器
 * 拦截request请求
 *拦截 uploadfile 文件上传
 *
 * TODO
 * 1.非http开头需拼接地址
 * 2.请求超时
 * 3.添加小程序端请求头标识
 * 4.添加token 请求头标识
 */
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
//添加拦截器
const httpInterceptor = {
  //拦截器触发
  invoke(options: UniApp.RequestOptions) {
    //1.非http开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    //2.请求超时，默认60s 改为10s
    options.timeout = 10000
    // 3.添加小程序端请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp ',
    }
    // 4.添加token 请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
      console.log(token)
    }
  },
}
uni.addInterceptor('request', httpInterceptor)

uni.addInterceptor('uploadfile', httpInterceptor)

/**
 * 请求函数
 * @param UniApp.RequestOptions
 * @returns Promise
 *  1.返回promise对象
 * 2.请求成功
 *  2.1 提取核心数据res.data
 *  2.2 添加类型，支持泛型
 * 3.请求失败
 *  3.1 网络错误-提示用户换网络
 *  3.2 401错误-清理用户信息，跳转登录
 *  3.3 其他错误 -根据后端返回信息轻提示
 */
interface Data<T> {
  code: string
  msg: string
  result: T
}
export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, rejects) => {
    uni.request({
      ...options,
      // 2.请求成功
      success(res) {
        //状态码2xx
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          //401 -清理用户信息 跳转登录页
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          rejects()
        } else {
          //其他错误
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
          })
        }
      },
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，请稍后尝试',
        })
        rejects(err)
      },
    })
  })
}
