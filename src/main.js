import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import { projectAuth } from './firebase';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';

// Make TensorFlow.js and Teachable Machine libraries available globally
const app = createApp(App);
app.config.globalProperties.$tf = tf;
app.config.globalProperties.$tmImage = tmImage;

projectAuth.onAuthStateChanged(() => {
    app.use(router).mount('#app');
});
