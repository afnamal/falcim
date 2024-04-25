<template>
  <nav v-if="user">
    <!-- Değiştirilmiş input alanı -->
    <label for="file-upload">
  <img :src="user.photoURL" alt="Profil Fotoğrafı" class="profil" v-if="user.photoURL">
  <img src="../assets/fal-logo4.png" alt="Profil Fotoğrafı" class="profil" v-else>
</label>
<input id="file-upload" type="file" accept="image/*" style="display: none" @change="handleFileChange">


    <div class="hiuser">
      <p>Merhaba {{ user.displayName }}</p>
      <p class="email">{{ user.email }} ile giriş yapıldı</p>
    </div>   
    <button class="pointer" @click="handleClick">Çıkış Yap</button>
    <p v-if="error">{{ error }}</p>
  </nav>
</template>

<script>
import LogoutComposable from '../composables/LogoutComposable'
import { useRouter } from 'vue-router';
import GetUser from '../composables/GetUser'
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default {
  setup() {
    const router = useRouter();
    const { error, logout } = LogoutComposable();
    const { user } = GetUser();

    const handleClick = async () => {
      await logout();
      if (!error.value) {
        console.log('Logout işlemi başarıyla gerçekleştirildi');
        router.push('/');
      }
    }

    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      
      const storage = getStorage();
      const storageRef = ref(storage, 'profile_photos/' + file.name);
      
      try {
        // Dosyayı yükle
        await uploadBytes(storageRef, file);
        
        // Dosyanın URL'sini al
        const photoURL = await getDownloadURL(storageRef);
        
        // Firebase Authentication'daki kullanıcı profilini güncelle
        const auth = getAuth();
        await updateProfile(auth.currentUser, { photoURL });
        
        console.log('Profil fotoğrafı başarıyla güncellendi');
      } catch (error) {
        console.error('Profil fotoğrafı güncellenirken bir hata oluştu:', error);
      }
    }

    // Dosya seçme işlemini tetiklemek için
    const triggerFileInput = (event) => {
  event.stopPropagation(); // Olay yayılmasını durdur
  document.getElementById('file-upload').click();
}

    return { error, handleClick, user, handleFileChange, triggerFileInput };
  }
}
</script>

<style scoped>
nav {
  width: 90%;
  padding: 20px;
  padding-left: 40px;
  padding-right: 40px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav p {
  margin: 2px auto;
  font-size: 16px;
  color: #444;
  text-align: left;
}
nav p.email {
  font-size: 14px;
  color: #888;
}
.pointer {
  cursor: pointer;
}
.profil {
  max-width: 50px;
  cursor: pointer;
  border-radius: 40%;
  margin-left: -30px;
}
.pointer {
  background-color: rgb(215, 0, 0);
}
.hiuser{
  margin-left: 20px;
}
</style>
