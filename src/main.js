import { createApp } from 'vue'
import App from './App.vue'
import tap from './directive/tap'

const app = createApp(App)

app.directive('tap', tap)

app.mount('#app')
