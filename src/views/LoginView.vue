<template>
  <div>
    <navbarMenu/>
    <div class="welcome container">
      <div v-if="!Login">
        <SignupComp />
        <p>Zaten Hesabım var <span @click="toggleLogin" class="gec">Giriş Yap</span></p>
      </div>
      <div v-else>
        <LoginComp />
        <p>Hesabım Yok <span @click="toggleLogin" class="gec">Üye Ol</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import SignupComp from '../components/SingupComp.vue';
import LoginComp from '../components/LoginComp.vue';
import navbarMenu from '../components/NavbarMenu.vue'
import { ref } from 'vue';

export default {
  name: 'LoginView',
  components: { SignupComp, LoginComp , navbarMenu},
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
  .welcome{
    text-align: center;
    padding: 20px auto;
  }
  .welcome label{
  }
  .welcome form{
    width: 300px;
    margin: 20px 0 10px;
  }
  .welcome input{
    
    margin-bottom: 10px;
    border-radius: 15px;
    border: 1px solid #ddd;
    outline: none;
    color: #777;
    margin: 10px auto;
    height: 30px;
    width: 200px;
    
  }
  .welcome button {
    display: block;
    margin-bottom: 10px; 
    margin: 10px auto;
    cursor: pointer;
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  span{
    text-decoration-color: blue;
    font-size: large;
    font-style: bold;
    cursor: pointer;
  }
  .error{
    color: red;
  }
  .gec{
    text-decoration: underline;
  }
  </style>
  