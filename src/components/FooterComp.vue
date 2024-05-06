<template>
  <div>
    <footer class="footer bg-dark text-light py-5">
      <div class="container">
        <div class="footer-content">
          <!-- Section 1: Navigation Links -->
          <div class="footer-column">
            <h5>{{ $t('footer.brand') }}</h5>
            <ul class="list-unstyled">
              <li><a href="#" class="link-light">{{ $t('footer.links.iphone') }}</a></li>
              <li><a href="#" class="link-light">{{ $t('footer.links.android') }}</a></li>
              <li><a href="#" class="link-light">{{ $t('footer.links.huawei') }}</a></li>
              <li><a href="#" class="link-light">{{ $t('footer.links.help') }}</a></li>
              <li><a href="#" class="link-light">{{ $t('footer.links.terms') }}</a></li>
            </ul>
          </div>

          <!-- Section 2: Language Selection and Info -->
          <div class="footer-column">
            <h5>{{ $t('footer.globalPresence') }}</h5>
            <div class="column">
              <a href="#" class="badge badge-secondary">{{ $t('languages.turkish') }}</a><br>
              <a href="#" class="badge badge-secondary">{{ $t('languages.english') }}</a><br>
              <a href="#" class="badge badge-secondary">{{ $t('languages.arabic') }}</a><br>
              <a href="#" class="badge badge-secondary">{{ $t('languages.greek') }}</a><br>
            </div>
          </div>

          <!-- Section 3: Social Media Links -->
          <div class="footer-column">
            <h5>{{ $t('footer.socialMedia') }}</h5>
            <a href="https://facebook.com" class="badge badge-primary mb-2"><i class="fab fa-facebook"></i> Facebook</a><br>
            <a href="https://instagram.com" class="badge badge-primary mb-2"><i class="fab fa-instagram"></i> Instagram</a><br>
            <a href="https://twitter.com" class="badge badge-primary mb-2"><i class="fab fa-twitter"></i> Twitter</a><br>
            <a href="#" class="badge badge-primary mb-2"><i class="fas fa-blog"></i> Blog</a><br>
          </div>
        </div>
        <div class="copyright">
          <hr style="width: 70%; margin: 0 auto;">
          <p class="text-center mt-3">{{ $t('footer.rights') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>


<style>
:root {
  --footer-background-color: #343a40;
  --link-color: aliceblue;
}
.footer-content {
  display: flex;
  justify-content: space-around;
  align-items: flex-start !important; /* Force alignment */
  flex-wrap: wrap;
  padding: 0 30px;
}

.footer-column {
  flex: 1 1 200px;
  padding: 10px;
  text-align: left !important; /* Force text alignment */
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: flex-start !important; /* Ensure alignment on mobile */
  }

  .footer-column {
    text-align: left !important; /* Ensure text is left-aligned on small screens */
    width: 100%;
  }
}

@media (min-width: 992px) {
  .footer-content {
    margin-left: 200px; /* Apply margin-left only on screens larger than 992px */
  }
}

.footer {
  background-color: var(--footer-background-color);
  color: var(--link-color);
  padding: 20px 0;
}





.link-light, .badge-primary, .badge, .social-badge {
  color: var(--link-color);
  text-decoration: none;
}

.social-badge {
  display: block;
  margin-bottom: 10px;
}

.footer hr {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}


</style>
