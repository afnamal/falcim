<template>
    <div class="navbar-menu">
  <nav>
      <div class="navbar-brand">
        <img src="../assets/fal-logo4.png" alt="Logo" class="logo" @click="pushHome"/>
      </div>
      <!-- Menu Icon -->
      <div class="menu-icon" @click="toggleMenu">
        <!-- You can replace this with any icon you prefer -->
        <span class="material-icons">menu</span>
      </div>
      <!-- Navbar links/tabs -->
      <div class="navbar-menu" v-if="menuVisible" style="background-color: white; padding: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.2); position: absolute; right: 0; top: 60px;">
  <ul>
    <li @click="pushLogin">Fal Bak</li>
    <li @click="pushKullanim">Kullanım Şartları</li>
    <li>Yardım</li>
  </ul>
</div>

    </nav>
</div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const menuVisible = ref(false);
    const router = useRouter()

    const toggleMenu = () => {
      menuVisible.value = !menuVisible.value;
    };

    const pushLogin =()=>{
      router.push('/login')
    };

    const pushKullanim=()=>{
      router.push('/terms')
    }
    const pushHome=()=>{
      router.push('/')
    }

    return { menuVisible, toggleMenu,pushLogin,pushKullanim,pushHome };
  },
};
</script>

<style>
.navbar-menu{
    
}
.logo{
    cursor: pointer;
    border-radius: 30%;
}
</style>