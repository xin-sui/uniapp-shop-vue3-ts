import type { XtxGuessInstance } from '@/components/components'
import { ref } from 'vue'
//猜你喜欢组合式函数
export const useGuessList = () => {
  //猜你喜欢组件实例
  const guessRef = ref<XtxGuessInstance>()
  //滚动触底
  const onScrolltolower = () => {
    guessRef.value?.getMore()
  }
  // 返回ref和事件处理
  return {
    guessRef,
    onScrolltolower,
  }
}
