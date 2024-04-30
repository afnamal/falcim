<template>
    <div class="carousel">
      <div class="carousel-item" v-for="(image, index) in visibleImages" :key="index"
           :style="{ backgroundImage: 'url(' + image + ')' }">
      </div>
      <button class="prev" @click="prevImage">&#10094;</button>
      <button class="next" @click="nextImage">&#10095;</button>
    </div>
  </template>
  
  <script setup>
import { ref, computed ,onMounted, onUnmounted} from 'vue';

const currentIndex = ref(0);
const images = ref([
  require("../assets/headerPhoto2.jpg"),  // İkinci resmin yolunu yükleyin
  require("../assets/headerPhoto6.jpg") ,  // Üçüncü resmin yolunu yükleyin
  require("../assets/headerPhoto8.jpg") ,  // Üçüncü resmin yolunu yükleyin


]);

const visibleImages = computed(() => {
  return [images.value[currentIndex.value]];
});

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};

const prevImage = () => {
  currentIndex.value = (currentIndex.value + images.value.length - 1) % images.value.length;
};

let interval;
onMounted(() => {
  interval = setInterval(nextImage, 3000); // Her 3 saniyede bir resmi otomatik değiştir
});
onUnmounted(() => {
  clearInterval(interval); // Komponent yok edildiğinde interval'i temizle
});
</script>
  
  <style scoped>
  .carousel {
    position: relative;
    width: 100%;
    height: 300px; /* Carousel yüksekliği */
    overflow: hidden;
  }
  
  .carousel-item {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }
  
  .prev, .next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 24px;
    color: white;
    background-color: rgba(0,0,0,0.5);
    border: none;
  }
  
  .prev {
    left: 10px;
  }
  
  .next {
    right: 10px;
  }
  </style>
  