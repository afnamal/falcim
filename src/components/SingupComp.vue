<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Üye Ol</h2>
    <form @submit.prevent="handleSubmit" class="needs-validation" novalidate>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="name" placeholder="İsim giriniz" required v-model="name">
        <label for="name">İsim</label>
      </div>
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="email" placeholder="Email giriniz" required v-model="email">
        <label for="email">Email</label>
      </div>
      <div class="form-floating mb-3">
        <input type="password" class="form-control" id="password" placeholder="Şifre giriniz" required v-model="password">
        <label for="password">Şifre</label>
      </div>
      <div class="form-floating mb-3">
        <input type="date" class="form-control" id="birthDate" placeholder="Doğum tarihi giriniz" v-model="birthDate">
        <label for="birthDate">Doğum Tarihi</label>
      </div>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="location" placeholder="Yaşadığınız yer giriniz" v-model="location">
        <label for="location">Yaşadığınız Yer</label>
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
  max-width: 500px;
  margin: 30px auto;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  border-radius: 8px;
  background-color: #f8f9fa;
}

.form-floating {
  position: relative;
}

.form-floating > input {
  width: 100%;
  padding: 15px 10px;
  margin-bottom: 0; /* Remove margin-bottom for cleaner floating label effect */
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
  background-color: transparent; /* Ensure background is transparent */
  padding: 0 5px;
  pointer-events: none;
  transition: all 0.3s;
}

.form-floating > input:focus + label,
.form-floating > input:not(:placeholder-shown) + label {
  top: -15px; /* Adjust this value based on your padding and height */
  font-size: 15px;
  color: #007bff;
}

input[type="date"] {
  height: auto; /* Adjust height to auto for the date picker */
  padding: 12px 15px; /* Ensure internal elements are visible */
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

input, button {
  height: 48px;
  font-size: 18px;
}

.alert {
  font-size: 14px;
  border-radius: 5px;
  padding: 10px;
  margin-top: 15px;
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
</style>