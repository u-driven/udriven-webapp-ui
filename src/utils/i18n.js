// * i18n 多語系設定
import { createI18n } from 'vue-i18n'
// 載入語言
// import tw from '../lang/zh-TW.json'
// import en from '../lang/en-US.json'
// import cn from '../lang/zh-CN.json'
const i18n = createI18n({
  globalInjection: true, // composition api必定設置，否則無法在全域使用 $t()
  warnHtmlMessage: false, // disable warning HTML in message
  legacy: false, // 版本選項，composition api 必須 false, For Composition API: document: https://vue-i18n.intlify.dev/guide/advanced/composition.html
  locale: localStorage.getItem('locale') ?? 'en-US', // 抓取預設在localstorage的值（選擇時會在app.vue進行監聽設定至localstorage）
  fallbackLocale: 'en-US', // 若抓不到語言，預設為此
  // messages: {
  //   'zh-TW': tw,
  //   'en-US': en,
  //   'zh-CN': cn
  // }
})
export default i18n
