<template>
  <div class="containera mt-5">
    <div v-if="!forgotpass">
    <h2 class="text-center mb-4">Giriş Yap</h2>
    <form @submit.prevent="handleSubmit" class="MainForm" novalidate>
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="email" v-model="email" placeholder="Email giriniz" required :class="{'is-invalid': submitted && !email.value}">
        <label for="email">Email Adresi</label>
        <div class="invalid-feedback" v-if="noemail && submitted">Lütfen email adresinizi giriniz.</div>
      </div>
      <div class="form-floating mb-3">
        <input type="password" class="form-control" id="password" v-model="password" placeholder="Şifre giriniz" :class="{'is-invalid': submitted && !password.value}">
        <label for="password">Şifre</label>
        <div class="invalid-feedback" v-if="nopassword && submitted">Lütfen şifrenizi giriniz.</div>
      </div>
      <div class="d-flex justify-content-end mb-3">
        <label for="forgotpasslabel" class="form-label" @click.prevent="Forgot" id="forgotPassLabel" style="text-decoration: underline; cursor: pointer;">Şifremi Unuttum</label>
      </div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <div v-if="dogrulanmamis" class="alert alert-warning">{{ dogrulanmamis }}</div>
      <div v-if="OnayMaili" class="alert alert-info">{{ OnayMaili }}</div>
      <button type="submit" class="btn btn-primary w-100">Giriş Yap</button>
    </form>
  </div>
  <div v-if="forgotpass">
    <h2 class="text-center mb-4">Şifremi Unuttum</h2>
    <form @submit.prevent="ForgotPassword" class="MainForm" novalidate>
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="email" v-model="email" placeholder="Email giriniz" required :class="{'is-invalid': submitted && !email.value}">
        <label for="email">Email Adresi</label>
        <div class="invalid-feedback" v-if="noemail && submitted">Lütfen email adresinizi giriniz.</div>
      </div>
      
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <div v-if="dogrulanmamis" class="alert alert-warning">{{ dogrulanmamis }}</div>
      <div v-if="OnayMaili" class="alert alert-info">{{ OnayMaili }}</div>
      <button type="submit" class="btn btn-primary w-100">Giriş Yap</button>
    </form>
  </div>
  </div>
  
  
</template>


<script>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { getAuth, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import LoginComposable from '../composables/LoginComposable';
import SignupComposable from '../composables/SignupComposable';

export default {
  setup() {
    const { OnayMaili } = SignupComposable();
    const { error, login } = LoginComposable();
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const dogrulanmamis = ref('');
    const noemail = ref(false);
    const nopassword = ref(false);
    const submitted = ref(false);
    const auth = getAuth();
    const forgotpass = ref(false);

    const ForgotPassword = async () => {
      try {
        await sendPasswordResetEmail(auth, email.value);
        alert("Şifre sıfırlama linki mail adresinize gönderilmiştir!");
      } catch (error) {
        console.error("Error sending password reset email:", error);
        alert("Failed to send password reset email: " + error.message);
      }
    }

    const Forgot = () => {
      forgotpass.value = true;
    }

    const handleSubmit = async () => {
      submitted.value = true;
      try {
        await login(email.value, password.value);
        await router.isReady();

        const user = auth.currentUser;
        if (user && !user.emailVerified) {
          dogrulanmamis.value = 'Lütfen hesabınızı doğrulayınız';
          await sendEmailVerification(user);
        }

        if (!error.value && user.emailVerified) {
          const redirectRoute = window.sessionStorage.getItem('redirectAfterLogin') || '/';
        router.push(redirectRoute);
        window.sessionStorage.removeItem('redirectAfterLogin');
        }
        if (!email.value) noemail.value = true;
        if (!password.value) nopassword.value = true;
      } catch (e) {
        console.error('Giriş hatası:', e.message);
      }
    };

    return { email, password, handleSubmit, error, dogrulanmamis, OnayMaili, submitted, noemail, nopassword, ForgotPassword, Forgot, forgotpass };
  }
}
</script>



<style scoped>
.containera {
  max-width: 500px;
  margin: 30px auto;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  border-radius: 8px;
  background-color: #f8f9fa;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

.form-floating {
  position: relative;
}

.form-floating > input {
  width: 100%;
  padding: 15px 10px;
  margin-bottom: 20px;
  border: 2px solid #dee2e6;
  border-radius: 5px;
  font-size: 16px;
  height: 48px;
}

.form-floating > label {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  background-color: transparent; /* Set background to transparent */
  padding: 0 5px;
  pointer-events: none;
  transition: all 0.3s;
  color: #495057; /* You can adjust this to match the placeholder text color if needed */
}

.form-floating > input:focus + label,
.form-floating > input:not(:placeholder-shown) + label {
  top: -15px; /* Adjust this value if the label position needs tweaking when floated */
  font-size: 15px;
  color: #007bff; /* Adjust this to a suitable focus color */
}

button {
  padding: 12px 0;
  background-color: #0056b3;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #004494;
}

#forgotPassLabel {
  text-decoration: underline;
  cursor: pointer;
  margin-left: auto; /* Align to right */
}

.alert {
  font-size: 14px;
  border-radius: 5px;
  padding: 10px;
  margin-top: 15px;
}
</style>



