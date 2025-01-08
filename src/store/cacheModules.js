import moment from 'moment'
import { defineStore } from 'pinia'
import { usePiStore } from '@/store/index.js'
export const useCacheStore = defineStore('useCacheStore', {
  state: () => ({
    // Cache 緩存
    enableENV: ['localhost', 'SND', 'DEV', 'TST', 'PRD', 'DEMO'],
    includeCache: [],
    includeCacheFixed: [
      'Devices',
      'MediaIndex',
      'GroupsIndex',
      'Playlist',
      'DownloadWindowsIndex',
      'DownloadLinuxIndex',
      'DownloadAndroidIndex',
      'DownloadToolsIndex',
      'ActivityIndex',
      'SettingIndex',
    ],
    cacheList: [],
    cacheTime: {
      amount: 60,
      unit: 'seconds',
      //'seconds'
    },
  }),
  actions: {
    updateCacheList(payload) {
      const store = usePiStore()
      if (this.enableENV.some((env) => env === store.currentEnv)) {
        // route meta add the cache time, if undefined use default
        let amount = payload.meta.cache ? payload.meta.cache.amount : this.cacheTime.amount
        let unit = payload.meta.cache ? payload.meta.cache.unit : this.cacheTime.unit
        let index = this.cacheList.map((x) => x.route).indexOf(payload.name)
        let content = {
          route: payload.name,
          expired: moment().add(amount, unit).format('X'),
        }
        if (index !== -1) {
          this.cacheList.splice(index, 1, content)
        } else {
          this.cacheList.push(content)
        }
        let cacheArray = []
        this.cacheList.forEach((cache, index) => {
          if (cache.expired >= moment().format('X')) {
            cacheArray.push(cache.route)
          } else {
            this.cacheList.splice(index, 1)
          }
        })
        this.includeCache = cacheArray.concat(this.includeCacheFixed)
        console.log('includeCache', this.includeCache)
      } else {
        this.includeCache = []
        this.cacheList = []
      }
    },
    checkCache() {
      const store = usePiStore()
      if (this.enableENV.some((env) => env === store.currentEnv)) {
        // console.log("checkCache", this.cacheList);
        let cacheArray = []
        this.cacheList.forEach((cache, index) => {
          if (cache.expired >= moment().format('X')) {
            cacheArray.push(cache.route)
          } else {
            this.cacheList.splice(index, 1)
          }
        })
        this.includeCache = cacheArray.concat(this.includeCacheFixed)
        // console.log("includeCache", this.includeCache);
      } else {
        this.includeCache = []
        this.cacheList = []
      }
    },
    clearCache() {
      this.includeCache = []
      this.cacheList = []
    },
    deleteSpecifyCache(payload) {
      // payload 為要刪除頁面名稱(route)
      let index = this.cacheList.map((x) => x.route).indexOf(payload)
      if (index !== -1) {
        this.cacheList.splice(index, 1)
      }
    },
    resetCache() {
      this.includeCache = []
      this.cacheList = []
    },
  },
})
