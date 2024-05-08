<template>
  <div id="app">
    <!-- Navbar --><!-- Navbar component should be included here if it's a separate component -->

    <!-- Main Header Image -->
    <header>
      <img src="../assets/headerPhoto2.jpg" alt="">
    </header>

    <!-- Features Section -->
    <section class="features">
      <div class="feature-item" @click="pushLogin('/fal')">
        <img src="https://www.kaavefali.com/bs/img/step_01.png" alt="Feature 1" />
        <p>{{ $t('features.takePhoto') }}</p>
      </div>
      <div class="feature-item" @click="pushLogin('/fal')">
        <img src="https://www.kaavefali.com/bs/img/step_02.png" alt="Feature 2" />
        <p>{{ $t('features.enterInfo') }}</p>
      </div>
      <div class="feature-item" @click="pushLogin('/fal')">
        <img src="https://www.kaavefali.com/bs/img/step_03.png" alt="Feature 3" />
        <p>{{ $t('features.getReading') }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { getAuth } from 'firebase/auth';
import { ref } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
export default {
  name: 'HomeView',
  components: {},
  setup() {
    const router = useRouter()
    const { t } = useI18n();  // Destructuring the translation function `t` from useI18n
    const auth = getAuth();
    const user = ref(null);

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

    return { pushLogin,t};
  }
};
</script>

<style>
/* Your styles here */

header img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
  margin-left: -0px
}

.features {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-item {
  flex: 1;
  min-width: 250px;
  margin: 20px;
  text-align: center;
}
/* Hover effect for better interaction */
.feature-item:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease-in-out;
}

/* Parallax effect for background */
header {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

/* Typography settings */
body {
  font-family: 'Arial', sans-serif;
}
</style>
