// LoginComposable.js
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ref } from 'vue';
import { showToast } from '../services/notificationService';  // Doğru ithalat yolu

const error = ref(null);

const login = async (email, password) => {
    const auth = getAuth();
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        showToast("Başarıyla giriş yaptınız!", 'success');
        return res;
    } catch (err) {
        console.error('Giriş hatası:', err);
        if (err.code === 'auth/invalid-email') {
            error.value = 'Geçersiz email adresi';
        } else {
            error.value = err.message;
        }
        showToast("Giriş başarısız: " + error.value, 'error');
    }
};

export default function LoginComposable() {
    return { error, login };
}
