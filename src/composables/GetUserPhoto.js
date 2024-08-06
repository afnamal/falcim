import { getAuth } from "firebase/auth";
const GetUserPhoto = async () => {
    const auth = getAuth();
    try {
      const userCredential = auth.currentUser;
      if (userCredential) {
        const photoURL = userCredential.photoURL;
        return photoURL; // Kullanıcının fotoğraf URL'sini döndürün
      } else {
        console.error('Kullanıcı bulunamadı.');
        return null;
      }
    } catch (error) {
      console.error('Kullanıcı belgesi alınırken bir hata oluştu:', error);
      return null;
    }
  };
  export default GetUserPhoto