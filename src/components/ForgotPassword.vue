<template>
  <div v-if="forgotpass">
    <h5 class="text-center mb-4">Şifremi Unuttum</h5>
    <form @submit.prevent="ForgotPassword" class="MainForm" novalidate>
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="email" v-model="email" placeholder="Email giriniz" required :class="{'is-invalid': submitted && !email.value}">
        <label for="email">Email Adresi</label>
        <div class="invalid-feedback" v-if="noemail && submitted">Lütfen email adresinizi giriniz.</div>
      </div>
      
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <div v-if="dogrulanmamis" class="alert alert-warning">{{ dogrulanmamis }}</div>
      <div v-if="OnayMaili" class="alert alert-info">{{ OnayMaili }}</div>
      <button type="submit" class="btn btn-primary w-100">Gönder</button>
    </form>
  </div>
</template>

<script>
import { getAuth,sendPasswordResetEmail } from 'firebase/auth';
import { ref } from 'vue';

export default {
setup() {
    const auth= getAuth()
    const email=ref(null)
    const ForgotPassword = async () => {
  try {
    await sendPasswordResetEmail(auth, email.value); // Make sure to pass email.value, not just email
    alert("Şifre sıfırlama linki mail adresinize gönderilmiştir!"); // Notify user of successful action
  } catch (error) {
    console.error("Error sending password reset email:", error);
    alert("Failed to send password reset email: " + error.message); // Provide feedback in case of failure
  }
  
  }
  return{ForgotPassword}
}
}
</script>

<style>

</style>