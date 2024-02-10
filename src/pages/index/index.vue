<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import CustomNavbar from './components/CustomNavbar.vue'
import { getHomeBannerAPI } from '@/services/home'
import { ref } from 'vue'
import type { BannerItem } from '@/types/home'
import CategoryPanel from './components/CategoryPanel.vue'

//轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
  console.log(res.result)
}
onLoad(() => {
  getHomeBannerData()
})
</script>

<template>
  <!-- 自定义状态栏 -->
  <CustomNavbar />
  <!-- //自定义轮播图 -->
  <XtxSwiper :list="bannerList" />
  <CategoryPanel></CategoryPanel>
  <view>index</view>
</template>

<style lang="scss">
//
page {
  background-color: #f7f7f7;
}
</style>
