<template>
    <footer class="bg-dark text-light pt-3 pb-3">
      <div class="container">
        <div class="row">
          <!-- Section 1: Navigation Links -->
          <div class="col-md-4">
            <h5>Kaave</h5>
            <ul class="list-unstyled">
              <li><a href="#" class="text-light">iPhone ile fal baktır</a></li>
              <li><a href="#" class="text-light">Android ile fal baktır</a></li>
              <li><a href="#" class="text-light">Huawei ile fal baktır</a></li>
              <li><a href="#" class="text-light">Yardım</a></li>
              <li><a href="#" class="text-light">Kullanım Şartları</a></li>
            </ul>
          </div>
  
          <!-- Section 2: Language Selection and Info -->
          <div class="col-md-4 text-center">
            <h5>Dünyada Kaave</h5>
            <div>
              <a href="#" class="badge badge-secondary">Türkçe</a>
              <a href="#" class="badge badge-secondary">English</a>
              <a href="#" class="badge badge-secondary">العربية</a>
              <a href="#" class="badge badge-secondary">Ελληνικά</a>
            </div>
          </div>
  
          <!-- Section 3: Social Media Links -->
          <div class="col-md-4 text-end">
            <h5>Sosyal Medya</h5>
            <a href="https://facebook.com" class="btn btn-outline-light btn-sm">Facebook</a>
            <a href="https://instagram.com" class="btn btn-outline-light btn-sm">Instagram</a>
            <a href="https://twitter.com" class="btn btn-outline-light btn-sm">Twitter</a>
            <a href="#" class="btn btn-outline-light btn-sm">Blog</a>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'AppFooter'
  }
  </script>
  
  <style scoped>
  .footer a:hover {
    text-decoration: underline;
  }
  </style>
  