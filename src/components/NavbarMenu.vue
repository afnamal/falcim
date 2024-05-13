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
                data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar links -->
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <div class="navbar-nav ms-auto">
            <a class="nav-link login-link" v-if="!user" @click="pushLogin('/')">
              <span class="material-icons align-middle">login</span>{{ $t('navbar.login') }}
            </a>
            <a class="nav-link account-link" v-if="user" @click="pushUser">
              <span class="material-icons align-middle">person</span>{{ userName }}
            </a>
            <div class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" id="fortuneDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="material-icons align-middle">local_cafe</span>{{ $t('navbar.fortune') }}
              </a>
              <ul class="dropdown-menu" aria-labelledby="fortuneDropdown">
                <li><a class="dropdown-item" @click="pushFortune('/fal/kahve')">{{ $t('navbar.coffeeFortune') }}</a></li>
                <li><a class="dropdown-item" @click="pushFortune('/fal/el')">{{ $t('navbar.palmFortune') }}</a></li>
                <li><a class="dropdown-item" @click="pushFortune('/fal/tarot')">{{ $t('navbar.tarotFortune') }}</a></li>
              </ul>
            </div>
            <a class="nav-link terms-link" @click="pushKullanim">
              <span class="material-icons align-middle">description</span>{{ $t('navbar.terms') }}
            </a>
            <a class="nav-link help-link" @click="pushHelp">
              <span class="material-icons align-middle">help</span>{{ $t('navbar.help') }}
            </a>
            <a class="nav-link logout-link" @click="handleLogout" v-if="user">
              <span class="material-icons align-middle">logout</span>{{ $t('navbar.logout') }}
            </a>
            <!-- Language Switch as Dropdown -->
            <div class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="../assets/tr-flag.png" alt="Current Language" class="language-icon" v-if="language === 'tr'">
                <img src="../assets/en-flag.png" alt="Current Language" class="language-icon" v-if="language === 'en'">
                <img src="../assets/ar-flag.png" alt="Current Language" class="language-icon" v-if="language === 'ar'">
                <img src="../assets/gr-flag.png" alt="Current Language" class="language-icon" v-if="language === 'gr'">
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" @click="changeLanguage('tr')"><img src="../assets/tr-flag.png" alt="Türkçe" class="language-icon-sm"> Türkçe</a></li>
                <li><a class="dropdown-item" @click="changeLanguage('en')"><img src="../assets/en-flag.png" alt="English" class="language-icon-sm"> English</a></li>
                <li><a class="dropdown-item" @click="changeLanguage('ar')"><img src="../assets/ar-flag.png" alt="العربية" class="language-icon-sm"> العربية</a></li>
                <li><a class="dropdown-item" @click="changeLanguage('gr')"><img src="../assets/gr-flag.png" alt="Ελληνικά" class="language-icon-sm"> Ελληνικά</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { showToast } from '../services/notificationService';
import { useI18n } from 'vue-i18n'; // Import useI18n from vue-i18n
import cookieService from '../services/cookieService'; // Import the cookie service

export default {
  setup() {
    const router = useRouter();
    const auth = getAuth();
    const user = ref(null);
    const menuVisible = ref(false);
    const { locale } = useI18n(); // Retrieve locale from useI18n
    const { t } = useI18n();
    const language = ref('tr');
    const userName = ref(null);

    onAuthStateChanged(auth, (authUser) => {
      user.value = authUser;
      if (authUser) {
        userName.value = authUser.displayName;
      }
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
      cookieService.setCookie('language', language.value, { sameSite: 'None', secure: true });
      router.push('/');
    };

    const pushFortune = (destination) => {
      router.push(destination);
    };

    const changeLanguage = (lang) => {
      locale.value = lang;
      language.value = lang;
      cookieService.setCookie('language', lang, { sameSite: 'None', secure: true });
    };

    const loadLanguageFromCookies = () => {
      const savedLanguage = cookieService.getCookie('language');
      if (savedLanguage) {
        locale.value = savedLanguage;
        language.value = savedLanguage;
      } else {
        // Set default language if no cookie is found
        cookieService.setCookie('language', language.value, { sameSite: 'None', secure: true });
      }
    };

    // Load language preference on component mount
    onMounted(loadLanguageFromCookies);

    return {
      user,
      toggleMenu,
      pushLogin,
      pushKullanim,
      pushUser,
      pushHome,
      handleLogout,
      pushHelp,
      pushFortune,
      changeLanguage,
      language,
      userName
    };
  }
};
</script>

<style scoped>
.logo {
  max-width: 110px;
  transition: transform 0.3s ease-in-out;
}

.navbar {
  background-color: #ffffff; /* White background */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Light shadow effect */
}

.language-icon {
  cursor: pointer;
  margin-left: 12px;
  width: 32px; /* Adjust size as needed */
  height: 32px; /* Adjust size as needed */
}

.language-icon-sm {
  width: 18px;
  height: 18px;
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
  transform: scale(1.15);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'><path stroke='rgba(0, 0, 0, 0.5)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/></svg>");
}

.navbar-toggler {
  border: none;
}

.nav-link {
  font-size: 18px; /* Increase font size */
  color: #4a4a4a; /* Darker gray text color */
  transition: color 0.3s ease-in-out;
  padding-left: 0px;
  margin-right: 7px; /* Increase spacing between links */
  position: relative; /* Required for the underline */
}

.icon {
  font-size: 22px; /* Increase icon size */
}

.nav-link:hover, .dropdown-item:hover {
  color: #1e90ff; /* Bright blue hover color */
}

/* Subtle animations for a modern look */
.navbar-light .navbar-nav .nav-link {
  position: relative;
  overflow: hidden;
  transition: all 0.35s ease;
}

.navbar-light .navbar-nav .nav-link.account-link::after,
.navbar-light .navbar-nav .nav-link.terms-link::after,
.navbar-light .navbar-nav .nav-link.help-link::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #000; /* Black underline */
  transform: scaleX(0);
  transition: transform 0.35s ease;
}

.navbar-light .navbar-nav .nav-link.account-link:hover::after,
.navbar-light .navbar-nav .nav-link.terms-link:hover::after,
.navbar-light .navbar-nav .nav-link.help-link:hover::after {
  transform: scaleX(1);
}

/* Specific styles for login and logout links */
.nav-link.login-link {
  color: green; /* Green color for login */
}

.nav-link.logout-link {
  color: #f71212; /* Bright red color */
}

.nav-link.logout-link:hover {
  color: #ce351a; /* Darker red on hover */
}

.nav-link.login-link:hover, .nav-link.logout-link:hover {
  opacity: 0.8; /* Slight transparency on hover for better UX */
}

/* Dropdown styles */
.dropdown-menu {
  border-radius: 4px;
  border: none;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  padding: 10px 0; /* Adjust padding for better spacing */
}

.dropdown-item {
  font-size: 16px;
  padding: 10px 20px; /* Add padding for better spacing */
  position: relative; /* Required for the underline */
  transition: background-color 0.3s ease;
}

@media (min-width: 992px) {
  .dropdown-menu {
    border: none;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    position: absolute;
    right: 0; /* Keeps dropdown aligned to the right side within its parent */
    top: 100%; /* Ensures dropdown opens downwards */
    left: auto; /* Resets any left alignment */
    transform: translateX(-50%); /* Adjusts horizontal position to prevent overflow */
  }

  .nav-item.dropdown {
    position: relative; /* Ensures the dropdown menu is positioned relative to this item */
  }

  .navbar-nav {
    background-color: #ffffff;
  }
}

a {
  cursor: pointer;
}
</style>

