<template>
  <div id="app">
    <!-- Main Header Image with Caption -->
    <header class="header">
      <div class="header-image">
        <img src="../assets/headerPhoto2.jpg" alt="Header Image">
      </div>
      <div class="header-triangle"></div>
      <div class="header-caption">
        <h5>{{ $t('header.title') }}</h5>
        <h6 class="subtitle">{{ $t('header.subtitle') }}</h6>
      </div>
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
      <img src="../assets/step3.png" alt="Feature 3" @click="pushLogin('/fal')"  style="border-radius: 30%;"/>
      <p>{{ $t('features.getReading') }}</p>
    </swiper-slide>
  </swiper>
</section>

<!-- Bootstrap styled section -->
<section class="py-5 text-center">
  <div class="container">
    <h2 class="mb-4">{{t('section.mainTitle')}}</h2>
    <div class="row">
      <div class="col-md-6">
        <div class="card mb-4">
          <img src="../assets/coffeeBG.jpg" class="card-img-top" alt="coffee">
          <div class="card-body">
            <h5 class="card-title">{{ t('section.title1') }}</h5>
            <p class="card-text">{{ t('section.p1') }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card mb-4">
          <img src="../assets/coffeeBG2.jpg" class="card-img-top" alt="coffee">
          <div class="card-body">
            <h5 class="card-title">{{ t('section.title2') }}</h5>
            <p class="card-text">{{ t('section.p2') }}</p>
          </div>
        </div>
      </div>
    </div>
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
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default {
  name: 'HomeView',
  components: { Swiper, SwiperSlide },
  setup() {
    const router = useRouter();
    const { t } = useI18n();
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

    return { pushLogin, t, swiperBreakpoints, Navigation };
  }
};
</script>

<style>
/* Header Styles */
.header {
  position: relative;
  text-align: center;
  margin-bottom: 40px;
}

.header-image {
  position: relative;
}

.header-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
}

.header-triangle {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 30px;
  background-color: white;
}

.header-triangle::after {
  content: "";
  position: absolute;
  top: -0px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px; /* Adjusted size */
  height: 60px; /* Adjusted size */
  background: url('../assets/desen.webp') no-repeat center center;
  background-size: cover;
  clip-path: polygon(50% 100%, 0 0, 100% 0);
}

.header-caption {
  margin-top: 30px;
}

.header-caption p {
  margin: 0;
  font-size: 21px;
}

.header-caption .subtitle {
  color: #a00;
  font-weight: bold;
  margin-top: 5px;
}

/* Features Section */
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
  font-size: large;
}

.feature-item img {
  width: 100%;
  max-width: 220px;
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
  color: #000;
  z-index: 10;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 20px;
}

/* Media Queries */
@media screen and (max-width: 768px) {
  .swiper-button-next,
  .swiper-button-prev {
    display: block;
  }
}

/* Typography settings */
body {
  font-family: 'Arial', sans-serif;
}
</style>
