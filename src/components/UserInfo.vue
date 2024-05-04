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
          <label for="password" class="form-label">Yeni Şifre (Opsiyonel)</label>
          <input type="password" class="form-control" id="password" placeholder="Yeni şifre giriniz" v-model="password">
        </div>
        <div class="mb-3">
          <label for="birthDate" class="form-label">Doğum Tarihi</label>
          <input type="date" class="form-control" id="birthDate" placeholder="Doğum tarihi giriniz" v-model="birthDate">
        </div>
        <div class="mb-3">
          <label for="location" class="form-label">Yaşadığınız Yer</label>
          <input type="text" class="form-control" id="location" placeholder="Yaşadığınız yer giriniz" v-model="location">
        </div>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <button type="submit" class="btn btn-primary w-100">Güncelle</button>
      </form>
    </div>
  </template>
  
  <script>
import { ref, onMounted } from 'vue';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

export default {
  setup() {
    const auth = getAuth();
    const db = getFirestore();
    const user = auth.currentUser;
    const name = ref('');
    const email = ref('');
    const password = ref('');
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
  try {
    user.displayName=name.value;
    const userDocRef = doc(db, 'users', user.uid);
    await updateDoc(userDocRef, {
      name: name.value,
      birthDate: birthDate.value,
      location: location.value
    });
    if (password.value) {
      await user.updatePassword(password.value);
    }
    alert('Bilgileriniz başarıyla güncellendi!');
    // router.push('/profile'); // Opsiyonel, kullanıcıyı profil sayfasına yönlendir
  } catch (err) {
    console.error('Güncelleme sırasında bir hata oluştu:', err);
    error.value = 'Güncelleme sırasında bir hata oluştu: ' + err.message;
  }
};

    onMounted(fetchUserData);

    return { name, email, password, birthDate, location, handleUpdate, error };
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