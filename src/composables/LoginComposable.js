import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ref } from 'vue';

const error = ref(null);

const login = async (email, password) => {
    try {
        const auth = getAuth();
        const res = await signInWithEmailAndPassword(auth, email, password);
        return res;
    } catch (err) {
        console.error('Giriş hatası:', err);
        if (err.code === 'auth/invalid-email') {
            error.value = 'Geçersiz email adresi';
        } else {
            error.value = err.message;
        }
    }
};

export default function LoginComposable() {
    return { error, login };
}