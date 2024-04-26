<template>
  <div id="app">
    <!-- Navbar -->
   <navbarMenu/>

    <!-- Main Header Image -->
    <header>
      <img src="https://www.kaavefali.com/bs/img/top_back_01.jpg" alt="Header Background" />
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
export default {
  name: 'HomeView',
  components: {navbarMenu},
  
};
</script>


<style>
/* Your styles here */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative; /* Needed to position the menu absolutely with respect to the navbar */
}
span{
  cursor: pointer;
}
.navbar-menu ul {
  list-style: none;
  padding: 0;
  margin: 0; /* Remove default margin */
}

.navbar-menu li {
  margin-right: 20px; /* Adjust spacing between links */
  padding: 10px 20px; /* Padding for clickable area */
  cursor: pointer;
}
li::marker {
  color: black;
}
.navbar-menu li:last-child {
  margin-right: 0; /* Remove margin for the last item */
}

.logo {
  max-width: 45px;
}

header img {
  width: 105%;
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
a{
  text-decoration: none;
  color: black;
}


</style>
