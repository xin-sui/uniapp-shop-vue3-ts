import type { PageParams, PageResult } from '@/types/global'
import type { HotItem, BannerItem, CategoryItem, GuessItem } from '@/types/home'
import { http } from '@/utils/http'

// distributionSite
// 可选
// 广告区域展示位置
// 1 为首页（默认值）
// 2 为商品分类页
export const getHomeBannerAPI = (distributionSite = 1) => {
  return http<BannerItem[]>({
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}
// 首页 - 前台分类
export const getHomeCategorylAPI = () => {
  return http<CategoryItem[]>({
    url: '/home/category/mutli',
  })
}
/** 首页-热门推荐数据类型 */
export const getHomeHotPanel = () => {
  return http<HotItem[]>({
    url: '/home/hot/mutli',
  })
}
/**
 * 猜你喜欢-小程序
 */
export const getHomeGoodsGuessLikeAPI = (data?: PageParams) => {
  return http<PageResult<GuessItem>>({
    method: 'GET',
    url: '/home/goods/guessLike',
    data,
  })
}
