<template>
  <nav v-if="user">
    <div class="profile-container" @click="triggerFileInput">
      <img :src="user.photoURL || '../assets/defaultpp.png'" alt="Profil Fotoğrafı" class="profile-image">
    </div>

    <div class="user-info">
      <p>Merhaba, {{ user.displayName }}</p>
      <p class="email">{{ user.email }}</p>
    </div>

    <button class="logout-button" @click="handleClick">Çıkış Yap</button>
    <p v-if="error" class="error-message">{{ error }}</p>
  </nav>
  <input id="file-upload" type="file" accept="image/*" style="display: none" @change="handleFileChange">
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
        await uploadBytes(storageRef, file);
        const photoURL = await getDownloadURL(storageRef);
        const auth = getAuth();
        await updateProfile(auth.currentUser, { photoURL });
        console.log('Profil fotoğrafı başarıyla güncellendi');
      } catch (error) {
        console.error('Profil fotoğrafı güncellenirken bir hata oluştu:', error);
      }
    }

    const triggerFileInput = () => document.getElementById('file-upload').click();

    return { error, handleClick, user, handleFileChange, triggerFileInput };
  }
}
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #f5f5f5;
  border-bottom: 2px solid #e1e1e1;
}
.profile-container {
  cursor: pointer;
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;
}
.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.user-info p {
  margin: 0;
  color: #333;
  font-weight: 500;
}
.email {
  color: #666;
  font-size: 14px;
}
.logout-button {
  padding: 10px 20px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.logout-button:hover {
  background-color: #c9302c;
}
.error-message {
  color: #d9534f;
  font-size: 14px;
}
</style>
