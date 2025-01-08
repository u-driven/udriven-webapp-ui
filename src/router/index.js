import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress/nprogress'
import '@/assets/scss/uiCover/nprogress.scss'

NProgress.configure({ showSpinner: false })

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/index.vue'),
    children: [
    ],
  },
  {
    path: '/under-maintenance',
    name: 'underMaintenance',
    component: () => import('@/views/UnderMaintenance.vue'),
  },
  //404頁面必須放在router最後
  {
    path: '/NotFound', // /:error -> 匹配 /, /one, /one/two, /one/two/three, 等
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
router.beforeEach(async (to, from) => {
  console.log('from', from)
  console.log('to', to)


  NProgress.start()
  // cache.checkCache()
})

router.afterEach(() => {
  NProgress.done()
  window.scrollTo(0, 0)
})

export { router, routes }
