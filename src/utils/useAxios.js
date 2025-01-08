// * method: 請求方法  ex. VITE_API_Method_Get='GET'
// * url: 請求Api位置
// * headers: 請求頭
// * body: 請求需帶入的資料，payload or formData..
// * responseType: 預設為json格式，可自訂義（若有新格式須在下方responseType定義）
// * customConfig: 全自定義格式（若在請求是有特別設計時 ex.Download progress）
// * expireTimeCheck - 檢查使用者Token時間是否過期
// * isShowError: 是否需顯示catch的錯誤
import axios from 'axios'
import i18n from '../utils/i18n'
// import expireTimeCheck from '../utils/user/expireTimeCheck'
import { ElNotification } from 'element-plus'
import router from '@/router/index.js'

function generateReqKey(config) {
  const { method, url, params, data } = config
  return [ method, url, JSON.stringify(params), JSON.stringify(data) ].join('&')
}

// 添加請求信息
const pendingRequest = new Map()

function addPendingRequest(config) {
  const requestKey = generateReqKey(config)
  // if (checkAbortExceptionPath(config.url, 'routerAbort')) {
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel)
      }
    })
  // }
}

// 取消重覆請求，移除重覆請求信息
function removePendingRequest(config) {
  const requestKey = generateReqKey(config)
  if (pendingRequest.has(requestKey)) {
    // 新增例外api不被取消重複請求
    // if (checkAbortExceptionPath(config.url, 'duplicateAbort')) {
    // 如果是重覆的請求，則執行對應的cancel函數
    const cancelToken = pendingRequest.get(requestKey)
    cancelToken(requestKey)
    // 將前一次重覆的請求移除
    pendingRequest.delete(requestKey)
    // }
  }
}

// 路由跳轉
export function clearPendingPrlmgmt() {
  for (const [ requestKey, cancelToken ] of pendingRequest) {
    cancelToken(requestKey)
  }
  pendingRequest.clear()
}

// 請求攔截器
axios.interceptors.request.use(
  (config) => {
    // 檢查是否存在重覆請求，若存在則取消已發的請求
    removePendingRequest(config)
    // 把當前請求信息添加到pendingRequest對象中
    addPendingRequest(config)
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 響應攔截器
axios.interceptors.response.use(
  (response) => {
    removePendingRequest(response.config) // 從pendingRequest對象中移除請求
    return response
  },
  (error) => {
    removePendingRequest(error.config || {}) // 從pendingRequest對象中移除請求
    // 是否為取消請求，(error.message === 'Request aborted'為兼容Firefox取消請求行為與 chrome and edge不同)
    if (axios.isCancel(error) || error.__CANCEL__ || error.message === 'Request aborted') {
      return { isAbort: true }
    }
    // permission deny 處理
    if (error.response.status === 401 || error.response.data.errorCode === 'e0021' || error.response.data.errorCode === 'e0014') {
      localStorage.removeItem('inefi_user')
      localStorage.removeItem('trackLogin')
      router.push('/login')
    }
    // 有回應但為失敗結果，回傳 DATA
    if (error.response.data !== undefined && error.response.data.errorCode) {
      return error.response
    }
    // 未知錯誤 return
    return Promise.reject(error)
  }
)
export default async function (method = 'GET', url, headers = null, body, responseType = 'json', customConfig = null, isShowError = true) {
  // expireTimeCheck()
  const { locale, t } = i18n.global
  const requestConfig = async () => {
    if (customConfig === null) {
      return axios({
        method: method,
        url: url,
        headers: method === 'GET' && headers === null ? {} : headers,
        data: body,
        responseType: responseType,
        validateStatus: (status) => {
          return status < 500
          // return status >= 200 && status < 300; // default
        }
      })
    }
    return axios(customConfig)
  }
  return requestConfig()
    .then((response) => {
      return response
    })
    .catch(() => {
      // 未知錯誤顯示訊息
      if (isShowError) {
        ElNotification({
          type: 'error',
          customClass: 'el-license-errorNotify',
          message: t('common.connectError', locale)
        })
      }
    })
}
