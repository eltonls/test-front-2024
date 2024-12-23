import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import vuetify from './plugins/vuetify'
import "./main.css";
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(vuetify)
  .use(router)
  .mount('#app')
