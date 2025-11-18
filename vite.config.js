import { fileURLToPath, URL } from 'node:url'
import ViteFonts from 'unplugin-fonts/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
//import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
  Components({
     dirs: ['src/components'],
     extensions: ['vue'],
     globs: ['src/components/*.vue'],
     deep: false,
    include: [/\.vue$/, /\.vue\?vue/, /\.vue\.[tj]sx?\?vue/],
      exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/]
  }),
    vue(),
    AutoImport({
       include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, // .vue
        /\.vue\?vue/, // .vue?vue
        /\.md$/ // .md
      ],
      imports: [
        'vue'
      ]
     }),
    ViteFonts({
          fontsource: {
            families: [
              {
                name: 'Roboto',
                weights: [100, 300, 400, 500, 700, 900],
                styles: ['normal', 'italic'],
              },
            ],
          },
        }),
      //  vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
