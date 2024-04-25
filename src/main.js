require('dotenv').config();
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { projectAuth } from './firebase'
import './firebase'


projectAuth.onAuthStateChanged(()=>{
    createApp(App).use(router).mount('#app')
})

