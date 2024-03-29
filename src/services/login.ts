import type { LoginResult } from '@/types/member'
import { http } from '@/utils/http'
type LoginPaprams = {
  code: string
  encryptedData: string
  iv: string
}
/**
 *小程序登陆
 * @param data 请求参数
 * @returns
 */
export const postLoginWxMin = (data: LoginPaprams) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })
}

export const postLoginWxMinSimpleAPI = (phoneNumber: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber,
    },
  })
}
