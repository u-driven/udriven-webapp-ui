import { ref, watch } from 'vue'
export default function () {
  // Screen
  const isOverLgSize = ref(false)
  window.addEventListener('resize', (e) => {
    isOverLgSize.value = e.target.innerWidth >= 768
  })

  watch(
    () => window.innerWidth,
    (newVal) => {
      if (newVal > 768) {
        isOverLgSize.value = true
      }
    },
    { immediate: true }
  )
  return {
    isOverLgSize
  }
}
