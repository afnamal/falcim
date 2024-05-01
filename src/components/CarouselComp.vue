<template>
  <div class="slider">
    <div v-for="(img, index) in images" :key="index">
      <img :src="img" alt="Slide">
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import 'slick-carousel';

export default {
  data() {
    return {
      images: [
        "https://www.kaavefali.com/bs/img/top_back_02.jpg",
        "https://www.kaavefali.com/bs/img/top_back_01.jpg",
        "https://aegeandelight.com/wp-content/uploads/2021/11/turkish-coffee-14.jpg",
      ]
    };
  },
  mounted() {
  this.$nextTick(() => {
    $(this.$el.querySelector('.slider')).slick({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      adaptiveHeight: true
    });
  });
}
};
</script>

<style scoped>
.slider img {
  width: 100%;
}
</style>
