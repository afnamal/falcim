<template>
<div>
    <div class="container mt-5 help-page">
      <h1 class="text-center mb-4">Yardım ve Kullanım Kılavuzu</h1>
      <div class="accordion" id="helpAccordion">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Fal Türleri
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#helpAccordion">
            <div class="accordion-body">
              <p>Sitemizde iki çeşit fal hizmeti sunulmaktadır:</p>
              <ul>
                <li><strong>Kahve Falı:</strong> Geleneksel Türk kahve falına dayanır. Kahvenizi içtikten sonra fincanınızın fotoğrafını çekip yollayabilirsiniz.</li>
                <li><strong>El Falı:</strong> Elinizin fotoğrafını çekerek falınıza bakılmasını sağlayabilirsiniz.</li>
              </ul>
            </div>
          </div>
        </div>
  
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Üyelik ve Giriş İşlemleri
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#helpAccordion">
            <div class="accordion-body">
              <p>Fal baktırmak için öncelikle üye olmanız gerekmektedir. Üye olduktan sonra 'Üye Girişi' yaparak sisteme giriş yapabilirsiniz.</p>
            </div>
          </div>
        </div>
  
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Fal Baktırma Süreci
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#helpAccordion">
            <div class="accordion-body">
              <p>'Fal Bak' sekmesine tıklayarak kahve falı veya el falı seçeneklerinden birini seçebilirsiniz. Seçim yaptıktan sonra, aydınlık ve net çekilmiş bir fotoğraf yüklemeniz gerekmektedir. Fotoğrafın kalitesi falın yorumlanma kalitesini doğrudan etkiler.</p>
            </div>
          </div>
        </div>
  
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingFour">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
              Geçmiş Fallar ve Üyelik Bilgileri
            </button>
          </h2>
          <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#helpAccordion">
            <div class="accordion-body">
              <p>'Hesabım' altında bulunan 'Geçmiş Fallarım' seçeneği ile daha önce baktırdığınız fallara ulaşabilirsiniz. Ayrıca, 'Üyelik Bilgilerim' kısmından üyelik bilgilerinizi güncelleyebilirsiniz.</p>
            </div>
          </div>
        </div>
  
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingFive">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
              İletişim Bilgileri
            </button>
          </h2>
          <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#helpAccordion">
            <div class="accordion-body">
              <p>Sorularınız veya daha fazla bilgi için lütfen bize e-posta yoluyla ulaşın: <a href="mailto:afnamal@hotmail.com">afnamal@hotmail.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
  </template>
  <script>
  
  export default {
    components:{},
    setup() {
        
    },
  }
  </script>
  
  <style scoped>
  .help-page {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .content section {
    margin-bottom: 20px;
  }
  
  h1, h2 {
    color: #333;
  }
  
  p, li {
    color: #666;
    line-height: 1.6;
  }
  
  ul {
    margin-left: 20px;
  }
  
  .text-center {
    text-align: center;
  }
  
  a {
    color: #0056b3;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  