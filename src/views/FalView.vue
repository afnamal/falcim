<template>
  <div>
    <div class="container">
    <input type="text" v-model="userName" placeholder="Adınız" />
    <input type="text" v-model="userLocation" placeholder="Yaşadığınız Yer" />
    <input type="date" v-model="userBirthDate" placeholder="Doğum Tarihiniz" />
    <button @click="sendMessage">Falına Bak</button>
  </div>
    <div v-for="(msg, index) in messages" :key="index">
      <p>{{ msg.text }}</p>
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
    const userName = ref(''); // Kullanıcı ismi için boş başlangıç değeri
    const userLocation = ref('');
    const userBirthDate = ref('');
    const messages = ref([]);

    const fetchUserDetails = async () => {
      const db = getFirestore();
      const user = getAuth().currentUser;
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          userLocation.value = userData.location;
          userBirthDate.value = userData.birthDate;
        } else {
          console.log("No such document!");
        }
      }
    };

    const fetchUser = () => {
      const user = getAuth().currentUser;
      if (user !== null) {
        userName.value = user.displayName || 'Kullanıcı';
      }
    };

    const sendMessage = async () => {
      const postData = {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Bu bir kahve falı chatbotudur." },
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

    // Kullanıcı bilgilerini fetch etmek için component oluşturulduğunda çalıştır
    onMounted(() => {
      fetchUser();
      fetchUserDetails();
    });

    return { userName, userLocation, userBirthDate, messages, sendMessage };
  }
};
</script>

