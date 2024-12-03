// notificationService.js
import { createApp } from 'vue';
import VueToast from 'vue-toast-notification';

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

const toast = app.config.globalProperties.$toast;

export function showToast(message, type = 'default') {
  toast[type](message);
}
