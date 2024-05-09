<template>
  <div id="app">
    <!-- Navbar -->

    <!-- Main Header Image -->
    <header>
      <img src="../assets/headerPhoto2.jpg" alt="Header Image">
    </header>

    <!-- Features Section -->
    <section class="features">
      <swiper
        :slides-per-view="1"
        :space-between="20"
        :breakpoints="swiperBreakpoints"
        class="mySwiper"
        navigation
        :modules="[Navigation]"
      >
        <swiper-slide class="feature-item">
          <img src="https://www.kaavefali.com/bs/img/step_01.png" alt="Feature 1" @click="pushLogin('/fal')" />
          <p>{{ $t('features.takePhoto') }}</p>
        </swiper-slide>
        <swiper-slide class="feature-item">
          <img src="https://www.kaavefali.com/bs/img/step_02.png" alt="Feature 2" @click="pushLogin('/fal')" />
          <p>{{ $t('features.enterInfo') }}</p>
        </swiper-slide>
        <swiper-slide class="feature-item">
          <img src="https://www.kaavefali.com/bs/img/step_03.png" alt="Feature 3" @click="pushLogin('/fal')" />
          <p>{{ $t('features.getReading') }}</p>
        </swiper-slide>
      </swiper>
    </section>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { getAuth } from 'firebase/auth';
import { ref } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default {
  name: 'HomeView',
  components: { Swiper, SwiperSlide },
  setup() {
    const router = useRouter();
    const { t } = useI18n(); // Destructuring the translation function `t` from useI18n
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

    const swiperBreakpoints = {
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    };

    return { pushLogin, t, swiperBreakpoints,Navigation };
  }
};
</script>

<style>
header img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.features {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.feature-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.feature-item img {
  width: 100%;
  max-width: 150px;
  margin-bottom: 10px;
}

/* Hover effect for better interaction */
.feature-item:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease-in-out;
}

/* Swiper Styles */
.mySwiper {
  margin: 0 auto;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Navigation Arrow Styles */
.swiper-button-next,
.swiper-button-prev {
  color: #000; /* Customize color of arrows */
  z-index: 10;
  display: none;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 20px;
}

@media screen and (max-width: 768px) {
  .swiper-button-next,
  .swiper-button-prev {
    display: block;
  }
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
