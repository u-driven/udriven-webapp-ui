import { defineStore } from 'pinia'

export const usePiStore = defineStore('store', {
  state: () => ({
    // api header
    headers: {
      username: '',
      'user-credential': '',
    },
    headersAuth: {
      az: '',
    },
    logOutTime: 60,
    instrumentationKey: null,
    customerIdentity: '',
    // current user id
    currentUserId: '',
    // 權限管理 PREMIUM ESSENTIAL
    auth: 'PREMIUM',
    // 顯示模式 'light' 'dark'
    themeMode: 'dark',
    version: '',
    filter: {
      enableMournMode: false,
      enableColorAmblyopiaMode: false,
    },
    loginExpiredMessage: '',
    insightsLoading: false,
    isLoading: false,
    // user role "ADMIN", "EDITOR", "VIEW"
    userRole: 'ADMIN',
    // Event log
    appInsights: null,
    // Maintenance mode暫存
    underMaintenance: false,
    // 多語系
    locale: localStorage.getItem('locale') ?? 'en-US',
    // 當前環境
    currentEnv: '',
    // 限制提醒係數
    limitAlert: 0.8,
    // 上傳檔案大小
    uploadSizeLimitation: 250,
    // table 參數
    pageSize: 50,
    paginationPageSize: 20,
    // Device static storage type
    storageData: [],
    ramData: [],
    bluetoothData: [],
    // Timezone
    timezoneList: [],
    // Time Format
    timeFormat: {
      type1: 'YYYY-MM-DD HH:mm',
      type2: 'YYYY-MM-DD',
    },
    gotoCustomizedEmail: false,
  }),
  actions: {
    updateUserHeader(payload) {
      this.headers = payload
    },
    updateUserHeaderAuth(payload) {
      this.headersAuth.az = payload
    },
    updateInstrumentationKey(payload) {
      // console.log('payloadpayloadpayload', payload)
      this.instrumentationKey = payload
    },
    updateCustomerIdentity(payload) {
      this.customerIdentity = payload
    },
    updateCurrentUserId(payload) {
      this.currentUserId = payload
    },
    updateSku(payload) {
      this.auth = payload
    },
    updateUserRole(payload) {
      this.userRole = payload
    },
    updateInsightsLoading(payload) {
      this.insightsLoading = payload
    },
    updateIsLoading(payload) {
      this.isLoading = payload
    },
    updateLocale(payload) {
      this.locale = payload
    },
    updateCurrentEnv(payload) {
      console.log('updateCurrentEnv', payload)
      this.currentEnv = payload
    },
    updateMaintenance(payload) {
      this.underMaintenance = payload
    },
    updateDeviceRenderData(payload) {
      this.deviceConnectListLength = payload
    },
    updateInactiveData(payload) {
      this.deviceInactiveData = payload
    },
    updateInactiveLength(payload) {
      this.deviceInactiveListLength = payload
    },
    updateRenderInactiveData(payload) {
      this.deviceRenderInactive = payload
    },
    updateAppInsights(payload) {
      this.appInsights = payload
    },
    updateStorageData(payload) {
      this.storageData = payload
    },
    updateRamData(payload) {
      this.ramData = payload
    },
    updateBluetoothData(payload) {
      this.bluetoothData = payload
    },
    updateTimezoneList(payload) {
      this.timezoneList = payload
    },
    updateThemeMode(payload) {
      console.log('updateThemeMode', payload)
      localStorage.setItem('theme-mode', payload)
      this.themeMode = payload
    },
    updateGotoCustomizedEmail(payload) {
      this.gotoCustomizedEmail = payload
    },
    updateFilter(payload) {
      console.log('updateFilter', payload)
      this.filter.enableMournMode = payload[0]
      this.filter.enableColorAmblyopiaMode = payload[1]
      if (payload[0] && payload[1]) {
        document.documentElement.style.setProperty('filter', 'grayscale(100%) invert(80%)')
      } else if (payload[0]) {
        document.documentElement.style.setProperty('filter', 'grayscale(100%)')
      } else if (payload[1]) {
        document.documentElement.style.setProperty('filter', 'invert(80%)')
      } else {
        document.documentElement.style.removeProperty('filter')
      }
    },
    updateVersion(payload) {
      this.version = payload
      if (payload === 'V2') {
        document.documentElement.classList.add('V2')
        document.body.setAttribute('data-menu-mode', 'V2')
        localStorage.setItem('data-menu-mode', 'V2')
      } else {
        document.documentElement.classList.remove('V2')
        document.body.removeAttribute('data-menu-mode')
        localStorage.removeItem('data-menu-mode')
      }
    },
  },
})
