import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
import { projectAuth } from './firebase';
import VueToast from 'vue-toast-notification'; // Doğru import ifadesi
import 'vue-toast-notification/dist/theme-sugar.css'; // Stil dosyası
import { createVuetify } from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);

app.use(router);

const vuetify = createVuetify();

app.use(vuetify);

app.use(VueToast, {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  closeButton: "button",
  icon: true,
  rtl: false
});

app.config.globalProperties.$tf = tf;
app.config.globalProperties.$tmImage = tmImage;

projectAuth.onAuthStateChanged(user => {
  if (user) {
    console.log('Kullanıcı giriş yaptı:', user);
  } else {
    console.log('Kullanıcı girişi yok veya çıkış yapıldı.');
  }
});

app.mount('#app');
