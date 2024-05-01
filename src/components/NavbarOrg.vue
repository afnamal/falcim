<template>
  <div>
  <nav class="main-nav">
    <router-link :to="{ name: 'FalView' }">Kahve Falı</router-link>
    <router-link :to="{ name: 'eltest' }">El Falı</router-link>
  </nav>
</div>
</template>

<script>
export default {
  
};
</script>

<style>
.main-nav {
  display: flex; /* Flexbox modelini etkinleştirir */
  justify-content: center; /* Tüm içerikleri merkeze hizalar */
  text-align: center;
  margin: 40px auto;
}
.main-nav a {
  display: inline-block; /* Bağlantıları yatay olarak hizalar */
  text-decoration: none;
  margin: 0 10px; /* Bağlantılar arasında biraz boşluk bırakır */
  color: #999;
  font-size: 18px;
}
a.router-link-active {
  border-bottom: 2px solid #696ef7; /* Aktif bağlantıyı vurgular */
  padding-bottom: 4px;
  color: #7183d4; /* Aktif bağlantı rengini değiştirir */
}
div{
justify-content: space-between;
}
</style>
