// LoginComposable.js
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, inject } from 'vue';
import { showToast } from '../services/notificationService';  // Doğru ithalat yolu

const error = ref(null);

const login = async (email, password) => {
    const auth = getAuth();
    const i18n = inject('i18n');
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        return res;
    } catch (err) {
        console.error('Giriş hatası:', err);
        if (err.code === 'auth/invalid-email') {
            error.value = i18n.t('login.invalidEmail');
        } else {
            error.value = i18n.t('login.failed') + err.message;
        }
        showToast(error.value, 'error');
    }
};

export default function LoginComposable() {
    return { error, login };
}
