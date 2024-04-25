<template>
  <div>
    <div class="container">
      <input type="text" v-model="userName" placeholder="Adınız" />
      <input type="text" v-model="userLocation" placeholder="Yaşadığınız Yer" />
      <input type="date" v-model="userBirthDate" placeholder="Doğum Tarihiniz" />
      <label for="file-upload" class="file-upload-label">Fincan Fotoğrafı Yükle</label>
      <input id="file-upload" type="file" @change="handleFileUpload($event)" style="display: none;" />
      <button @click="sendMessage">Falına Bak</button>
    </div>
    <div class="container">
    <div v-for="(msg, index) in messages" :key="index">
      <p>{{ msg.text }}</p>
    </div>
  </div>
  </div>
</template>


<script>
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const userName = ref('');
    const userLocation = ref('');
    const userBirthDate = ref('');
    const messages = ref([]);

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        messages.value.push({ text: 'Fotoğraf yüklendi, falınıza baktırabilirsiniz.', type: 'bot' });
      }
    };

    const sendMessage = async () => {
      const postData = {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "sen falcı ablasın sadece kahve falı bakarsın soru sormazsın." },
          { role: "user", content: `Adım ${userName.value}, ${userLocation.value} şehrindenim ve doğum tarihim ${userBirthDate.value}. kahve falıma bakmanı istiyorum. önünde bir fincan varmış gibi yorumla. gerçek bir falcı gibi cümleler kur. yaşadığım yere yaşıma göre tahminlerde bulun.` }
        ]
      };
      const config = {
        headers: {
          'Authorization': `Bearer ${process.env.VUE_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      };
      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', postData, config);
        const botReply = "Kahve Falı: " + response.data.choices[0].message.content;
        messages.value.push({ text: botReply, type: 'bot' });
      } catch (error) {
        console.error('Error sending message:', error);
        messages.value.push({ text: 'Kahve Falı Chatbot ile iletişimde bir hata oluştu.', type: 'bot' });
      }
    };

    onMounted(() => {
      const auth = getAuth();
      const db = getFirestore();
      const user = auth.currentUser;
      if (user) {
        userName.value = user.displayName || 'Kullanıcı';
        const userDoc = doc(db, "users", user.uid);
        getDoc(userDoc).then(userSnapshot => {
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            userLocation.value = userData.location;
            userBirthDate.value = userData.birthDate;
          } else {
            console.log("No such document!");
          }
        });
      }
    });

    return { userName, userLocation, userBirthDate, messages, sendMessage, handleFileUpload };
  }
};
</script>

<style scoped>
input {
  margin-bottom: 8px;
  display: block;
}
button {
  margin-top: 8px;
}
label{
  cursor: pointer;
  border-bottom: 3px solid rgb(29, 112, 29);
}
</style>
