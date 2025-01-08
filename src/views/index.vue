<template>
  <div class="web">
    <div class="layout-content">
      <transition
        name="fade-long"
        mode="out-in"
        @before-leave="handleAnimation('leave')"
        @after-enter="clearMiddleAnimation"
        @after-leave="clearMiddleAnimation"
      >
        <div  class="overflow-hidden h-100">
          <div class="layout-content overflow-hidden">
            <div class="layout-content ">
              <div class="layout-content layout-overflow p-7" style="min-height: 300px; overflow-x: hidden">
                <router-view v-slot="{ Component }">
                  <keep-alive :include="cache.includeCache">
                    <component :is="Component" />
                  </keep-alive>
                </router-view>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <Transition style="background: rgba(0, 0, 0, 0.5)" mode="out-in">
        <div
          v-if="demo.demoMode && welcome"
          class="position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
          style="z-index: 2050"
        >
          <div class="align-items-center" style="width: 1000px">
            <Transition mode="out-in">
              <!-- Demo Welcome Page -->
              <div
                v-if="welcome"
                class="d-flex flex-column ud-fw-bold title-font justify-content-center align-items-center p-10 ud-rounded-xs demoWelcomeBg"
                style="gap: 2rem"
              >
                <img class="img-fluid pt-2" :src="store.themeMode === 'dark' ? demoDark : demoLight" height="97" alt="" />
                <span class="ud-font-40 text-center ud-text-blue-700">Demo site of inefi Spotlight</span>
                <div class="text-center mx-md-10" style="padding: 0 40px">
                  <p>
                    Welcome to inefi Spotlight's Demo Site - your gateway to explore the endless possibilities of Spotlight. We value your privacy and
                    do not record any data. Easily restore deleted data with our Refresh button.
                  </p>
                  <p>Unlock the full potential of Spotlight now!</p>
                </div>
                <el-button @click="isClicked" class="ud-font-20 goingButton" plain> Get going</el-button>
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
      <!-- 中間動畫 -->
      <transition name="fade">
        <div v-if="store.version" class="middle-animation" :class="!showMiddleAnimation ? 'vanishing' : ''">
          <div >
            <div  style="width: 10rem; height: 6rem" class="p-0 d-flex">
              <div class="ud-bg-blue-300" style="width: 2rem; height: 6rem"></div>
              <div class="ud-bg-blue-400 rotate-bar" :class="{ rotated: isReversing }"></div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>

  <el-drawer v-model="drawer" :with-header="false">
    <div class="d-flex flex-column justify-content-end h-100">
      <div class="my-2">
        <el-button @click="store.updateFilter([!store.filter.enableMournMode, store.filter.enableColorAmblyopiaMode])">Mourn</el-button>
      </div>
      <div class="my-2">
        <el-button @click="store.updateFilter([store.filter.enableMournMode, !store.filter.enableColorAmblyopiaMode])">Color AmblyopiaMode</el-button>
      </div>
      <div class="my-2">
        <el-button @click="updateColors(updatedColors)">Yellow</el-button>
      </div>
      <div class="my-2">
        {{ switchVersionc }}</div>
      <div class="my-2">
        showMiddleAnimation: {{ showMiddleAnimation }} isReversing: {{ isReversing }}
        <div  :class="!showMiddleAnimation ? 'vanishing' : ''">
          <div  style="width: 10rem; height: 6rem" class="p-0 d-flex">
            <div class="ud-bg-blue-300" style="width: 2rem; height: 6rem"></div>
            <div class="ud-bg-blue-400 rotate-bar" :class="{ rotated: isReversing }"></div>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'Index',
}
</script>
<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
import { usePiStore } from '@/store'
import { demoStore } from '@/store/demoSiteModules.js'
import { useCacheStore } from '@/store/cacheModules.js'
import moment from 'moment'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
const drawer = ref(false)
const demoAdShow = ref(true)
const store = usePiStore()
const demo = demoStore()
const cache = useCacheStore()
const agreeAccept = ref(false)
const route = useRoute()
const router = useRouter()


if (import.meta.env.DEV) {
  demoAdShow.value = false
  demo.updateDemoWelcome(false)
}
// * 監聽 Storage 變化，登入狀態若產生變化同步更新
// Listener storage 運作的 Method (獨立此函數是為了 remove listen 需要具名函數)
const handleStorageListener = (e) => {
  // 檢查user資料是否變動且消失
  if (e.key === 'inefi_userList') {
    let isDuplicateUser = JSON.parse(e.oldValue).some((item) => {
      return item.username === localStorage.getItem('inefi_user')
    })
    // 此段可判斷重複登入Username是否一樣，但考量帳號有可能會被修改role，只有Worker更新.無法更新畫面(Viewer)(後端還是會阻擋)
    // 雖然行為一樣但保留可以區分重複帳號與否暫時先留下此寫法
    if (isDuplicateUser) {
      console.log('restart worker from here')
      location.reload()
      // worker.terminate()
      // worker = generateWorker()
    } else {
      console.log('else need reload')
      location.reload()
    }
  }
}

//=================================================================================END

const welcome = ref(true)
if (JSON.parse(sessionStorage.getItem('welcome')) === false) {
  welcome.value = false
}
const isClicked = () => {
  sessionStorage.setItem('welcome', false)
  demo.updateDemoWelcome(false)
  welcome.value = false
  console.log('eeeeee')
}

const closePopup = () => {
  demoAdShow.value = false
}

// update color
const updateColors = (colors) => {
  document.documentElement.style.setProperty('--ud-color-blue-700', colors.theme)
  document.documentElement.style.setProperty('--ud-text-color-1', colors.color1)
  document.documentElement.style.setProperty('--ud-text-color-2', colors.color2)
  // document.documentElement.style.setProperty('--ud-button-blue-normal', colors.color3)
  document.documentElement.style.setProperty('--ud-button-normal-bg', colors.color4, 'important')
  document.documentElement.style.setProperty('--ud-button-hover-bg', colors.color5, 'important')
  const buttons = document.querySelectorAll('.el-button.el-button--blue')
  buttons.forEach((button) => {
    button.style.setProperty('--ud-button-normal-bg', colors.color1)
    button.style.setProperty('--ud-button-normal-border', colors.color1)
    button.style.setProperty('--ud-button-hover-bg', colors.color5)
    button.style.setProperty('--ud-button-hover-border', colors.color5)
  })
}
const lightenColor = (hex, percent) => {
  let r = parseInt(hex.slice(1, 3), 16)
  let g = parseInt(hex.slice(3, 5), 16)
  let b = parseInt(hex.slice(5, 7), 16)

  r = Math.min(255, Math.floor(r * (1 + percent / 100)))
  g = Math.min(255, Math.floor(g * (1 + percent / 100)))
  b = Math.min(255, Math.floor(b * (1 + percent / 100)))

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

// 使用lightenColor函數來調整顏色的亮度
const updatedColors = {
  theme: lightenColor('#5a2202', 20),
  color1: lightenColor('#a34c1d', 20), // 使色票1更亮 20%
  color2: lightenColor('#ea8751', 20),
  color3: lightenColor('#fde33e', 20),
  color4: lightenColor('#a34c1d', 20),
  color5: lightenColor('#935625', 20),
}
const newColors = {
  theme: '#83372f',
  color1: '#e74c3c', // 新的紅色
  color2: '#3498db', // 新的藍色
  color3: '#2ecc71', // 新的綠色
  color4: '#f39c12', // 新的橙色
  color5: '#9b59b6', // 新的紫色
}

//tab views
// let tabIndex = 2
// const editableTabsValue = ref('1')
// const editableTabs = ref([
//   {
//     title: 'deviceManagement',
//     name: '1',
//     route: '/deviceManagement', // 對應的路由
//   },
//   {
//     title: 'overview',
//     name: '2',
//     route: '/overview', // 對應的路由
//   },
// ])
//
// // 監聽當前選中的 Tab，根據選中的 Tab 進行路由導航
// watch(editableTabsValue, (newValue) => {
//   const currentTab = editableTabs.value.find((tab) => tab.name === newValue)
//   if (currentTab) {
//     router.push(currentTab.route)
//   }
// })
//
// // 移除 Tab
// const removeTab = (targetName) => {
//   editableTabs.value = editableTabs.value.filter((tab) => tab.name !== targetName)
//   if (editableTabsValue.value === targetName && editableTabs.value.length) {
//     editableTabsValue.value = editableTabs.value[0].name
//     router.push(editableTabs.value[0].route) // 移除後導航到第一個 Tab 的路由
//   }
// }
//
// // 新增 Tab
// const addTab = () => {
//   const newTabName = `${++tabIndex.value}`
//   const newTab = {
//     title: `Tab ${newTabName}`,
//     name: newTabName,
//     route: `/tab${newTabName}`, // 動態新增的 Tab 對應路由
//     content: `Content of Tab ${newTabName}`,
//   }
//   editableTabs.value.push(newTab)
//   editableTabsValue.value = newTabName
//   router.push(newTab.route) // 新增後導航到新 Tab 的路由
// }

onUnmounted(() => {
  if (import.meta.env.VUE_APP_NODE_ENV === 'production') {
    // 防止 Listener 繼續洩漏到別的頁面
    window.removeEventListener('storage', handleStorageListener)
  }
})

// 中間動畫控制
const showMiddleAnimation = ref(false)
const isReversing = ref(false) // 判斷動畫方向

const handleAnimation = (action) => {
  console.log('action', action, 'showMiddleAnimation', showMiddleAnimation.value)
  if (action === 'enter') {
    console.log('V3 isReversing', isReversing.value)
    showMiddleAnimation.value = false
    console.log('after V3 isReversing', isReversing.value)
  } else if (action === 'leave') {
    console.log('V2 isReversing')
    nextTick(() => {
      showMiddleAnimation.value = true
    })
    isReversing.value = store.version === 'V2' // 判斷方向：如果是 V2，則反轉
    // 在離開動畫開始前就觸發旋轉，確保動作反向
  }
}

// 清理動畫
const clearMiddleAnimation = () => {
  console.log('clear')
  showMiddleAnimation.value = false
}
</script>

<style lang="scss">
.web {
  height: 100vh;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
}

.demoWelcomeBg {
  //background: url('../assets/images/welcomePage-bg.svg') no-repeat;
  background-position-x: 50%;
  background-position-y: 40%;
  //background-color: #e5f9ff;
  height: 600px;
  @media (max-width:#{ map-get($grid-breakpoints, md)}) {
    width: 90vw;
    padding: 0 10px !important;
    height: 90vh;
    margin: auto;
    background-position-y: 50%;
    border-radius: 10%;
  }
}
.dark .demoWelcomeBg {
  //background: url('../assets/images/dark-welcomePage-bg.svg') no-repeat;
  background-position-x: 50%;
  background-position-y: 40%;
  //background-color: #001d39;
  height: 600px;
  @media (max-width:#{ map-get($grid-breakpoints, md)}) {
    width: 90vw;
    padding: 0 10px !important;
    height: 90vh;
    margin: auto;
    background-position-y: 50%;
    border-radius: 10%;
  }
}

.goingButton {
  height: 69px;
  width: 212px;
  border: solid 3px;
  margin-bottom: 10px;
  &:hover {
    border: solid 3px;
  }
}

.popup {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 205px;
  border-radius: 5px;
  padding: 16px;
  z-index: 105;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.app-setting {
  position: fixed;
  top: calc(50% + 250px);
  right: 0;
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
}
@media (max-width:#{ map-get($grid-breakpoints, lg)}) {
  #menu_container {
    width: 80px;
    min-width: 80px;
    min-height: 80px;
  }
}

.fade-long-enter-active,
.fade-long-leave-active {
  transition: opacity 1s;
}

.fade-long-enter-from,
.fade-long-leave-to {
  opacity: 0;
}

.fade-long-enter-to,
.fade-long-leave-from {
  transition: opacity 2s;
}

/* 中間動畫 */
.middle-animation {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  pointer-events: none;
}
.vanishing {
  opacity: 0;
  transition: 0.8s;
}

.rotate-bar {
  width: 2rem;
  height: 6rem;
  transition: 1.2s ease;
}

.rotate-bar.rotated {
  width: 8rem; /* Change width */
  height: 2rem; /* Change height */
}
</style>
