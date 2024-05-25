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
          <img src="https://www.kaavefali.com/bs/img/step_01.png" alt="Feature 1" @click="pushLogin('/fal/kahve')" />
          <p>{{ $t('features.takePhoto') }}</p>
        </swiper-slide>
        <swiper-slide class="feature-item">
          <img src="https://www.kaavefali.com/bs/img/step_02.png" alt="Feature 2" @click="pushLogin('/fal/kahve')" />
          <p>{{ $t('features.enterInfo') }}</p>
        </swiper-slide>
        <swiper-slide class="feature-item">
          <img src="../assets/falcilar22.jpg" alt="Feature 3" @click="pushLogin('/fal/kahve')" style="border-radius: 30%;" />
          <p>{{ $t('features.getReading') }}</p>
        </swiper-slide>
      </swiper>
    </section>

    <!-- Bootstrap styled section -->
    <section class="section-cards text-center">
      <div class="container">
        <h2 class="mb-4 section-title">{{ t('section.mainTitle') }}</h2>
        <div class="row">
          <div class="col-md-6 pushBlog" @click="pushBlog">
            <div class="card mb-4 shadow-sm hover-zoom">
              <img src="../assets/coffeeBG.jpg" class="card-img-top" alt="coffee">
              <div class="card-body">
                <h5 class="card-title">{{ t('section.title1') }}</h5>
                <p class="card-text">{{ t('section.p1') }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 pushBlog" @click="pushBlog2">
            <div class="card mb-4 shadow-sm hover-zoom">
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

    <!-- New Section with Stats -->
    <section class="section-stats text-center">
      <div class="container">
        <h2 class="mb-4 section-title">{{ t('stats.sectionTitle') }}</h2>
        <div class="row">
          <div class="col-md-6">
            <div class="card mb-4 shadow-sm stat-card hover-zoom">
              <div class="card-body">
                <h5 class="card-title">{{ dailyUsersCount + ' ' + t('stats.dailyUsers') }}</h5>
                <p class="card-text">{{ $t('stats.dailyUsersDesc') }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card mb-4 shadow-sm stat-card hover-zoom">
              <div class="card-body">
                <h5 class="card-title">{{ totalReadingsCount + ' ' + t('stats.totalReadings') }}</h5>
                <p class="card-text">{{ $t('stats.totalReadingsDesc') }}</p>
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
import { ref, onMounted } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

export default {
  name: 'HomeView',
  components: { Swiper, SwiperSlide },
  setup() {
    const router = useRouter();
    const { t } = useI18n();
    const auth = getAuth();
    const user = ref(null);
    const dailyUsersCount = ref(0); // Başlangıç değeri
    const totalReadingsCount = ref(0); // Başlangıç değeri
    const db= getFirestore()

    const documentId = 'S4ikHT99Y5ag3RuygY9k'; // Belgenizin ID'sini burada belirtin

    const incrementCounts = async () => {
      const incrementDailyUsers = Math.floor(Math.random() * 2) + 1;
      const incrementTotalReadings = Math.floor(Math.random() * 4) + 1;

      dailyUsersCount.value += incrementDailyUsers;
      totalReadingsCount.value += incrementTotalReadings;

      const countsRef = doc(db, 'counts', documentId);
      await updateDoc(countsRef, {
        dailyUsers: dailyUsersCount.value,
        totalReadings: totalReadingsCount.value
      });
    };

    const subscribeToCounts = () => {
      const countsRef = doc(db, 'counts', documentId);
      onSnapshot(countsRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          dailyUsersCount.value = data.dailyUsers;
          totalReadingsCount.value = data.totalReadings;
        }
      });
    };

    onMounted(() => {
      subscribeToCounts();
      setInterval(incrementCounts, 30000); // 30 saniyede bir güncellenir
    });

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
    const pushBlog = () => {
  router.push('/blog');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

    const pushBlog2=()=>{
      router.push('/blog2')
      window.scrollTo({ top: 0, behavior: 'smooth' });

    }

    const swiperBreakpoints = {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    };

    return {
      pushLogin,
      t,
      swiperBreakpoints,
      Navigation,
      dailyUsersCount,
      totalReadingsCount,
      pushBlog,
      pushBlog2
    };
  },
};
</script>

<style>
/* General Typography and Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  margin-bottom: 20px;
  color: #333;
}

/* Header Styles */
.header {
  position: relative;
  text-align: center;
  margin-bottom: 40px;
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
  width: 60px;
  height: 60px;
  background: url('../assets/desen.webp') no-repeat center center;
  background-size: cover;
  clip-path: polygon(50% 100%, 0 0, 100% 0);
}

.header-caption {
  margin-top: 30px;
  color: rgb(29, 27, 27);
}

.header-caption h5, .header-caption h6 {
  margin: 0;
}

.header-caption h5 {
  font-size: 28px;
  font-weight: bold;
}

.header-caption h6.subtitle {
  font-size: 18px;
  color: #a00;
  font-weight: bold;
  margin-top: 5px;
}

/* Features Section */
.features {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.feature-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: large;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.feature-item img {
  width: 100%;
  max-width: 220px;
  margin-bottom: 10px;
}

.feature-item p {
  font-size: 16px;
  font-weight: bold;
}

.feature-item:hover {
  transform: scale(1.1);
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

.swiper-button-next,
.swiper-button-prev {
  color: #000;
  z-index: 10;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 20px;
}

/* Section Cards */
.pushBlog{
  cursor: pointer;
}
.section-cards {
  background-color: #f7f7f7;
  padding: 60px 0;
}

.section-cards .container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-cards .card {
  border: none;
  overflow: hidden;
  border-radius: 15px;
  transition: all 0.4s ease;
}

.section-cards .hover-zoom:hover {
  transform: translateY(-10px) scale(1.05);
}

.section-cards .card img {
  object-fit: cover;
  transition: all 0.4s ease;
}

.section-cards .card-title {
  font-size: 20px;
  font-weight: bold;
}

.section-cards .card-text {
  color: #666;
}

/* Section Stats */
.section-stats {
  background-color: #fff;
  padding: 60px 0;
}

.section-stats .container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-stats .stat-card {
  background-color: #f7f7f7;
  border-radius: 15px;
  transition: all 0.4s ease;
}

.section-stats .hover-zoom:hover {
  transform: translateY(-10px) scale(1.05);
}

.section-stats .card-title {
  font-size: 24px;
  font-weight: bold;
}

.section-stats .card-text {
  color: #666;
  font-size: 18px;
  margin-top: 10px;
}

.section-title {
  font-size: 28px;
  color: #444;
  font-weight: bold;
  margin-bottom: 40px;
}

/* Media Queries */
@media screen and (max-width: 768px) {
  .swiper-button-next,
	swiper-button-prev {
    display: block;
  }
}

@media screen and (max-width: 480px) {
  .header-image img {
    height: 300px;
  }

  .header-caption h5 {
    font-size: 24px;
  }

  .header-caption h6 {
    font-size: 16px;
  }

  .features {
    padding: 20px;
  }
}
</style>
