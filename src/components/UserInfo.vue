<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Bilgilerinizi Güncelleyin</h2>
    <form @submit.prevent="handleUpdate" class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="name" class="form-label">İsim</label>
        <input type="text" class="form-control" id="name" placeholder="İsim giriniz" required v-model="name">
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email (Güncellenemez)</label>
        <input type="email" class="form-control" id="email" placeholder="Email giriniz" required v-model="email" disabled>
      </div>
      <div class="mb-3">
        <label for="birthDate" class="form-label">Doğum Tarihi</label>
        <input type="date" class="form-control" id="birthDate" placeholder="Doğum tarihi giriniz" v-model="birthDate">
      </div>
      <div class="form-floating mb-3">
    <select class="form-select" id="location" v-model="location" aria-label="Yaşadığınız Yer">
    <option value="Adana">Adana</option>
    <option value="Adıyaman">Adıyaman</option>
    <option value="Afyonkarahisar">Afyonkarahisar</option>
    <option value="Ağrı">Ağrı</option>
    <option value="Amasya">Amasya</option>
    <option value="Ankara">Ankara</option>
    <option value="Antalya">Antalya</option>
    <option value="Artvin">Artvin</option>
    <option value="Aydın">Aydın</option>
    <option value="Balıkesir">Balıkesir</option>
    <option value="Bilecik">Bilecik</option>
    <option value="Bingöl">Bingöl</option>
    <option value="Bitlis">Bitlis</option>
    <option value="Bolu">Bolu</option>
    <option value="Burdur">Burdur</option>
    <option value="Bursa">Bursa</option>
    <option value="Çanakkale">Çanakkale</option>
    <option value="Çankırı">Çankırı</option>
    <option value="Çorum">Çorum</option>
    <option value="Denizli">Denizli</option>
    <option value="Diyarbakır">Diyarbakır</option>
    <option value="Edirne">Edirne</option>
    <option value="Elazığ">Elazığ</option>
    <option value="Erzincan">Erzincan</option>
    <option value="Erzurum">Erzurum</option>
    <option value="Eskişehir">Eskişehir</option>
    <option value="Gaziantep">Gaziantep</option>
    <option value="Giresun">Giresun</option>
    <option value="Gümüşhane">Gümüşhane</option>
    <option value="Hakkâri">Hakkâri</option>
    <option value="Hatay">Hatay</option>
    <option value="Isparta">Isparta</option>
    <option value="Mersin">Mersin</option>
    <option value="İstanbul">İstanbul</option>
    <option value="İzmir">İzmir</option>
    <option value="Kars">Kars</option>
    <option value="Kastamonu">Kastamonu</option>
    <option value="Kayseri">Kayseri</option>
    <option value="Kırklareli">Kırklareli</option>
    <option value="Kırşehir">Kırşehir</option>
    <option value="Kocaeli">Kocaeli</option>
    <option value="Konya">Konya</option>
    <option value="Kütahya">Kütahya</option>
    <option value="Malatya">Malatya</option>
    <option value="Manisa">Manisa</option>
    <option value="Kahramanmaraş">Kahramanmaraş</option>
    <option value="Mardin">Mardin</option>
    <option value="Muğla">Muğla</option>
    <option value="Muş">Muş</option>
    <option value="Nevşehir">Nevşehir</option>
    <option value="Niğde">Niğde</option>
    <option value="Ordu">Ordu</option>
    <option value="Rize">Rize</option>
    <option value="Sakarya">Sakarya</option>
    <option value="Samsun">Samsun</option>
    <option value="Siirt">Siirt</option>
    <option value="Sinop">Sinop</option>
    <option value="Sivas">Sivas</option>
    <option value="Tekirdağ">Tekirdağ</option>
    <option value="Tokat">Tokat</option>
    <option value="Trabzon">Trabzon</option>
    <option value="Tunceli">Tunceli</option>
    <option value="Şanlıurfa">Şanlıurfa</option>
    <option value="Uşak">Uşak</option>
    <option value="Van">Van</option>
    <option value="Yozgat">Yozgat</option>
    <option value="Zonguldak">Zonguldak</option>
    <option value="Aksaray">Aksaray</option>
    <option value="Bayburt">Bayburt</option>
    <option value="Karaman">Karaman</option>
    <option value="Kırıkkale">Kırıkkale</option>
    <option value="Batman">Batman</option>
    <option value="Şırnak">Şırnak</option>
    <option value="Bartın">Bartın</option>
    <option value="Ardahan">Ardahan</option>
    <option value="Iğdır">Iğdır</option>
    <option value="Yalova">Yalova</option>
    <option value="Karabük">Karabük</option>
    <option value="Kilis">Kilis</option>
    <option value="Osmaniye">Osmaniye</option>
    <option value="Düzce">Düzce</option>
    </select>
    <label for="location">Şehrimi Değiştir</label>
</div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <button type="submit" class="btn btn-primary w-100">Güncelle</button>
      <button type="button" class="btn btn-secondary w-100 mt-2" @click="sendMail">Şifre Sıfırlama E-postası Gönder</button>
    </form>
  </div>
</template>



<script>
import { ref, onMounted } from 'vue';
import { getAuth, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { showToast } from '../services/notificationService';  // Doğru ithalat yolu

export default {
  setup() {
    const auth = getAuth();
    const db = getFirestore();
    const user = auth.currentUser;
    const name = ref('');
    const email = ref('');
    const birthDate = ref('');
    const location = ref('');
    const error = ref('');

    const fetchUserData = async () => {
      const userDoc = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        name.value = userData.name;
        email.value = userData.email;
        birthDate.value = userData.birthDate;
        location.value = userData.location;
      } else {
        error.value = 'Kullanıcı bilgisi bulunamadı.';
      }
    };

    const handleUpdate = async () => {
      if (!auth.currentUser) {
        console.error('Güncelleme işlemi başlatılamadı: Kullanıcı oturumu bulunamadı.');
        error.value = 'Kullanıcı oturumu bulunamadı. Lütfen oturum açın.';
        return;
      }

      try {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
          name: name.value,
          birthDate: birthDate.value,
          location: location.value
        });

        await updateProfile(auth.currentUser, {
          displayName: name.value
        });

        showToast("Bilgileriniz Başarıyla Güncellendi!", 'success');
      } catch (err) {
        console.error('Güncelleme sırasında bir hata oluştu:', err);
        error.value = 'Güncelleme sırasında bir hata oluştu: ' + err.message;
      }
    };

    const sendMail = async () => {
      if (!auth.currentUser) {
        console.error('E-posta gönderimi başlatılamadı: Kullanıcı oturumu bulunamadı.');
        error.value = 'Kullanıcı oturumu bulunamadı. Lütfen oturum açın.';
        return;
      }

      try {
        await sendPasswordResetEmail(auth, auth.currentUser.email);
        alert('Şifre sıfırlama e-postası gönderildi. Lütfen e-postanızı kontrol edin.');
      } catch (err) {
        console.error('Şifre sıfırlama e-postası gönderilirken bir hata oluştu:', err);
        error.value = 'E-posta gönderilirken bir hata oluştu: ' + err.message;
      }
    };

    onMounted(fetchUserData);

    return { name, email, birthDate, location, handleUpdate, error, sendMail };
  }
}
</script>



<style scoped>
.container {
  max-width: 600px;  /* Daraltılmış konteyner genişliği, odaklanmayı artırır */
  margin: 2rem auto;
  padding: 20px;
  background: #fff;  /* Temiz, beyaz arkaplan */
  border: 1px solid #ccc;  /* Sınırları belirginleştir */
  border-radius: 8px;  /* Yuvarlatılmış köşeler */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);  /* Hafif gölge efekti */
}

.form-label {
  font-weight: bold;  /* Etiketleri daha belirgin hale getir */
}

.form-control {
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.075);  /* İç gölge, derinlik hissi verir */
  border-radius: 0.375rem;  /* Bootstrap 5 varsayılan yuvarlaklık */
}

.btn-primary {
  background-color: #0056b3;  /* Marka rengi */
  border-color: #004085;  /* Sınır rengi, butona derinlik katmak için */
}

.btn-primary:hover {
  background-color: #003865;  /* Hover durumunda daha koyu renk */
}

.alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
    padding: 10px;
    border-radius: 4px;
    margin-top: 1rem;
}
</style>