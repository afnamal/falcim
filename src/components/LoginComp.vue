<template>
  <div>
    <p>Giriş Yap</p>
    <form @submit.prevent="handleSubmit">
      <input type="email" v-model="email" placeholder="email giriniz" required>
      <input type="password" v-model="password" placeholder="şifre giriniz">
      <p class="error" v-if="error">{{ error }}</p>
      <p v-if="dogrulanmamis" class="error">{{ dogrulanmamis }}</p>
      <p v-if="OnayMaili" class="error">{{ OnayMaili }}</p>
      <button>Giriş Yap</button>
    </form>
  </div>
</template>

<script>
import { ref, nextTick } from "vue";
import { useRouter } from 'vue-router';
import { getAuth, sendEmailVerification } from "firebase/auth";
import LoginComposable from '../composables/LoginComposable';
import SignupComposable from '../composables/SignupComposable';

export default {
  setup() {
    const { OnayMaili } = SignupComposable();
    const { error, login } = LoginComposable();
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const dogrulanmamis = ref(null);

    const handleSubmit = async () => {
      try {
        await login(email.value, password.value);
        await nextTick();

        const user = getAuth().currentUser;
        if (user && !user.emailVerified) {
          dogrulanmamis.value = 'Lütfen hesabınızı doğrulayınız';
          await sendEmailVerification(user);
        }

        if (!error.value && user.emailVerified) {
          router.push('/fal');
        }
      } catch (e) {
        console.error('Giriş hatası:', e.message);
      }
    };

    return { email, password, handleSubmit, error, dogrulanmamis, OnayMaili };
  }
}
</script>

<style>
/* Stil kuralları */
</style>
