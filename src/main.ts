import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'

import { useThemeStore } from '@/store/useTheme'

import { router } from '@/router'

import 'element-plus/dist/index.css'
import '@/styles/reset.css'
import '@/styles/tailwind.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/dark-custom.css'

import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

app.use(MotionPlugin)

app.use(router)

const themeStore = useThemeStore(pinia)
themeStore.initTheme()

app.mount('#app')
