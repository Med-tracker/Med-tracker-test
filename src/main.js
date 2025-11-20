import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { useThemeStore } from './stores/theme.js'
import './style.css'


const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

app.mount('#app')

const themeStore = useThemeStore();
themeStore.setTheme(themeStore.theme);
