<template>
  <div class="navbarT">
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container">
        <!-- Brand -->
        <a class="navbar-brand" @click="pushHome" style="cursor: pointer;">
          <img src="../assets/falcim.png" alt="Logo" class="logo d-inline-block align-text-top">
        </a>

        <!-- Toggler -->
        <button class="navbar-toggler" type="button" @click="toggleMenu"
                data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar links -->
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav ms-auto" style="cursor: pointer;">
            <a class="nav-link login-link" v-if="!user" @click="pushLogin('/')"><span class="material-icons align-middle">login</span>{{ $t('navbar.login') }}</a>
            <a class="nav-link" v-if="user" @click="pushUser"><span class="material-icons align-middle">person</span>{{ $t('navbar.account') }}</a>
            <a class="nav-link" @click="pushLogin('/fal')"><span class="material-icons align-middle">local_cafe</span>{{ $t('navbar.fortune') }}</a>
            <a class="nav-link" @click="pushKullanim"><span class="material-icons align-middle">description</span>{{ $t('navbar.terms') }}</a>
            <a class="nav-link" @click="pushHelp"><span class="material-icons align-middle">help</span>{{ $t('navbar.help') }}</a>
            <a class="nav-link logout-link" @click="handleLogout" v-if="user"><span class="material-icons align-middle">logout</span>{{ $t('navbar.logout') }}</a>
            <!-- Language Switch -->
            <img src="../assets/en-flag.png" @click="changeLanguage('en')" alt="English" class="language-icon">
            <img src="../assets/tr-flag.png" @click="changeLanguage('tr')" alt="Türkçe" class="language-icon">
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { showToast } from '../services/notificationService';
import { useI18n } from 'vue-i18n'; // vue-i18n'den useI18n'ı import edin
export default {
  setup() {
    const router = useRouter();
    const auth = getAuth();
    const user = ref(null);
    const menuVisible = ref(false);
    const { locale } = useI18n(); // useI18n hook'undan locale'i alın
    const { t } = useI18n();
    onAuthStateChanged(auth, (authUser) => {
      user.value = authUser;
    });

    const toggleMenu = () => {
      menuVisible.value = !menuVisible.value;
    };

    const pushLogin = (destination) => {
      if (!user.value) {
        window.sessionStorage.setItem('redirectAfterLogin', destination);
        router.push('/login');
      } else {
        router.push(destination);
      }
    };

    const pushHelp = () => {
      router.push('/help');
    };

    const pushKullanim = () => {
      router.push('/terms');
    };

    const pushUser = () => {
      router.push('/user');
    };

    const pushHome = () => {
      router.push('/');
    };

    const handleLogout = async () => {
      await signOut(auth);
      showToast(t('logout.success'), 'success');
      router.push('/');
    };
    const changeLanguage = (lang) => {
      locale.value = lang; // locale'i güncelleyin
    };


    return { user, toggleMenu, pushLogin, pushKullanim, pushUser, pushHome, handleLogout, pushHelp, changeLanguage };
  }
};
</script>





<style scoped>
.logo {
  max-width: 95px;
  transition: transform 0.3s ease;
}
.language-icon {
  cursor: pointer;
  margin-left: 10px;
  width: 24px; /* Adjust size as needed */
  height: 24px; /* Adjust size as needed */
}


.container {
  max-width: 100%; /* Ensure it's full width */
  padding-right: 15px;
  padding-left: 15px;
}

@media (max-width: 992px) {
  .container {
    padding-right: 10px;
    padding-left: 10px;
  }
}

.logo:hover {
  transform: scale(1.1);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'><path stroke='rgba(0, 0, 0, 0.5)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/></svg>");
}

.nav-link {
  color: #495057;
  transition: color 0.3s ease-in-out;
}

.nav-link:hover {
  color: #0056b3; /* Dynamic hover color */
}

/* Subtle animations for a modern look */
.navbar-light .navbar-nav .nav-link {
  position: relative;
  overflow: hidden;
  transition: all 0.35s ease;
}

.navbar-light .navbar-nav .nav-link::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #0056b3;
  transform: scaleX(0);
  transition: transform 0.35s ease;
}

.navbar-light .navbar-nav .nav-link:hover::after {
  transform: scaleX(1);
}

/* Specific styles for login and logout links */
.nav-link.login-link {
  color: green; /* Green color for login */
}

.nav-link.logout-link {
  color: red; /* Red color for logout */
}

.nav-link.login-link:hover, .nav-link.logout-link:hover {
  opacity: 0.8; /* Slight transparency on hover for better UX */
}
</style>
