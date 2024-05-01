import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import { projectAuth } from './firebase';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



// Make TensorFlow.js and Teachable Machine libraries available globally
const app = createApp(App);
app.config.globalProperties.$tf = tf;
app.config.globalProperties.$tmImage = tmImage;

// Router ve App monte işlemlerini her durumda yap
app.use(router);

projectAuth.onAuthStateChanged(user => {
  if (user) {
    // Kullanıcı giriş yapmışsa, uygulama içindeki kullanıcıya özel içerikler güncellenebilir.
    console.log('Kullanıcı giriş yaptı:', user);
  } else {
    // Kullanıcı çıkış yapmışsa veya giriş yapmamışsa, uygulama genel içerikle devam eder.
    console.log('Kullanıcı girişi yok veya çıkış yapıldı.');
  }
});

// Uygulamayı her durumda monte et
app.mount('#app');