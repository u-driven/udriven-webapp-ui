import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
    AutoImport({
      resolvers: [ ElementPlusResolver({ importStyle: 'sass' }) ],
      dts: 'types/auto-generate/auto-import.d.ts'
    }),
    Components({
      resolvers: [ ElementPlusResolver({ importStyle: 'sass' }) ],
      dts: 'types/auto-generate/components.d.ts'
    }),
    ElementPlus({})],
  // Source map
  productionSourceMap: false,
  // 多線程
  parallel: true,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue-i18n': resolve(__dirname, 'node_modules/vue-i18n/dist/vue-i18n.cjs.js'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api:'modern-compiler',
        //sass 改版
        additionalData: `
        @use '@/assets/scss/variables' as *;   
        `,
      }
    }
  },

})
