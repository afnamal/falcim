import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
import { projectAuth } from './firebase';
import { createI18n } from 'vue-i18n';
import VueToast from 'vue-toast-notification'; // Doğru import ifadesi
import 'vue-toast-notification/dist/theme-sugar.css'; // Stil dosyası
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const app = createApp(App);

function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}
const i18n = createI18n({
  legacy: false,  // Legacy modunu devre dışı bırak
  locale: 'tr', // varsayılan dil
  fallbackLocale: 'en', // yedek dil
  messages: loadLocaleMessages()
});
  

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
// Make TensorFlow.js and Teachable Machine libraries available globally
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
app.use(i18n);

// Uygulamayı her durumda monte et
app.mount('#app');