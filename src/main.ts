// import './assets/main.css'
import './assets/style/common.scss'
import './assets/style/components/_button.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import App from './App.vue'
import Violet from './views/Violet.vue'
import router from './router'

// const app = createApp(App)
const violet = createApp(Violet)

violet.use(createPinia())
violet.use(router)

violet.mount('#violet')
