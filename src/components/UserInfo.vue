<template>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Bilgilerinizi Güncelleyin</h2>
      <form @submit.prevent="handleUpdate" class="needs-validation" novalidate>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="name" placeholder="İsim giriniz" required v-model="name">
          <label for="name">İsim</label>
        </div>
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="email" placeholder="Email giriniz" required v-model="email" disabled>
          <label for="email">Email (Güncellenemez)</label>
        </div>
        <div class="form-floating mb-3">
          <input type="password" class="form-control" id="password" placeholder="Yeni şifre giriniz (Opsiyonel)" v-model="password">
          <label for="password">Yeni Şifre</label>
        </div>
        <div class="form-floating mb-3">
          <input type="date" class="form-control" id="birthDate" placeholder="Doğum tarihi giriniz" v-model="birthDate">
          <label for="birthDate">Doğum Tarihi</label>
        </div>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="location" placeholder="Yaşadığınız yer giriniz" v-model="location">
          <label for="location">Yaşadığınız Yer</label>
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

  