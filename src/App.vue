<template>
  <router-view />

</template>
<script setup>
import { watch, onMounted, nextTick, defineComponent, h, render } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePiStore } from '@/store/index.js'
import { useRoute, useRouter } from 'vue-router'
import { router as Router } from '@/router'

const router = useRouter()
const route = useRoute()
const { locale } = useI18n()
const store = usePiStore()

watch(locale, (newLocale) => {
  localStorage.setItem('locale', newLocale)
})

const handleStorageChange = (event) => {
  if (event.key === 'theme-mode') {
    store.updateThemeMode(event.newValue)
  }
}

onMounted(() => {
  store.updateThemeMode(localStorage.getItem('theme-mode') ? localStorage.getItem('theme-mode') : 'dark')
  store.updateVersion(localStorage.getItem('data-menu-mode') ? localStorage.getItem('data-menu-mode') : '')

  window.addEventListener('storage', handleStorageChange)
  // nextTick(() => {
  //   if (window.requestIdleCallBack) {
  //     window.requestIdleCallBack(preloadComponents)
  //   } else {
  //     setTimeout(preloadComponents, 1000)
  //   }
  // })
})

// const preloadComponents = async () => {
//   const Routes = Router.getRoutes()
//   await router.isReady()
//   Routes.forEach((Route) => {
//     if (!route.path.includes(Route.path) && typeof Route.components.default === 'function') {
//       setTimeout(() => {
//         const vnode = h(defineComponent(Route.components.default))
//         render(vnode, document.createElement('div'))
//       }, 1000)
//     }
//   })
// }
</script>
<style lang="scss">
@import '@/assets/scss/all.scss';
</style>
