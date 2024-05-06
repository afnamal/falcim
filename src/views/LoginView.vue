<template>
  <div>
    <div class="container mt-5 welcome text-center">  <!-- Adjusted for centering and margin -->
      <div v-if="!Login">
        <SignupComp />
        <p class="mt-4">Zaten Hesabım var <span @click="toggleLogin" class="gec link-primary" style="cursor: pointer;">Giriş Yap</span></p>
      </div>
      <div v-else>
        <LoginComp />
        <p class="mt-4">Hesabım Yok <span @click="toggleLogin" class="gec link-primary" style="cursor: pointer;">Üye Ol</span></p>
      </div>
    </div>
  </div>
</template>

  
  <script>
  import SignupComp from '../components/SingupComp.vue';
  import LoginComp from '../components/LoginComp.vue';
  import { ref } from 'vue';
  
  export default {
    name: 'LoginView',
    components: { SignupComp, LoginComp , },
    setup() {
      const Login = ref(true);
      const toggleLogin = () => {
        Login.value = !Login.value;
      };
  
      return { Login, toggleLogin };
    }
  }
  </script>
  <style>
.navbar {
  padding: 0 px;  /* Reduces padding around the navbar */
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

    