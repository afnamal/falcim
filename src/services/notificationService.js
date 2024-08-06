// notificationService.js
import { createApp } from 'vue';
import VueToast from 'vue-toast-notification';

// Boş bir Vue uygulaması oluştur ve VueToast plugin'ini kullan
const app = createApp({});
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

// Global toast instance'ını oluştur
const toast = app.config.globalProperties.$toast;

// Toast fonksiyonlarını dışa aktar
export function showToast(message, type = 'default') {
  toast[type](message);
}
