<!-- Blog.vue -->
<template>
  <div class="container my-5">
    <h1 class="display-4 mb-4">
      <i class="bi bi-journal-text"></i>
      Kahve ve Fal: Gelenekten Güne
    </h1>
    <img
      src="https://d1fm27ee7pjs8v.cloudfront.net/images/thumbnails/1000/posts/original/img_620111240a033.jpg"
      class="img-fluid mb-4 rounded shadow-sm"
      alt="Kahve fincanı"
      style="width: 100%; display: block; height: 500px; object-fit: cover;"

    />
    <section class="mb-5">
      <h2>Giriş</h2>
      <p>
        Fal bakma geleneği yüzyıllardır pek çok kültürde varlığını sürdürmektedir. Kahve falı ise özellikle Türkiye'de ve Orta Doğu'da oldukça popülerdir. Ancak kahve sadece fal bakmak için değil, sağlığa faydaları ile de bilinen bir içecektir.
      </p>
      <blockquote class="blockquote">
        <p class="mb-0">"Kahve falı, telveyle başlayan bir serüvendir."</p>
        <footer class="blockquote-footer">Falcım</footer>
      </blockquote>
    </section>
    <section class="mb-5">
      <h2>Fal Bakma Geleneği</h2>
      <p>
        Kahve falı bakma, Türk kahvesi içildikten sonra fincanın kapatılmasıyla başlar. Kapalı fincan ters çevrilir ve soğuması beklenir. Fincandaki telvenin oluşturduğu şekiller yorumlanarak fal bakılır.
      </p>
      <ul>
        <li>
          <strong>Fincan Kapağı:</strong>
          Fincanın tabak ile kapalı kısmı genellikle fal bakmanın ilk adımıdır. Kapak açıldığında telvenin fincana nasıl aktığına bakılır.
        </li>
        <li>
          <strong>Telve Şekilleri:</strong>
          Telvenin oluşturduğu şekiller, semboller ve desenler fal yorumunun anahtarıdır. Her şekil farklı anlamlar taşır.
        </li>
        <li>
          <strong>Fincan Tabanı:</strong>
          Fincanın tabanında oluşan şekiller, genellikle kişinin iç dünyası ve ruh haliyle ilgilidir.
        </li>
      </ul>
      <img
        src="https://images.unsplash.com/photo-1541167760496-1628856ab772"
        class="img-fluid my-4 rounded shadow-sm"
        alt="Kahve ile Güzel Bir An"
        style="width: 100%; display: block; height: 400px; object-fit: cover;"
      />
    </section>
    <section class="mb-5">
      <h2>Kahvenin Sağlığa Faydaları</h2>
      <ul>
        <li>
          <strong>Antioksidan Kaynağı:</strong>
          Kahve, serbest radikallerle savaşan antioksidanlar açısından zengin bir kaynaktır.
        </li>
        <li>
          <strong>Zihinsel Uyanıklık:</strong>
          İçeriğindeki kafein sayesinde zihinsel uyanıklığı ve konsantrasyonu artırır. Öğrenciler ve çalışanlar için idealdir.
        </li>
        <li>
          <strong>Kalp Sağlığı:</strong>
          Düzenli kahve tüketimi, kalp hastalıkları riskini azaltabilir. Ancak fazla tüketimden kaçınmak önemlidir.
        </li>
        <li>
          <strong>Fiziksel Performans:</strong>
          Kahve, kafein sayesinde enerji seviyelerini artırır ve fiziksel performansı destekler. Egzersiz öncesi bir fincan kahve idealdir.
        </li>
        <li>
          <strong>Diyabet Riski:</strong>
          Yapılan araştırmalar, düzenli kahve tüketiminin Tip 2 diyabet riskini azaltabileceğini göstermiştir.
        </li>
      </ul>
      <img
        src="../assets/dokulenKahve.webp"
        class="img-fluid my-4 rounded shadow-sm"
        alt="Kahve ile Güzel Bir An"
        style="width: 100%; display: block; height: 400px; object-fit: cover;"
      />
    </section>
    <section class="mb-5">
      <h2>Sonuç</h2>
      <p>
        Kahve, sadece fal bakmak için değil, günlük yaşamın bir parçası olarak da tüketilmesi gereken bir içecektir. Hem lezzetiyle hem de sağlığa olan faydalarıyla vazgeçilmezdir. Bir fincan kahveyle falınıza bakarken keyif alın ve kahvenin büyülü dünyasına adım atın!
      </p>
      <blockquote class="blockquote">
        <p class="mb-0">"Bir fincan kahvenin kırk yıl hatırı vardır."</p>
        <footer class="blockquote-footer">Atasözü</footer>
      </blockquote>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  background-color: #fefefe;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
ul {
  list-style: none;
  padding-left: 0;
}
ul li {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}
ul li:last-child {
  border-bottom: none;
}
ul li strong {
  color: #ff6200;
}
.blockquote {
  padding: 10px 20px;
  background-color: #f7f7f7;
  border-left: 4px solid #ff6200;
  margin-top: 20px;
}
.blockquote-footer {
  color: #777;
  font-size: 0.9rem;
}
.blockquote-footer{
  margin-top: 3px;
}
</style>
