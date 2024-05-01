<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Giriş Yap</h2>
    <form @submit.prevent="handleSubmit" class="needs-validation" novalidate>
      <div class="mb-3">
        <input type="email" class="form-control" id="email" v-model="email" placeholder="Email giriniz" required :class="{'is-invalid': submitted && !email.value}">
        <div class="invalid-feedback" v-if="submitted && !email.value">Lütfen email adresinizi giriniz.</div>
      </div>
      <div class="mb-3">
        <input type="password" class="form-control" id="password" v-model="password" placeholder="Şifre giriniz" :class="{'is-invalid': submitted && !password.value}">
        <div class="invalid-feedback" v-if="submitted && !password.value">Lütfen şifrenizi giriniz.</div>
      </div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <div v-if="dogrulanmamis" class="alert alert-warning">{{ dogrulanmamis }}</div>
      <div v-if="OnayMaili" class="alert alert-info">{{ OnayMaili }}</div>
      <button type="submit" class="btn btn-primary w-100">Giriş Yap</button>
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
    const submitted = ref(false);

    const handleSubmit = async () => {
      submitted.value = true;
      if (!email.value || !password.value) {
        return;
      }

      try {
        await login(email.value, password.value);
        await nextTick();

        const user = getAuth().currentUser;
        if (user && !user.emailVerified) {
          dogrulanmamis.value = 'Lütfen hesabınızı doğrulayınız';
          await sendEmailVerification(user);
        } else if (user.emailVerified) {
          router.push('/home');
        }
      } catch (e) {
        console.error('Giriş hatası:', e.message);
      }
    };

    return { email, password, handleSubmit, error, dogrulanmamis, OnayMaili, submitted };
  }
}
</script>


<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  border-radius: 10px;
  background-color: #fff;
}

h2 {
  color: #495057;
}

input, button {
  height: 48px;
  font-size: 16px;
}

.col-form-label {
  padding-right: 0;  /* Etiketlerin sağ tarafındaki boşluğu kaldır */
}

.alert {
  font-size: 0.875em;
  margin-top: 10px; /* Uyarı mesajlarının üst boşluğunu artır */
}
</style>


