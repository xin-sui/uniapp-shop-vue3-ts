// 导入XtxSwiper组件
import XtxSwiper from './XtxSwiper.vue'
// 声明模块类型，用于在Vue3中全局使用XtxSwiper组件
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
  }
}
