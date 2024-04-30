<template>
  <div id="app">
    <!-- Navbar -->
   <navbarMenu/>

    <!-- Main Header Image -->
    <header>
      <carousel/>
    </header>

    <!-- Features Section -->
    <section class="features">
      <div class="feature-item">
        <img src="https://www.kaavefali.com/bs/img/step_01.png" alt="Feature 1" />
        <p>Fincanının
fotoğraflarını çek</p>
      </div>
      <div class="feature-item">
        <img src="https://www.kaavefali.com/bs/img/step_02.png" alt="Feature 2" />
        <p>Bilgilerini
kolayca gir</p>
      </div>
      <div class="feature-item">
        <img src="https://www.kaavefali.com/bs/img/step_03.png" alt="Feature 3" />
        <p>Yorumcun anında yorumlasın</p>
      </div>
    </section>
  </div>
</template>

<script>
import navbarMenu from '../components/NavbarMenu.vue'
import carousel from '../components/CarouselComp.vue'
export default {
  name: 'HomeView',
  components: {navbarMenu,carousel},
  
};
</script>


<style>
/* Your styles here */


header img {
  width: 101%;
  height: 300px;
  object-fit: cover;
  display: block;
  margin-left: -8px;
  
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
/* Hover Efekti için */
.feature-item:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease-in-out;
}

/* Paralaks Efekti için */
header {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

/* Tipografi için */
body {
  font-family: 'Arial', sans-serif;
}



</style>
