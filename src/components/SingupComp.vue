<template>
  <div>
    <p>Üye Ol</p>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="İsim giriniz" required v-model="name">
        <input type="email" placeholder="Email giriniz" required v-model="email">
        <input type="password" placeholder="Şifre giriniz" required v-model="password">
        <input type="date" placeholder="Doğum tarihi giriniz" v-model="birthDate">
        <input type="text" placeholder="Yaşadığınız yer giriniz" v-model="location">
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit">Üye Ol</button>
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