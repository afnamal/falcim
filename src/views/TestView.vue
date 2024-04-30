<template>
    <div>
      <NavbarComp />
      <div class="container">
        <img v-if="newUrl" :src="newUrl" alt="">
        <label v-if="!buttonActive &&!newUrl" for="file-upload2" class="file-upload-label">
          <img src="../assets/den.png" alt="Fincan Fotoğrafı Yükle"/>
        </label>
        <input id="file-upload2" type="file" @change="handleFileUpload($event)" :disabled="modelLoading" style="display: none;" />
        <p v-if="messages.length < 1">{{ photoUploadedText }}</p>
  
        <button @click="sendMessage" :disabled="!buttonActive" :class="{'disable': !buttonActive}" class="button">Falına Bak</button>
      </div>
      <div v-if="modelLoading">
  Loading model, please wait...
</div>

      <div v-if="loading" class="loading-c">
        <LoadingSpinner />
      </div>
      <div class="container" v-if="messages.length > 0">
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
  import NavbarComp from '@/components/NavbarComp.vue';
  import LoadingSpinner from '@/components/LoadingSpinner.vue'; // Import the loading spinner component
  
  export default {
    components: { NavbarComp,LoadingSpinner },
    setup() {
      const userName = ref('');
      const userLocation = ref('');
      const userBirthDate = ref('');
      const messages = ref([]);
      const buttonActive = ref(false);
      const newUrl = ref(null);
      const photoUploadedText = ref('');
      const loading = ref(false); // Add a new data property for loading state
      let model = null;
      const modelLoading = ref(true);

        
      

onMounted(async () => {
  await loadModel();
});

async function loadModel() {
  try {
    model = await window.tmImage.load('/model/model.json');
    modelLoading.value = false;
    console.log("Model loaded successfully.");
  } catch (error) {
    modelLoading.value = false;
    console.error("Failed to load the model:", error);
  }
}

        
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    const imageElement = new Image();
    imageElement.src = imageUrl;
    imageElement.onload = async () => {
      // Check if the model is loaded
      if (!model) {
        console.error('Model is not loaded yet.');
        photoUploadedText.value = 'Model is not ready yet. Please try again.';
        return;
      }
      
      const predictions = await model.predict(imageElement);
      const cupPrediction = predictions.find(p => p.className === 'fincan').probability;
      if (cupPrediction > 0.4) {
        photoUploadedText.value = 'Fincan tespit edildi, falınıza bakabilirsiniz.';
        buttonActive.value = true;
      } else {
        photoUploadedText.value = 'Fincan tanımlanamadı, lütfen başka bir fotoğraf yükleyin.';
        buttonActive.value = false;
      }
    };
  }
};


    
  
      const sendMessage = async () => {
        loading.value = true; // Set loading to true before making the API call
  
        const postData = {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'sen falcı ablasın sadece kahve falı bakarsın soru sormazsın.' },
            {
              role: 'user',
              content: `Adım ${userName.value}, ${userLocation.value} şehrindenim ve doğum tarihim ${userBirthDate.value}. kahve falıma bakmanı istiyorum. önünde bir fincan varmış gibi yorumla. gerçek bir falcı gibi cümleler kur. yaşadığım yere yaşıma göre tahminlerde bulun.`,
            },
          ],
        };
        const config = {
          headers: {
            Authorization: `Bearer ${process.env.VUE_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        };
        try {
          const response = await axios.post('https://api.openai.com/v1/chat/completions', postData, config);
          const botReply = 'Kahve Falı: ' + response.data.choices[0].message.content;
          messages.value.push({ text: botReply, type: 'bot' });
        } catch (error) {
          console.error('Error sending message:', error);
          messages.value.push({ text: 'Kahve Falı Chatbot ile iletişimde bir hata oluştu.', type: 'bot' });
        } finally {
          loading.value = false; // Set loading back to false after receiving the response
        }
      };
  
      onMounted(() => {
        const auth = getAuth();
        const db = getFirestore();
        const user = auth.currentUser;
        if (user) {
          userName.value = user.displayName || 'Kullanıcı';
          const userDoc = doc(db, 'users', user.uid);
          getDoc(userDoc).then((userSnapshot) => {
            if (userSnapshot.exists()) {
              const userData = userSnapshot.data();
              userLocation.value = userData.location;
              userBirthDate.value = userData.birthDate;
            } else {
              console.log('No such document!');
            }
          });
        }
      });
  
      return { messages, sendMessage, handleFileUpload, buttonActive, newUrl, photoUploadedText, loading,modelLoading };
    },
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
  label {
    cursor: pointer;
  }
  .disable {
    opacity: 35%;
    cursor: not-allowed;
  }
  img {
    max-width: 250px;
    border-radius: 20%;
  }
  .file-upload-label{
    cursor: pointer;
  }
  .loading-c{
    margin-top: -80px;
  }
  </style>