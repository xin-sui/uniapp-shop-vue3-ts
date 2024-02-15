<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getHomeBannerAPI, getHomeCategorylAPI, getHomeHotPanel } from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import type { XtxGuessInstance } from '@/components/components'

//轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
  // console.log(res.result)
}
//前台分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategorylAPI()
  // console.log(res)
  categoryList.value = res.result
}
// 首页-热门推荐
const hotPanelList = ref<HotItem[]>([])
const getHomeHotPanelData = async () => {
  const res = await getHomeHotPanel()
  console.log(res.result)
  hotPanelList.value = res.result
}
onLoad(() => {
  getHomeBannerData()
  getHomeCategoryData()
  getHomeHotPanelData()
})
// 滚动触发
// 获取猜你循环组件实例
const guessRef = ref<XtxGuessInstance>()
const onScrolltolower = () => {
  // 调用子组件暴露的方法
  guessRef.value?.getMore()
}
//自定义下拉刷新被触发
const isTriggered = ref(false)
const onrefresherrefresh = async () => {
  //开启动画
  isTriggered.value = true
  // await getHomeBannerData()
  // await getHomeCategoryData()
  // await getHomeHotPanelData()
  //等待所有接口调用完毕
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotPanelData()])
  //关闭动画
  isTriggered.value = false
}
</script>

<template>
  <!-- 自定义状态栏 -->
  <CustomNavbar />
  <!-- 滚动容器 -->
  <scroll-view
    @refresherrefresh="onrefresherrefresh"
    @scrolltolower="onScrolltolower"
    :refresher-triggered="isTriggered"
    refresher-enabled
    class="scroll-view"
    scroll-y
  >
    <!-- //自定义轮播图 -->
    <XtxSwiper :list="bannerList" />
    <!-- 前台分类 -->
    <CategoryPanel :categoryList="categoryList"></CategoryPanel>
    <!-- 首页-热门推荐 -->
    <HotPanel :list="hotPanelList"></HotPanel>
    <!-- 猜你喜欢 -->
    <XtxGuess ref="guessRef"></XtxGuess>
  </scroll-view>
</template>

<style lang="scss">
//页面背景颜色
page {
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.scroll-view {
  flex: 1;
}
</style>
