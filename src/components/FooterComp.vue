<template>
  <div>
    <footer class="footer bg-dark text-light py-5">
      <div class="container">
        <div class="footer-content">
          <!-- Section 1: Navigation Links -->
          <div class="footer-column first">
            <h5>{{ $t('footer.brand') }}</h5>
            <ul class="list-unstyled">
              <li @click="pushHome"><a class="link-light">{{ $t('footer.links.home') }}</a></li>
              <li @click="pushLogin('/fal')"><a class="link-light">{{ $t('footer.links.fortune') }}</a></li>
              <li v-if="!user" @click="pushLogin('/')"><a class="link-light">{{ $t('footer.links.login') }}</a></li>
              <li v-else @click="pushUser"><a class="link-light">{{ $t('footer.links.account') }}</a></li>
              <li @click="pushHelp"><a class="link-light">{{ $t('footer.links.help') }}</a></li>
              <li @click="pushKullanim"><a class="link-light">{{ $t('footer.links.terms') }}</a></li>
            </ul>
          </div>

          <!-- Section 2: Language Selection and Info -->
          <div class="footer-column">
            <h5>{{ $t('footer.globalPresence') }}</h5>
            <div class="column">
              <a @click="changeLanguage('tr')" class="badge badge-secondary">
                <img src="../assets/tr-flag.png" class="flag-icon" alt="Turkish Flag"/> {{ $t('languages.turkish') }}
              </a><br>
              <a @click="changeLanguage('en')" class="badge badge-secondary">
                <img src="../assets/en-flag.png" class="flag-icon" alt="English Flag"/> {{ $t('languages.english') }}
              </a><br>
              <a @click="changeLanguage('ar')" class="badge badge-secondary">
                <img src="../assets/ar-flag.png" class="flag-icon" alt="Arabic Flag"/> {{ $t('languages.arabic') }}
              </a><br>
              <a @click="changeLanguage('gr')" class="badge badge-secondary">
                <img src="../assets/gr-flag.png" class="flag-icon" alt="Greek Flag"/> {{ $t('languages.greek') }}
              </a><br>
            </div>
          </div>

          <!-- Section 3: Social Media Links -->
          <div class="footer-column">
            <h5>{{ $t('footer.socialMedia') }}</h5>
            <a href="https://facebook.com" class="badge badge-primary mb-2"><i class="fab fa-facebook"></i> Facebook</a><br>
            <a href="https://instagram.com" class="badge badge-primary mb-2"><i class="fab fa-instagram"></i> Instagram</a><br>
            <a href="https://twitter.com" class="badge badge-primary mb-2"><i class="fab fa-twitter"></i> Twitter</a><br>
            <a href="#" class="badge badge-primary mb-2"><i class="fas fa-blog"></i> Blog</a><br>
          </div>
        </div>
        <button @click="scrollToTop" class="back-to-top" v-if="isVisible">
          <i class="fas fa-arrow-up"></i>
        </button>
        <div class="copyright">
          <hr style="width: 70%; margin: 0 auto;">
          <p class="text-center mt-3">{{ $t('footer.rights') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useI18n } from 'vue-i18n';
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    const router = useRouter();
    const auth = getAuth();
    const user = ref(null);
    const isVisible = ref(false);
    const { locale } = useI18n();

    onAuthStateChanged(auth, (authUser) => {
      user.value = authUser;
    });

    const pushLogin = (destination) => {
      if (!user.value) {
        window.sessionStorage.setItem('redirectAfterLogin', destination);
        router.push('/login');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        router.push(destination);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const pushHelp = () => {
      router.push('/help');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const pushKullanim = () => {
      router.push('/terms');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const pushUser = () => {
      router.push('/user');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const pushHome = () => {
      router.push('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const changeLanguage = (lang) => {
      locale.value = lang;
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const checkScrollPosition = () => {
      isVisible.value = window.pageYOffset > 400;
    };

    onMounted(() => {
      window.addEventListener('scroll', checkScrollPosition);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', checkScrollPosition);
    });

    return {
      changeLanguage,
      pushHome,
      pushUser,
      pushKullanim,
      pushHelp,
      pushLogin,
      scrollToTop,
      isVisible,
      user,
    };
  },
};
</script>

<style scoped>
:root {
  --footer-background-color: #343a40;
  --link-color: aliceblue;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  align-items: flex-start !important;
  flex-wrap: wrap;
  padding: 0 30px;
}

a {
  cursor: pointer;
}

h5 {
  color: rgb(102, 107, 110);
}

.footer-column {
  flex: 1 1 200px;
  padding: 10px;
  text-align: left !important;
}

.footer-column ul {
  padding-left: 0;
  list-style-type: none;
}

.footer-column li {
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: flex-start !important;
  }

  .footer-column {
    text-align: left !important;
    width: 100%;
    padding-left: 0;
    margin-left: 0;
  }
  
  .footer-column li {
    margin-bottom: 5px;
  }

  .footer-column li a {
    padding-left: 8px; /* Add padding to the left to align better */
  }
  .first h5{
    padding-left: 4px; /* Add padding to the left to align better */
  }
}

@media (min-width: 992px) {
  .footer-content {
    margin-left: 200px;
  }
}

.footer {
  background-color: var(--footer-background-color);
  color: var(--link-color);
  padding: 20px 0;
}

.link-light, .badge-primary, .badge, .social-badge {
  color: var(--link-color);
  text-decoration: none;
}

.social-badge {
  display: block;
  margin-bottom: 10px;
}

.footer hr {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.back-to-top {
  position: fixed;
  bottom: 50px;
  right: 30px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
  transform: rotate(0deg);
}

.back-to-top:hover {
  opacity: 1;
  transform: rotate(360deg);
}

.back-to-top i {
  font-size: 1.8rem;
}

.back-to-top:focus {
  outline: none;
}

.flag-icon {
  width: 20px;
  height: auto;
  margin-right: 8px;
}
</style>
