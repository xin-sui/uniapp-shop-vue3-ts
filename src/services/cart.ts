import { http } from '@/utils/http'
import type { CartItem } from '@/types/car'
/**
 * 加入购物车
 * @param data 请求体参数
 */
export const postMemberCartAPI = (data: { skuId: string; count: number }) => {
  return http({
    method: 'POST',
    url: '/member/cart',
    data,
  })
}

/**
 *获取购物车列表
 */
export const getMemberCartAPI = () => {
  return http<CartItem[]>({
    url: '/member/cart',
  })
}
