<template>
  <div class="container mt-5">
    <div v-if="!forgotpass">
      <h2 class="text-center mb-4">{{ $t('login.title') }}</h2>
      <form @submit.prevent="handleSubmit" class="MainForm" novalidate>
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="email" v-model="email" :placeholder="$t('login.enterEmail')" required :class="{'is-invalid': submitted && !email}">
          <label for="email">{{ $t('login.emailAddress') }}</label>
          <div class="invalid-feedback" v-if="submitted && !email">{{ $t('login.emailRequired') }}</div>
        </div>
        <div class="form-floating mb-3">
          <input type="password" class="form-control" id="password" v-model="password" :placeholder="$t('login.enterPassword')" :class="{'is-invalid': submitted && !password}">
          <label for="password">{{ $t('login.password') }}</label>
          <div class="invalid-feedback" v-if="submitted && !password">{{ $t('login.passwordRequired') }}</div>
        </div>
        <div class="d-flex justify-content-end mb-3">
          <label for="forgotpasslabel" class="form-label" @click.prevent="toggleForgotPassword" id="forgotPassLabel">{{ $t('login.forgotPassword') }}</label>
        </div>
        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
        <div v-if="dogrulanmamis" class="alert alert-warning">{{ dogrulanmamis }}</div>
        <div v-if="OnayMaili" class="alert alert-info">{{ $t('alerts.verificationEmailSent') }}</div>
        <button type="submit" class="btn btn-primary w-100">{{ $t('login.logInButton') }}</button>
      </form>
    </div>
    <div v-else>
      <h2 class="text-center mb-4">{{ $t('login.forgotPassword') }}</h2>
      <form @submit.prevent="ForgotPassword" class="MainForm" novalidate>
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="email" v-model="email" :placeholder="$t('login.enterEmail')" required :class="{'is-invalid': submitted && !email}">
          <label for="email">{{ $t('login.emailAddress') }}</label>
          <div class="invalid-feedback" v-if="submitted && !email">{{ $t('login.emailRequired') }}</div>
        </div>
        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
        <div v-if="dogrulanmamis" class="alert alert-warning">{{ dogrulanmamis }}</div>
        <div v-if="OnayMaili" class="alert alert-info">{{ $t('alerts.verificationEmailSent') }}</div>
        <button type="submit" class="btn btn-primary w-100">{{ $t('login.resetPasswordButton') }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { getAuth, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import LoginComposable from '../composables/LoginComposable';
import SignupComposable from '../composables/SignupComposable';
import { showToast } from '../services/notificationService';

export default {
  setup() {
    const { OnayMaili } = SignupComposable();
    const {  login } = LoginComposable();
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const dogrulanmamis = ref('');
    const errorMessage = ref('');
    const submitted = ref(false);
    const auth = getAuth();
    const forgotpass = ref(false);
    const { t } = useI18n();

    const ForgotPassword = async () => {
      submitted.value = true;
      errorMessage.value = '';

      if (!email.value) {
        errorMessage.value = t('login.emailRequired');
        return;
      }

      try {
        await sendPasswordResetEmail(auth, email.value);
        showToast(t('alerts.resetLinkSent'), 'success');
        errorMessage.value = '';
      } catch (err) {
        console.error(t('alerts.errorSendingResetEmail'), err);
        errorMessage.value = t('alerts.resetFail', { error: err.message });
      }
    };

    const toggleForgotPassword = () => {
      forgotpass.value = !forgotpass.value;
      resetForm();
    };

    const handleSubmit = async () => {
      submitted.value = true;
      errorMessage.value = '';

      if (!email.value) {
        errorMessage.value = t('login.emailRequired');
        return;
      }

      if (!password.value) {
        errorMessage.value = t('login.passwordRequired');
        return;
      }

      try {
        await login(email.value, password.value);
        await router.isReady();
        const user = auth.currentUser;

        if (user && !user.emailVerified) {
          dogrulanmamis.value = t('alerts.unverified');
          await sendEmailVerification(user);
          showToast(t('alerts.verificationEmailSent'), 'info');
        }

        if (user && user.emailVerified) {
          showToast(t('login.success'), 'success');
          const redirectRoute = window.sessionStorage.getItem('redirectAfterLogin') || '/';
          router.push(redirectRoute);
          window.sessionStorage.removeItem('redirectAfterLogin');
        }
      } catch (err) {
        console.error('Login error:', err);
        errorMessage.value = t('alerts.loginError', { error: err.message });
      }
    };

    const resetForm = () => {
      email.value = '';
      password.value = '';
      errorMessage.value = '';
      submitted.value = false;
    };

    return {
      email,
      password,
      handleSubmit,
      errorMessage,
      dogrulanmamis,
      OnayMaili,
      submitted,
      ForgotPassword,
      toggleForgotPassword,
      forgotpass,
      t
    };
  }
};
</script>

<style scoped>
.container {
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
