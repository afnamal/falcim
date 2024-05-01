<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Üye Ol</h2>
    <form @submit.prevent="handleSubmit" class="needs-validation" novalidate>
      <div class="mb-3">
        <input type="text" class="form-control" placeholder="İsim giriniz" required v-model="name">
      </div>
      <div class="mb-3">
        <input type="email" class="form-control" placeholder="Email giriniz" required v-model="email">
      </div>
      <div class="mb-3">
        <input type="password" class="form-control" placeholder="Şifre giriniz" required v-model="password">
      </div>
      <div class="mb-3">
        <input type="date" class="form-control" placeholder="Doğum tarihi giriniz" v-model="birthDate">
      </div>
      <div class="mb-3">
        <input type="text" class="form-control" placeholder="Yaşadığınız yer giriniz" v-model="location">
      </div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <button type="submit" class="btn btn-primary w-100">Üye Ol</button>
    </form>
  </div>
</template>


<script>
import SignupComposable from '../composables/SignupComposable';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  setup() {
    const { error, user } = SignupComposable();
    const router = useRouter();
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const birthDate = ref('');
    const location = ref('');

    const handleSubmit = async () => {
      await user(email.value, password.value, name.value, birthDate.value, location.value);
      if (!error.value || error.value === '') {  
        router.push('/fal');
      }
    };

    return { name, email, password, birthDate, location, handleSubmit, error };
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

.alert {
  font-size: 0.875em;
  margin-top: 10px; /* Uyarı mesajlarının üst boşluğunu artır */
}
</style>