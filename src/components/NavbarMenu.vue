<template>
    <div class="navbarT">
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
      <div class="navbar-menu" v-if="menuVisible" >
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
  background-color: white; padding: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.2); position: absolute; right: 0; top: 60px;
}
.logo{
    cursor: pointer;
    border-radius: 30%;
    max-width: 45px;

}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative; /* Needed to position the menu absolutely with respect to the navbar */
}
span{
  cursor: pointer;
  text-decoration: none;
}
.navbar-menu ul {
  list-style: none;
  padding: 0;
  margin: 0; /* Remove default margin */
}

.navbar-menu li {
  margin-right: 20px; /* Adjust spacing between links */
  padding: 10px 20px; /* Padding for clickable area */
  cursor: pointer;
}
li::marker {
  color: black;
}
.navbar-menu li:last-child {
  margin-right: 0; /* Remove margin for the last item */
}


</style>