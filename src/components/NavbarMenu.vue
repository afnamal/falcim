<template>
    <div class="navbarT">
  <nav>
      <div class="navbar-brand">
        <img src="defaultpp.png" alt="Logo" class="logo" @click="pushHome"/>
      </div>
      <!-- Menu Icon -->
      <div class="menu-icon" @click="toggleMenu">
        <!-- You can replace this with any icon you prefer -->
        <span class="material-icons">menu</span>
      </div>
      <!-- Navbar links/tabs -->
      <div class="navbar-menu" v-if="menuVisible" >
  <ul>
    <li @click="pushLogin">  <span class="material-icons">local_cafe</span>Fal Bak</li>
    <li @click="pushKullanim"> <span class="material-icons">description</span>Kullanım Şartları </li>
    <li> <span class="material-icons">help</span>Yardım </li>
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
.navbar-menu {
  background-color: white;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  position: absolute;
  right: 0;
  top: 60px;
  z-index: 1000; /* Z-index değeri eklendi */
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
ul span {
  margin-right: 15px;
}
.navbar-menu ul {
  list-style: none;
  padding: 0;
  margin: 0; /* Remove default margin */
}

.navbar-menu li {
  display: flex;
  align-items: center; /* Dikey hizalamayı ortala */
  margin-right: 20px; /* Sağdaki boşluk */
  padding: 10px 20px; /* Tıklanabilir alan */
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease; /* Animasyon */
}
li::marker {
  color: black;
}
.navbar-menu li:last-child {
  margin-right: 0; /* Remove margin for the last item */
}
.navbarT {
  background-color: #FFFFFF; /* Temiz bir arka plan rengi */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Hafif bir gölge ekleyin */
}

.logo {
  transition: transform 0.3s ease; /* Logoya animasyon ekleyin */
}

.logo:hover {
  transform: scale(1.1); /* Logo üzerine gelindiğinde büyüt */
}

.navbar-menu li {
  transition: background-color 0.3s ease, color 0.3s ease; /* Menü linklerine animasyon ekleyin */
}

.navbar-menu li:hover {
  background-color: #F0F0F0; /* Hover durumunda arka plan rengi */
  color: #463434; /* Hover durumunda yazı rengi */
}

.menu-icon {
  cursor: pointer;
  font-size: 24px; /* Menü simgesinin boyutunu ayarlayın */
}

.menu-icon:hover {
  color: #555; /* İkon üzerine gelindiğinde rengini değiştir */
}

/* Responsive tasarım için media query */
@media (max-width: 768px) {
  .navbar-menu {
    flex-direction: column; /* Elemanları dikey hizalayın */
  }

  .navbar-menu li {
    text-align: center; /* Liste elemanlarını ortala */
    padding: 12px 0; /* Daha fazla dokunma alanı sağlayın */
  }
}


</style>