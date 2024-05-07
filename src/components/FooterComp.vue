<template>
  <div>
    <footer class="footer bg-dark text-light py-5">
      <div class="container">
        <div class="footer-content">
          <!-- Section 1: Navigation Links -->
          <div class="footer-column">
            <h5>{{ $t('footer.brand') }}</h5>
            <ul class="list-unstyled" >
              <li @click="pushHome"><a  class="link-light">{{ $t('footer.links.home') }}</a></li>
              <li @click="pushLogin('/fal')"><a  class="link-light">{{ $t('footer.links.fortune') }}</a></li>
              <li @click="pushLogin('/')"><a class="link-light">{{ $t('footer.links.login') }}</a></li>
              <li @click="pushHelp"><a  class="link-light">{{ $t('footer.links.help') }}</a></li>
              <li @click="pushKullanim"><a   class="link-light">{{ $t('footer.links.terms') }}</a></li>
            </ul>
          </div>

          <!-- Section 2: Language Selection and Info -->
          <div class="footer-column">
            <h5>{{ $t('footer.globalPresence') }}</h5>
            <div class="column">
              <a @click="changeLanguage('tr')"  class="badge badge-secondary">{{ $t('languages.turkish') }}</a><br>
              <a @click="changeLanguage('en')" class="badge badge-secondary">{{ $t('languages.english') }}</a><br>
              <a @click="changeLanguage('ar')" class="badge badge-secondary">{{ $t('languages.arabic') }}</a><br>
              <a @click="changeLanguage('gr')" class="badge badge-secondary">{{ $t('languages.greek') }}</a><br>
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
import { useI18n } from 'vue-i18n'; // vue-i18n'den useI18n'ı import edin
import { ref } from 'vue';

export default {
  setup() {
    const router = useRouter();
    const auth = getAuth();
    const user = ref(null);
    const { locale } = useI18n(); // useI18n hook'undan locale'i alın

    onAuthStateChanged(auth, (authUser) => {
      user.value = authUser;
    });
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
    const changeLanguage = (lang) => {
      locale.value = lang; // locale'i güncelleyin
      
    };
    return{changeLanguage,pushHome,pushUser ,pushKullanim,pushHelp,pushLogin}
  },
}</script>

<style scoped>
:root {
  --footer-background-color: #343a40;
  --link-color: aliceblue;
}
.footer-content {
  display: flex;
  justify-content: space-around;
  align-items: flex-start !important; /* Force alignment */
  flex-wrap: wrap;
  padding: 0 30px;
}
a{
  cursor: pointer;
}

.footer-column {
  flex: 1 1 200px;
  padding: 10px;
  text-align: left !important; /* Force text alignment */
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: flex-start !important;
  }

  .footer-column {
    text-align: left !important;
    width: 100%;
    padding-left: 0; /* Sol tarafa boşluk bırakmadan metni hizala */
    margin-left: -20px; /* Sol kenar boşluğunu kaldır */
  }
}


@media (min-width: 992px) {
  .footer-content {
    margin-left: 200px; /* Apply margin-left only on screens larger than 992px */
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


</style>
