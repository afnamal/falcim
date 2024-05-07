<template>
  <div class="container mt-5">
    <div v-if="!forgotpass">
      <h2 class="text-center mb-4">{{ $t('login.title') }}</h2>
      <form @submit.prevent="handleSubmit" class="MainForm" novalidate>
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="email" v-model="email" :placeholder="$t('login.enterEmail')" required :class="{'is-invalid': submitted && !email.value}">
          <label for="email">{{ $t('login.emailAddress') }}</label>
          <div class="invalid-feedback" v-if="noemail && submitted">{{ $t('login.emailRequired') }}</div>
        </div>
        <div class="form-floating mb-3">
          <input type="password" class="form-control" id="password" v-model="password" :placeholder="$t('login.enterPassword')" :class="{'is-invalid': submitted && !password.value}">
          <label for="password">{{ $t('login.password') }}</label>
          <div class="invalid-feedback" v-if="nopassword && submitted">{{ $t('login.passwordRequired') }}</div>
        </div>
        <div class="d-flex justify-content-end mb-3">
          <label for="forgotpasslabel" class="form-label" @click.prevent="Forgot" id="forgotPassLabel" style="text-decoration: underline; cursor: pointer;">{{ $t('login.forgotPassword') }}</label>
        </div>
        <div v-if="error" class="alert alert-danger">{{ $t('alerts.error') }}</div>
        <div v-if="dogrulanmamis" class="alert alert-warning">{{ $t('alerts.unverified') }}</div>
        <div v-if="OnayMaili" class="alert alert-info">{{ $t('alerts.verificationEmailSent') }}</div>
        <button type="submit" class="btn btn-primary w-100">{{ $t('login.logInButton') }}</button>
      </form>
    </div>
    <div v-if="forgotpass">
      <h2 class="text-center mb-4">{{ $t('login.forgotPassword') }}</h2>
      <form @submit.prevent="ForgotPassword" class="MainForm" novalidate>
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="email" v-model="email" :placeholder="$t('login.enterEmail')" required :class="{'is-invalid': submitted && !email.value}">
          <label for="email">{{ $t('login.emailAddress') }}</label>
          <div class="invalid-feedback" v-if="noemail && submitted">{{ $t('login.emailRequired') }}</div>
        </div>
        <div v-if="error" class="alert alert-danger">{{ $t('alerts.error') }}</div>
        <div v-if="dogrulanmamis" class="alert alert-warning">{{ $t('alerts.unverified') }}</div>
        <div v-if="OnayMaili" class="alert alert-info">{{ $t('alerts.verificationEmailSent') }}</div>
        <button type="submit" class="btn btn-primary w-100">{{ $t('login.resetPasswordButton') }}</button>
      </form>
    </div>
  </div>
</template>



<script>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { getAuth, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import LoginComposable from '../composables/LoginComposable';
import SignupComposable from '../composables/SignupComposable';
import { showToast } from '../services/notificationService';  // Doğru ithalat yolu

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
    const { t } = useI18n();

    const ForgotPassword = async () => {
      try {
        await sendPasswordResetEmail(auth, email.value);
        showToast(t('alerts.resetLinkSent'), 'success');
      } catch (err) {
        console.error(t('alerts.errorSendingResetEmail'), err);
        error.value = t('alerts.resetFail', { error: err.message });
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
          dogrulanmamis.value = t('alerts.unverified');
          await sendEmailVerification(user);
        }

        if (!error.value && user.emailVerified) {
          showToast(t('login.success'), 'success');
          const redirectRoute = window.sessionStorage.getItem('redirectAfterLogin') || '/';
        router.push(redirectRoute);
        window.sessionStorage.removeItem('redirectAfterLogin');
        }
        if (!email.value) noemail.value = true;
        if (!password.value) nopassword.value = true;
      } catch (err) {
        console.error('Login error:', err);
        error.value = t('alerts.loginError', { error: err.message });
        }
    };

    return { email, password, handleSubmit, error, dogrulanmamis, OnayMaili, submitted, noemail, nopassword, ForgotPassword, Forgot, forgotpass,t };
  }
}
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
.navbar {
  padding: 0 0px;  /* Reduces padding around the navbar */
}

.logo {
  max-width: 100px;  /* Adjusts the size and makes it responsive */
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);  /* Slightly increase size on hover for better UX */
}

.navbar-toggler {
  border: none;  /* Removes border from the toggler button */
  outline: none;  /* Removes focus outline */
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(0, 0, 0, 0.5)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

@media (max-width: 992px) {
  .navbar-expand-lg .navbar-collapse {
    flex-basis: auto; /* Ensures navbar items do not break layout */
  }

  .navbar-nav {
    flex-direction: row; /* Align navbar items in a row in collapsed mode */
  }

  .nav-item {
    padding: 0 10px; /* Ensures spacing between navbar items is adequate */
  }

  .nav-link {
    padding: 0.5rem; /* Standard padding, adjusted for touch interfaces */
  }

  .welcome {
    padding: 10px; /* Reduces padding on smaller screens for better layout */
  }
}

/* Custom styles for login and signup links to make them stand out */
.gec {
  color: #007bff;  /* Bootstrap primary color */
  cursor: pointer;
  text-decoration: underline;
}

.gec:hover {
  color: #0056b3;  /* Darker shade for hover state */
}

</style>




